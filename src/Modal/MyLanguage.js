import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";

function MyLanguage({ setMyLanguageModalOpen }) {
    // 모달 끄기
    const closeModal = () => {
        setMyLanguageModalOpen(false);
    };

    // 언어 초기 정의 (빈 배열)
    const [myLanguage, setMyLanguage] = useState([]);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = parseInt(user.id, 10);

    useEffect(() => {
        async function fetchUserLanguage() {
            if (!userId) {
                console.error("사용자 ID가 없습니다.");
                return;
            }
            try {
                const response = await axios.get(`http://192.168.45.51:8080/${userId}/language`);
                setMyLanguage(response.data); // 서버에서 받은 데이터로 myLanguage 설정
                setMyLanguageModalOpen(true); // 데이터를 받은 후 모달 열기
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserLanguage();
    }, [userId, setMyLanguageModalOpen]);

    const promptLanguage = () => {
        const language = prompt("사용언어를 입력하세요: ");
        if (language != null) {
            axios.post(`http://192.168.45.51:8080/${userId}/language`, { language }).then((response) => {
                setMyLanguage((prevState) => [
                    ...prevState,
                    { languageID: response.data.id, language: language },
                ]);
                console.log(response.data.id);
            });
        }
    };

    const promptModifyLanguage = (languageID) => {
        const language = prompt("언어를 수정해주세요: ");
        if (language != null) {
            axios.put(`http://192.168.45.51:8080/${languageID}/language`, { language }).then(() => {
                setMyLanguage(
                    myLanguage.map((object) =>
                        object.languageID === languageID ? { ...object, language: language } : object
                    )
                );
            });
        }
        console.log("사용언어: ", myLanguage);
    };

    const promptDeleteLanguage = (languageID) => {
        axios.delete(`http://192.168.45.51:8080/${languageID}/language`).then(() => {
            setMyLanguage(myLanguage.filter((object) => object.languageID !== languageID));
        });
    };

    return (
        <div className="backModal">
            <div className="Modal">
                <button className="button" onClick={closeModal}>
                    X
                </button>
                <div className="ModalBody">
                    <div className="title">
                        <h2>사용언어</h2>
                    </div>
                    <div className="content">
                        {myLanguage.map((object) => (
                            <div className="barver2" key={object.languageID}>
                                <div className="text">{object.language}</div>
                                <div className="modify" onClick={() => promptModifyLanguage(object.languageID)}>
                                    수정
                                </div>
                                <div className="delete" onClick={() => promptDeleteLanguage(object.languageID)}>
                                    삭제
                                </div>
                            </div>
                        ))}
                        <button className="plus" onClick={promptLanguage}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLanguage;

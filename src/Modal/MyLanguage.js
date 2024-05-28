import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import "./Modal.css";
import axios from "axios";

function MyLanguage({ setMyLanguageModalOpen }) {
    //모달 끄기
    const closeModal = () => {
        setMyLanguageModalOpen(false);
    };

    //언어 초기 정의 (객체의 배열)
    const [myLanguage, setMyLanguage] = useState([]);

    //userId 보내고 response로 languageID와 language불러오기 (객체의 배열)
    //const userID = localStorage.getItem("userID");
    const userID = 22011661;
    useEffect(() => {
        async function fetchUserPost() {
            if (!userID) {
                console.error("사용자 ID가 없습니다.");
            }
            try {
                const response = await axios.get("http://172.16.86.241:8080/login", {
                    params: { userID },
                });
                setMyLanguage([
                    {
                        languageID: response.data.languageID,
                        language: response.data.language,
                    },
                ]);
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserPost();
    }, [userID]);

    // //사용언어 추가 (language 주기, 백에서 처리, myLanguage 정보 변경)
    // const promptLanguage = () => {
    //     const languageInput = prompt("사용언어를 입력하세요: ");
    //     if (languageInput != null) {
    //         //console.log("사용언어: ", languageInput);
    //         //userID와 languageInput값 넘기기
    //         axios.post(`http://192.168.219.103:8080/${userID}/language`, { languageInput }).then((response) => {
    //             setMyLanguage((prevState) => [
    //                 //prevState가 안 되면 ...myLanguage해보셈
    //                 ...prevState,
    //                 { languageID: response.data.languageID, language: languageInput },
    //             ]);
    //         });
    //     }
    // };

    //사용언어 추가 (language 주기, 백에서 처리, myLanguage 정보 변경)
    const promptLanguage = () => {
        const language = prompt("사용언어를 입력하세요: ");
        if (language != null) {
            //console.log("사용언어: ", languageInput);
            //userID와 languageInput값 넘기기
            axios.post(`http://172.16.86.241:8080/${userID}/language`, { language }).then((response) => {
                setMyLanguage((prevState) => [
                    //prevState가 안 되면 ...myLanguage해보셈
                    ...prevState,
                    { languageID: response.data.id, language: language },
                ]);
                console.log(response.data.id);
            });
        }
    };

    //사용언어 수정 (languageID와 language 주면 백에서 수정 후, myLanguage 정보 변경)
    const promptModifyLanguage = (languageID) => {
        const language = prompt("언어를 수정해주세요: ");
        if (language != null) {
            //console.log("사용언어: ", modifyLanguage);
            axios.put(`http://172.16.86.241:8080/${languageID}/language`, { language }).then(() => {
                setMyLanguage(
                    myLanguage.map((object) =>
                        object.languageID === languageID ? { ...object, language: language } : object
                    )
                );
            });
        }
        console.log("사용언어: ", myLanguage);
    };

    //사용언어 삭제 (languageID 주면 백에서 삭제, myLanguage 정보 변경)
    const promptDeleteLanguage = (languageID) => {
        //console.log("사용언어: ", myLanguage.language);
        axios.delete(`http://172.16.86.241:8080/${languageID}/language`).then(() => {
            //setMyLanguage(myLanguage.filter((object) => object.languageID !== response.data.languageID));
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
                            <p className="barver2" key={object.languageID}>
                                <div className="text">{object.language}</div>
                                <div className="modify" onClick={() => promptModifyLanguage(object.languageID)}>
                                    수정
                                </div>
                                <div className="delete" onClick={() => promptDeleteLanguage(object.languageID)}>
                                    삭제
                                </div>
                            </p>
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

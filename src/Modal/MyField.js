import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";

function MyField({ setMyFieldModalOpen }) {
    // 모달 끄기
    const closeModal = () => {
        setMyFieldModalOpen(false);
    };

    // 관심분야 초기 정의 (빈 배열)
    const [myField, setMyField] = useState([]);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = parseInt(user.id, 10);

    useEffect(() => {
        async function fetchUserField() {
            if (!userId) {
                console.error("사용자 ID가 없습니다.");
                return;
            }
            try {
                const response = await axios.get(`http://172.16.86.241:8080/${userId}/interest`);
                setMyField(response.data); // 서버에서 받은 데이터로 myField 설정
                setMyFieldModalOpen(true); // 데이터를 받은 후 모달 열기
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserField();
    }, [userId, setMyFieldModalOpen]);

    const promptField = () => {
        const interest = prompt("관심분야를 입력하세요: ");
        if (interest != null) {
            axios.post(`http://172.16.86.241:8080/${userId}/interest`, { interest }).then((response) => {
                setMyField((prevState) => [
                    ...prevState,
                    { id: response.data.id, interest: interest },
                ]);
                console.log(response.data.id);
            });
        }
    };

    const promptModifyField = (interestID) => {
        const interest = prompt("관심분야를 수정해주세요: ");
        if (interest != null) {
            axios.put(`http://172.16.86.241:8080/${interestID}/interest`, { interest }).then(() => {
                setMyField(
                    myField.map((object) =>
                        object.id === interestID ? { ...object, interest: interest } : object
                    )
                );
            });
        }
        console.log("관심분야: ", myField);
    };

    const promptDeleteField = (interestID) => {
        axios.delete(`http://172.16.86.241:8080/${interestID}/interest`).then(() => {
            setMyField(myField.filter((object) => object.id !== interestID));
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
                        <h2>관심분야</h2>
                    </div>
                    <div className="content">
                        {myField.map((object) => (
                            <div className="barver2" key={object.id}>
                                <div className="text">{object.interest}</div>
                                <div className="modify" onClick={() => promptModifyField(object.id)}>
                                    수정
                                </div>
                                <div className="delete" onClick={() => promptDeleteField(object.id)}>
                                    삭제
                                </div>
                            </div>
                        ))}
                        <button className="plus" onClick={promptField}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyField;

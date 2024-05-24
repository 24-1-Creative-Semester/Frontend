import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import "./Modal.css";
import axios from "axios";

function MyField({ setMyFieldModalOpen }) {
    //모달 끄기
    const closeModal = () => {
        setMyFieldModalOpen(false);
    };

    //언어 초기 정의
    const [myField, setMyField] = useState([]);

    //프로젝트 불러오기
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
    //             setMyField(response.myField);
    //         });
    //     });

    const promptField = () => {
        const fieldInput = window.prompt("관심분야를 입력하세요: ");
        if (fieldInput != null) {
            setMyField((prevState) => [...prevState, fieldInput]);

            console.log("사용언어: ", myField, fieldInput);

            // axios.post("https://jsonplaceholder.typicode.com/todos/1").then((response) => {
            //     setMyField(response.field);
            // });
        }
    };

    const promptDeleteField = (idx) => {
        const newState = myField.filter((_, index) => idx !== index);
        setMyField(newState);
        console.log("관심분야: ", myField);
    };

    const promptModifyField = (idx) => {
        const modifyField = prompt("관심분야를 수정해주세요: ");
        if (modifyField != null) {
            const newState = myField.map((fie, index) => {
                if (idx !== index) return fie;
                else return modifyField;
            });
            setMyField(newState);
        }
        console.log("관심분야: ", myField);
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
                    <div className="content2">
                        {myField.map((myField, idx) => (
                            <p className="barver2" key={myField}>
                                <div className="text">{myField}</div>
                                <div className="modify" onClick={() => promptModifyField(idx)}>
                                    수정
                                </div>
                                <div className="delete" onClick={() => promptDeleteField(idx)}>
                                    삭제
                                </div>
                            </p>
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
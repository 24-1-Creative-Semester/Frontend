import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import "./Modal.css";
import axios from "axios";

function MyLanguage({ setMyLanguageModalOpen }) {
    //모달 끄기
    const closeModal = () => {
        setMyLanguageModalOpen(false);
    };

    //언어 초기 정의
    const [myLanguage, setMyLanguage] = useState([]);

    //프로젝트 불러오기
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
    //             setMyLanguage(response.myLanguage);
    //         });
    //     });

    const promptLanguage = () => {
        const languageInput = prompt("사용언어를 입력하세요: ");
        if (languageInput != null) {
            setMyLanguage((prevState) => [...prevState, languageInput]);

            console.log("사용언어: ", myLanguage, languageInput);

            // axios.post("https://jsonplaceholder.typicode.com/todos/1").then((response) => {
            //     setMyLanguage(response.language);
            // });
        }
    };

    const promptDeleteLanguage = (idx) => {
        const newState = myLanguage.filter((_, index) => idx !== index);
        setMyLanguage(newState);
        console.log("사용언어: ", myLanguage);
    };

    const promptModifyLanguage = (idx) => {
        const modifyLanguage = prompt("언어를 수정해주세요: ");
        if (modifyLanguage != null) {
            const newState = myLanguage.map((lang, index) => {
                if (idx !== index) return lang;
                else return modifyLanguage;
            });
            setMyLanguage(newState);
        }
        console.log("사용언어: ", myLanguage);
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
                        {myLanguage.map((myLanguage, idx) => (
                            <p className="barver2" key={myLanguage}>
                                <div className="text">{myLanguage}</div>
                                <div className="modify" onClick={() => promptModifyLanguage(idx)}>
                                    수정
                                </div>
                                <div className="delete" onClick={() => promptDeleteLanguage(idx)}>
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

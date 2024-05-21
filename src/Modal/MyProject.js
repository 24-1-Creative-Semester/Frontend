import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import "./Modal.css";
import axios from "axios";

function MyProject({ setMyProjectModalOpen }) {
    //모달 끄기
    const closeModal = () => {
        setMyProjectModalOpen(false);
    };

    //언어 초기 정의
    const [myProject, setMyProject] = useState([]);

    //프로젝트 불러오기
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
    //             setMyProject(response.myProject);
    //         });
    //     });

    const promptProject = () => {
        const projectInput = window.prompt("프로젝트를 입력하세요: ");
        if (projectInput != null) {
            setMyProject((prevState) => [...prevState, projectInput]);

            console.log("프로젝트: ", myProject, projectInput);

            //프로젝트 보내기
            // axios.post("https://jsonplaceholder.typicode.com/todos/1").then((response) => {
            //     setMyProject(response.myProject);
            // });
        }
    };

    const promptDeleteProject = (idx) => {
        const newState = myProject.filter((_, index) => idx !== index);
        setMyProject(newState);
        console.log("프로젝트: ", myProject);
    };

    const promptModifyProject = (idx) => {
        const modifyProject = window.prompt("프로젝트를 수정해주세요: ");
        if (modifyProject != null) {
            const newState = myProject.map((proj, index) => {
                if (idx !== index) return proj;
                else return modifyProject;
            });
            setMyProject(newState);
        }
        console.log("프로젝트: ", myProject);
    };

    return (
        <div className="backModal">
            <div className="Modal">
                <button className="button" onClick={closeModal}>
                    X
                </button>
                <div className="ModalBody">
                    <div className="title">
                        <h2>프로젝트 이력</h2>
                    </div>
                    <div className="content2">
                        {myProject.map((myProject, idx) => (
                            <p className="barver2" key={myProject}>
                                <div className="text">{myProject}</div>
                                <div className="modify" onClick={() => promptModifyProject(idx)}>
                                    수정
                                </div>
                                <div className="delete" onClick={() => promptDeleteProject(idx)}>
                                    삭제
                                </div>
                            </p>
                        ))}
                        <button className="plus" onClick={promptProject}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProject;
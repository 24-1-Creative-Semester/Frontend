import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import "./XProject.css";
import axios from "axios";
import { createPortal } from "react-dom";

function XProject({ setModalOpen }) {
    //모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    //프로젝트 초기 정의
    const [project, setProject] = useState([
        { id: 1, title: "프로젝트 A" },
        { id: 2, title: "프로젝트 B" },
        { id: 3, title: "프로젝트 C" },
        { id: 4, title: "프로젝트 D" },
        { id: 5, title: "프로젝트 E" },
        { id: 6, title: "프로젝트 F" },
        { id: 7, title: "프로젝트 G" },
        { id: 8, title: "프로젝트 H" },
    ]);

    //프로젝트 불러오기
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
    //             setProject(response.project);
    //         });
    //     });

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
                        {project.map((project) => (
                            <p id="bar" project={project} key={project.id}>
                                {project.title}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default XProject;
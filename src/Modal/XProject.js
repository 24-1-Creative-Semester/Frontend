import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import "./XProject.css";
import axios from "axios";
import { createPortal } from "react-dom";

function XProject({ setModalOpen, xUserID }) {
    //모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    //프로젝트 초기 정의
    const [project, setProject] = useState([
        { ID: 1, title: "프로젝트 A" },
        { ID: 2, title: "프로젝트 B" },
        { ID: 3, title: "프로젝트 C" },
        { ID: 4, title: "프로젝트 D" },
        { ID: 5, title: "프로젝트 E" },
        { ID: 6, title: "프로젝트 F" },
        { ID: 7, title: "프로젝트 G" },
        { ID: 8, title: "프로젝트 H" },
    ]);

    //userId 보내고 response로 title불러오기
    useEffect(() => {
        async function fetchUserPost() {
            const xUserID = localStorage.getItem("xUserID");
            if (!xUserID) {
                console.error("사용자 ID가 없습니다.");
            }
            try {
                const response = await axios.get(`https://172.16.86.241/userinfo/${xUserID}`, { xUserID }); //둘 중에 하나 지우기
                setProject((prevState) => ({
                    ...prevState,
                    ID: response.data.ID,
                    title: response.data.title,
                }));
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserPost();
    }, [xUserID]);

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
                            <p id="bar" project={project} key={project.ID}>
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

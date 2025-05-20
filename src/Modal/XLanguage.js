import React, { useState, useEffect } from "react";
import "./XProject.css";
import axios from "axios";
import { createPortal } from "react-dom";

function XProject({ setModalOpen, xUserID }) {
    const closeModal = () => {
        setModalOpen(false);
    };

    // 프로젝트 초기 상태를 빈 배열로 설정
    const [project, setProject] = useState([]);

    useEffect(() => {
        async function fetchUserPost() {
            if (!xUserID){
                console.error("사용자 ID가 없습니다.");
                return;
            }
            try {
                const response = await axios.get(`http://192.168.45.51:8080/${xUserID}/language`);
                console.log(response.data);
                // 받아온 데이터가 배열이라고 가정하고 설정
                setProject(response.data);
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
                    <div className="language">
                        <h2>사용언어</h2>
                    </div>
                    <div className="content2">
                        {project.map((project) => (
                            <p id="bar" project={project} key={project.ID}>
                                {project.language}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default XProject;

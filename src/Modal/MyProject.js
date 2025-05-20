import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";

function MyProject({ setMyProjectModalOpen }) {
    // 모달 끄기
    const closeModal = () => {
        setMyProjectModalOpen(false);
    };

    // 프로젝트 초기 정의 (빈 배열)
    const [myProject, setMyProject] = useState([]);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = parseInt(user.id, 10);

    useEffect(() => {
        async function fetchUserProject() {
            if (!userId) {
                console.error("사용자 ID가 없습니다.");
                return;
            }
            try {
                const response = await axios.get(`http://192.168.45.51:8080/${userId}/achievement`);
                setMyProject(response.data); // 서버에서 받은 데이터로 myProject 설정
                setMyProjectModalOpen(true); // 데이터를 받은 후 모달 열기
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserProject();
    }, [userId, setMyProjectModalOpen]);

    //사용언어 추가 (language 주기, 백에서 처리, myLanguage 정보 변경)
    const promptProject = () => {
        const achievement = prompt("프로젝트를 입력하세요: ");
        if (achievement != null) {
            axios.post(`http://192.168.45.51:8080/${userId}/achievement`, { achievement }).then((response) => {
                setMyProject((prevState) => [
                    ...prevState,
                    { achievementID: response.data.id, achievement: achievement },
                ]);
                console.log(response.data.id);
            });
        }
    };

    const promptModifyProject = (achievementID) => {
        const achievement = prompt("프로젝트를 수정해주세요: ");
        if (achievement != null) {
            axios.put(`http://192.168.45.51:8080/${achievementID}/achievement`, { achievement }).then(() => {
                setMyProject(
                    myProject.map((object) =>
                        object.achievementID === achievementID ? { ...object, achievement: achievement } : object
                    )
                );
            });
        }
        console.log("프로젝트: ", myProject);
    };

    const promptDeleteProject = (achievementID) => {
        axios.delete(`http://192.168.45.51:8080/${achievementID}/achievement`).then(() => {
            setMyProject(myProject.filter((object) => object.achievementID !== achievementID));
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
                        <h2>프로젝트 이력</h2>
                    </div>
                    <div className="content">
                        {myProject.map((object) => (
                            <div className="barver2" key={object.achievementID}>
                                <div className="text">{object.achievement}</div>
                                <div className="modify" onClick={() => promptModifyProject(object.achievementID)}>
                                    수정
                                </div>
                                <div className="delete" onClick={() => promptDeleteProject(object.achievementID)}>
                                    삭제
                                </div>
                            </div>
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
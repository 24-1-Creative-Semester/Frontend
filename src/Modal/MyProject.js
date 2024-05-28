import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from "axios";

function MyProject({ setMyProjectModalOpen }) {
    // 모달 끄기
    const closeModal = () => {
        setMyProjectModalOpen(false);
    };

<<<<<<< HEAD
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
                const response = await axios.get(`http://172.16.86.241:8080/${userId}/achievement`);
                setMyProject(response.data); // 서버에서 받은 데이터로 myProject 설정
                setMyProjectModalOpen(true); // 데이터를 받은 후 모달 열기
=======
    //언어 초기 정의 (객체의 배열)
    const [myProject, setMyProject] = useState([]);

    //userId 보내고 response로 languageID와 language불러오기 (객체의 배열)
    //const userID = localStorage.getItem("userID");
    const userID = 22011661;
    useEffect(() => {
        async function fetchUserProject() {
            if (!userID) {
                console.error("사용자 ID가 없습니다.");
            }
            try {
                const response = await axios.get("http://172.16.86.241:8080/login", {
                    params: { userID },
                });
                setMyProject([
                    {
                        achievementID: response.data.achievementID,
                        achievement: response.data.achievement,
                    },
                ]);
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserProject();
<<<<<<< HEAD
    }, [userId, setMyProjectModalOpen]);
=======
    }, [userID]);
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902

    //사용언어 추가 (language 주기, 백에서 처리, myLanguage 정보 변경)
    const promptProject = () => {
        const achievement = prompt("프로젝트를 입력하세요: ");
        if (achievement != null) {
<<<<<<< HEAD
            axios.post(`http://172.16.86.241:8080/${userId}/achievement`, { achievement }).then((response) => {
                setMyProject((prevState) => [
=======
            //console.log("사용언어: ", languageInput);
            //userID와 languageInput값 넘기기
            axios.post(`http://172.16.86.241:8080/${userID}/achievement`, { achievement }).then((response) => {
                setMyProject((prevState) => [
                    //prevState가 안 되면 ...myLanguage해보셈
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
                    ...prevState,
                    { achievementID: response.data.id, achievement: achievement },
                ]);
                console.log(response.data.id);
            });
        }
    };

<<<<<<< HEAD
    const promptModifyProject = (achievementID) => {
        const achievement = prompt("프로젝트를 수정해주세요: ");
        if (achievement != null) {
=======
    //사용언어 수정 (languageID와 language 주면 백에서 수정 후, myLanguage 정보 변경)
    const promptModifyProject = (achievementID) => {
        const achievement = prompt("프로젝트를 수정해주세요: ");
        if (achievement != null) {
            //console.log("사용언어: ", modifyLanguage);
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
            axios.put(`http://172.16.86.241:8080/${achievementID}/achievement`, { achievement }).then(() => {
                setMyProject(
                    myProject.map((object) =>
                        object.achievementID === achievementID ? { ...object, achievement: achievement } : object
                    )
                );
            });
        }
        console.log("프로젝트: ", myProject);
    };

<<<<<<< HEAD
    const promptDeleteProject = (achievementID) => {
        axios.delete(`http://172.16.86.241:8080/${achievementID}/achievement`).then(() => {
=======
    //사용언어 삭제 (languageID 주면 백에서 삭제, myLanguage 정보 변경)
    const promptDeleteProject = (achievementID) => {
        //console.log("사용언어: ", myLanguage.language);
        axios.delete(`http://172.16.86.241:8080/${achievementID}/achievement`).then(() => {
            //setMyLanguage(myLanguage.filter((object) => object.languageID !== response.data.languageID));
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
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
<<<<<<< HEAD
                            <div className="barver2" key={object.achievementID}>
=======
                            <p className="barver2" key={object.achievementID}>
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
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

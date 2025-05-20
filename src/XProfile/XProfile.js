import React, { useState, useEffect } from "react";
import "./XProfile.css";
import axios from "axios";
import Navigation from "../Component/Navigation";
import XProject from "../Modal/XProject";
import XField from "../Modal/XField";
import XLanguage from "../Modal/XLanguage"; // XLanguage 모달 추가
import { useParams, useNavigate } from "react-router-dom";

const XProfile = () => {
    const { xUserID } = useParams();  // URL 매개변수로부터 xUserID 추출
    const navigate = useNavigate();

    // 모달 상태 정의
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 모달 종류 상태 추가
    const [xUserInfo, setXUserInfo] = useState({
        name: "윈터",
        department: "컴퓨터공학과",
        grade: "3학년",
        status: "재학 중",
        language: "자바",
        field: "백엔드",
        image: "/winter.png",
    });

    // 사용자 정보 불러오기
    useEffect(() => {
        async function fetchXUserInfo() {
            try {
                const response = await axios.get(`http://192.168.45.51:8080/${xUserID}/getUserInfo`);
                console.log(response.data);
                setXUserInfo({
                    name: response.data.name,
                    department: response.data.department,
                    grade: response.data.grade,
                    status: response.data.status,
                    field: response.data.field,
                    image: response.data.image,
                    language: response.data.language,  // 사용언어 추가
                });
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchXUserInfo();
    }, [xUserID]);

    const showModal = (type) => { // 모달 종류를 전달 받도록 수정
        setModalOpen(true);
        setModalType(type); // 모달 종류 설정
    };

    const handlePostClick = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userID = parseInt(user.id, 10);
        axios.post(`http://192.168.45.51:8080/chatroom/create/${userID}/${xUserID}`).then((response) => {
            const { chatRoomId, chatRoomName, ximage, xuserId } = response.data;
            navigate(`/ChatPage/${chatRoomId}`, { state: { chatRoomId, chatRoomName, ximage, xuserId } });
        }).catch((error) => {
            console.error("채팅방 생성 실패:", error);
        });
    };

    return (
        <div>
            {/* 모달 종류에 따라 다른 모달을 열도록 설정 */}
            {modalOpen && modalType === "project" && <XProject setModalOpen={setModalOpen} xUserID={xUserID} />}
            {modalOpen && modalType === "field" && <XField setModalOpen={setModalOpen} xUserID={xUserID} />} 
            {modalOpen && modalType === "language" && <XLanguage setModalOpen={setModalOpen} xUserID={xUserID} />} 
            <Navigation />
            <div>
                <img src={xUserInfo.image} className="ximage" alt="프로필" />
            </div>
            <div className="section">
                <div className="채팅" onClick={handlePostClick}>
                    채팅하기
                </div>
            </div>
            <div className="op">
                <div className="개인정보">
                    {xUserInfo.name} / {xUserInfo.department} / {xUserInfo.grade}학년 / {xUserInfo.status}중
                </div>
                <div className="사용언어2" onClick={() => showModal("language")} >
                    사용언어
                </div>
                <div className="프로젝트이력2" onClick={() => showModal("project")}>
                    프로젝트
                </div>
                <div className="관심분야2" onClick={() => showModal("field")} >
                    관심분야
                </div>
            </div>
        </div>
    );
};

export default XProfile;

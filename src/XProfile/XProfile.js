import React, { useState, useEffect } from "react";
import "./XProfile.css";
import axios from "axios";
import Navigation from "../Component/Navigation";
import XProject from "../Modal/XProject";
import { useParams, useNavigate } from "react-router-dom";

const XProfile = (xUserID) => {
    //변수 정의, 변수 초기값 설정
    // const [name, setName] = useState("윈터"); //이름
    // const [department, setDepartment] = useState("컴퓨터공학과"); //학과
    // const [grade, setGrade] = useState("3학년"); //학년
    // const [status, setState] = useState("재학"); //재학,휴학,졸업
    // const [language, setLanguage] = useState("자바"); //언어
    // const [field, setField] = useState("백엔드"); //분야
    const navigate = useNavigate();
    //modal 정의
    const [modalOpen, setModalOpen] = useState(false);
    //modal 키기
    const showModal = () => {
        setModalOpen(true);
    };

    const [xUserInfo, setXUserInfo] = useState({
        name: "윈터",
        department: "컴퓨터공학과",
        grade: "3학년",
        status: "재학 중",
        language: "자바",
        field: "백엔드",
        image: process.env.PUBLIC_URL + "/winter.png", //process.env.PUBLIC_URL <- 해당환경에 맞는(절대경로), "/initImage.webp"<- (상대경로)
    });
    //유저정보 불러오기
    const userID = localStorage.getItem("userID");
    //사용자 정보 불러오기
    useEffect(() => {
        async function fetchXUserInfo() {
            try {
                const response = await axios.get(`https://서버주소/userinfo/${xUserID}`, { xUserID }); //둘 중에 하나 지우기
                setXUserInfo((prevState) => ({
                    ...prevState, //이전 상태를 객체에 복사
                    name: response.data.name,
                    department: response.data.department,
                    grade: response.data.grade,
                    status: response.data.status,
                    field: response.data.field, //관심분야
                    image: response.data.image, //프사
                    // 필요한 다른 사용자 정보 추가
                }));
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error); 
            }
        }
        fetchXUserInfo();
    }, [xUserID]);

    // const handlePostClick = (xUserID) => {
    //     console.log(xUserID);
    //     // 클릭 시 해당 게시물의 상세 페이지로 이동
    //     navigate(`/ChatPage/${xUserID}`);
    //     // 예를 들어, 각 게시물의 ID를 이용하여 동적 URL을 생성할 수 있습니다.
    // };

    const handlePostClick = (xUserID) => {
        console.log(xUserID);
        axios.post(`https://서버주소/userinfo/${userID}`, { xUserID }).then((chatID) => {
            // 클릭 시 해당 게시물의 상세 페이지로 이동
            navigate(`/ChatPage/${chatID}`);
            // 예를 들어, 각 게시물의 ID를 이용하여 동적 URL을 생성할 수 있습니다.
        });
    };

    return (
        <div>
            {modalOpen && <XProject setModalOpen={setModalOpen} />}
            <Navigation />
            <div>
                <img src={xUserInfo.image} className="ximage"></img>
            </div>
            <div className="section">
                <div class="이름">
                    {xUserInfo.name} / {xUserInfo.department}
                </div>
                <div class="채팅" onClick={handlePostClick}>
                    채팅하기
                </div>
            </div>
            <div class="op">
                <div class="개인정보">
                    {xUserInfo.name} / {xUserInfo.department} / {xUserInfo.grade} / {xUserInfo.status}
                </div>
                <div class="사용언어">{xUserInfo.language}</div>
                <div class="프로젝트이력" onClick={showModal}>
                    프로젝트 보기
                </div>
                <div class="관심분야">{xUserInfo.field}</div>
            </div>
        </div>
    );
};

export default XProfile;

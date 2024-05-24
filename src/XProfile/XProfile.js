import React, { useState, useEffect } from "react";
import "./XProfile.css";
import axios from "axios";
import Navigation from "../Component/Navigation";
import XProject from "../Modal/XProject";

const XProfile = () => {
    //변수 정의, 변수 초기값 설정
    const [name, setName] = useState("윈터"); //이름
    const [department, setDepartment] = useState("컴퓨터공학과"); //학과
    const [grade, setGrade] = useState("3학년"); //학년
    const [state, setState] = useState("재학"); //재학,휴학,졸업
    const [language, setLanguage] = useState("자바"); //언어
    const [field, setField] = useState("백엔드"); //분야

    //modal 정의
    const [modalOpen, setModalOpen] = useState(false);
    //modal 키기
    const showModal = () => {
        setModalOpen(true);
    };

    //필요한 사용자 데이터 불러오기
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
    //         setName(response.name);
    //         setDepartment(response.department);
    //         setGrade(response.grade);
    //         setState(response.state);
    //         setLanguage(response.language);
    //         setProject(response.project);
    //         setField(response.field);
    //     });
    // });

    return (
        <div>
            {modalOpen && <XProject setModalOpen={setModalOpen} />}
            <Navigation />
            <div>
                <img src={process.env.PUBLIC_URL + "/winter.png"} className="image"></img>
            </div>
            <div className="section">
                <div class="이름">
                    {name} / {department}
                </div>
                <div class="채팅">채팅하기</div>
            </div>
            <div class="op">
                <div class="개인정보">
                    {name} / {department} / {grade} / {state}{" "}
                </div>
                <div class="사용언어">{language}</div>
                <div class="프로젝트이력" onClick={showModal}>
                    프로젝트 보기
                </div>
                <div class="관심분야">{field}</div>
            </div>
        </div>
    );
};

export default XProfile;
import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import axios from "axios";

function ScrapPost({ setScrapPostModalOpen }) {
    const navigate = useNavigate();
    //모달 끄기
    const closeModal = () => {
        setScrapPostModalOpen(false);
    };

    //프로젝트 초기 정의
    const [scrapPost, setScrapPost] = useState([
        { scrapID: 1, title: "프로젝트 A 함께하실 분" },
        { scrapID: 2, title: "프로젝트 B 함께하실 분" },
        { scrapID: 3, title: "프로젝트 C 함께하실 분" },
    ]);

    //userId 보내고 response로 postId랑 title불러오기
    useEffect(() => {
        async function fetchUserInfo() {
            const userID = localStorage.getItem("userID");
            if (!userID) {
                console.error("사용자 ID가 없습니다.");
            }
            try {
                const response = await axios.get(`https://서버주소/userinfo/${userID}`, { userID }); //둘 중에 하나 지우기
                setScrapPost([
                    {
                        scrapID: response.data.scrapID,
                        title: response.data.title,
                    },
                ]);
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserInfo();
    }, []);

    const handlePostClick = (scrapID) => {
        console.log(scrapID);
        navigate(`/ViewAllPost/${scrapID}`);
    };

    return (
        <div className="backModal">
            <div className="Modal">
                <button className="button" onClick={closeModal}>
                    X
                </button>
                <div className="ModalBody">
                    <div className="title">
                        <h2>저장한 글</h2>
                    </div>
                    <div className="content2">
                        {scrapPost.map((object) => (
                            <p className="bar" key={object.scrapID} onClick={() => handlePostClick(object.scrapID)}>
                                {object.title}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScrapPost;

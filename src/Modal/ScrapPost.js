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
        //{ scrapID: 1, title: "프로젝트 A 함께하실 분" },
        // { scrapID: 2, title: "프로젝트 B 함께하실 분" },
        // { scrapID: 3, title: "프로젝트 C 함께하실 분" },
    ]);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userID = parseInt(user.id, 10);
    //userId 보내고 response로 postId랑 title불러오기
    useEffect(() => {
        async function fetchUserInfo() {
            //const userID = localStorage.getItem("userID");
            //const userID = 22011661;
            if (!userID) {
                console.error("사용자 ID가 없습니다.");
            }
            try {
                const response = await axios.get(`http://192.168.45.51:8080/board/myScrap/${userID}`, {
                    params: { userId: userID },
                });
                setScrapPost(response.data);
                console.error("사용자 정보를 불러오는데 성공했습니다:");
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

    const promptDeletePost = (postID) => {
        console.log("삭제");
        axios.delete(`http://192.168.45.51:8080/board/scrap/delete/${postID}`, {
            params: { postId: postID },
        });
        setScrapPost(scrapPost.filter((object) => object.id !== postID));
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
                    <div className="content">
                        {scrapPost.map((object) => (
                            <p className="barver2" key={object.id}>
                                <div className="text" id="text2" onClick={() => handlePostClick(object.id)}>
                                    {object.title}
                                </div>
                                <div className="delete" onClick={() => promptDeletePost(object.id)}>
                                    삭제
                                </div>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ScrapPost;

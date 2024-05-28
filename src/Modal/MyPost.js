import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Modal.css"; // Assuming you have a CSS file for styling

function MyPost({ setMyPostModalOpen }) {
    const navigate = useNavigate();

    // 모달 끄기 함수
    const closeModal = () => {
        setMyPostModalOpen(false);
    };

    // 초기 상태를 빈 배열로 설정
    const [myPost, setMyPost] = useState([]);

    // 사용자 게시물 가져오기
    useEffect(() => {
        async function fetchUserPost() {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = parseInt(user.id, 10);
            if (!userId) {
                console.error("사용자 ID가 없습니다.");
                return; // 사용자 ID가 없으면 함수 종료
            }
            try {
                const response = await axios.get(`http://172.16.86.241:8080/board/myBoard`, {
                    params: { userId: userId },
                });
                setMyPost(response.data);
                console.error("사용자 정보를 불러오는데 성공했습니다:");
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserPost();
    }, []);

    // 게시물 클릭 핸들러
    const handlePostClick = (postID) => {
        console.log(postID);
        // 클릭 시 해당 게시물의 상세 페이지로 이동
        navigate(`/ViewAllPost/${postID}`);
    };

    // 글 작성 페이지로 이동
    const moveWritePage = () => {
        window.location.href = "/WritePage";
    };

    return (
        <div className="backModal">
            <div className="Modal">
                <button className="button" onClick={closeModal}>
                    X
                </button>
                <div className="ModalBody">
                    <div className="title">
                        <h2>내가 올린 게시물</h2>
                    </div>
                    <div className="content">
                        {myPost.length > 0 ? (
                            myPost.map((object) => (
                                <p className="bar" key={object.id} onClick={() => handlePostClick(object.id)}>
                                    {object.title}
                                </p>
                            ))
                        ) : (
                            <p>게시물이 없습니다.</p>
                        )}
                        <button className="plus" onClick={moveWritePage}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPost;

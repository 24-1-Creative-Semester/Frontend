import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyPost({ setMyPostModalOpen }) {
    const navigate = useNavigate();

    const closeModal = () => {
        setMyPostModalOpen(false);
    };

    const [myPost, setMyPost] = useState([]);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userID = parseInt(user.id, 10);

    useEffect(() => {
        async function fetchUserPost() {
            if (!userID) {
                console.error("사용자 ID가 없습니다.");
                return;
            }
            try {
                const response = await axios.get(`http://192.168.45.51:8080/board/myBoard`, {
                    params: { userId: userID },
                });
                setMyPost(Array.isArray(response.data) ? response.data : []);
                console.log("사용자 정보를 불러오는데 성공했습니다:");
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error.response || error);
            }
        }
        fetchUserPost();
    }, [userID]);

    const goEdit = (postID) => {
        navigate(`/EditPost/${postID}`);
    };

    const handlePostClick = (postID) => {
        console.log(postID);
        navigate(`/ViewAllPost/${postID}`);
    };

    const moveWritePage = () => {
        window.location.href = "/WritePage";
    };

    const promptDeletePost = async (postID) => {
        setMyPost(myPost.filter((object) => object.id !== postID));
        try {
            await axios.delete(`http://192.168.45.51:8080/board/delete/${postID}`);
            console.log("삭제");
        } catch (error) {
            console.error("게시물 삭제 실패:", error.response || error);
        }
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
                                <div className="barver2" key={object.id}>
                                    <div className="text" id="text2" onClick={() => handlePostClick(object.id)}>
                                        {object.title}
                                    </div>
                                    <div className="modify" onClick={() => goEdit(object.id)}>
                                        수정
                                    </div>
                                    <div className="delete" onClick={() => promptDeletePost(object.id)}>
                                        삭제
                                    </div>
                                </div>
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

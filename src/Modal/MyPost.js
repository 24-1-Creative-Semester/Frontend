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
<<<<<<< HEAD
    const [myPost, setMyPost] = useState([]);
=======
    const [myPost, setMyPost] = useState("");
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902

    // 사용자 게시물 가져오기
    useEffect(() => {
        async function fetchUserPost() {
<<<<<<< HEAD
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = parseInt(user.id, 10);
            if (!userId) {
=======
            // const userID = localStorage.getItem("userID"); // 로컬 스토리지에서 userID를 가져옴
            const userID = 22011661;
            if (!userID) {
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
                console.error("사용자 ID가 없습니다.");
                return; // 사용자 ID가 없으면 함수 종료
            }
            try {
<<<<<<< HEAD
                const response = await axios.get(`http://172.16.86.241:8080/board/myBoard`, {
                    params: { userId: userId },
=======
                const response = await axios.get(`http://192.168.219.118:8080/board/myBoard`, {
                    params: { userId: userID },
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
                });
                setMyPost(response.data);
                console.error("사용자 정보를 불러오는데 성공했습니다:");
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchUserPost();
    }, []);

<<<<<<< HEAD
=======
    // // 게시물 클릭 핸들러
    // const handlePostClick = (id) => {
    //     console.log(id);
    //     navigate(`/ViewAllPost/${id}`);
    // };

>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
    // 게시물 클릭 핸들러
    const handlePostClick = (postID) => {
        console.log(postID);
        // 클릭 시 해당 게시물의 상세 페이지로 이동
<<<<<<< HEAD
        navigate(`/ViewAllPost/${postID}`);
=======
        //navigate(`/board/view?id=${postID}`);
        navigate(`/ViewAllPost/${postID}`);
        //navigate(`/ViewAllPost/${encodeURIComponent(postID)}`);
>>>>>>> 38435efffc1ed970d58e0ea6a692f408d8a70902
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

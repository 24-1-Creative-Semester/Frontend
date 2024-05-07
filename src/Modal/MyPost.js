import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import axios from "axios";

function MyPost({ setMyPostModalOpen }) {
    //모달 끄기
    const closeModal = () => {
        setMyPostModalOpen(false);
    };

    //프로젝트 초기 정의
    const [myPost, setMyPost] = useState([
        { id: 1, text: "프론트엔드 개발자 찾아요!" },
        { id: 2, text: "인공지능 개발자 찾아요!" },
        { id: 3, text: "백엔드 개발자 찾아요!" },
        { id: 4, text: "디자이너 찾아요!" },
    ]);

    //프로젝트 불러오기
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
    //             setMyPost(response.myPost);
    //         });
    // });

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
                        {myPost.map((myPost) => (
                            <p className="bar" myPost={myPost} key={myPost.id}>
                                {myPost.text}
                            </p>
                        ))}
                        <button className="plus">+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPost;

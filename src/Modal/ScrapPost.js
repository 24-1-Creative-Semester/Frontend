import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import axios from "axios";

function ScrapPost({ setScrapPostModalOpen }) {
    //모달 끄기
    const closeModal = () => {
        setScrapPostModalOpen(false);
    };

    //프로젝트 초기 정의
    const [scrapPost, setScrapPost] = useState([
        { id: 1, title: "프로젝트 A 함께하실 분" },
        { id: 2, title: "프로젝트 B 함께하실 분" },
        { id: 3, title: "프로젝트 C 함께하실 분" },
    ]);

    //프로젝트 불러오기
    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
    //             setScrapPost(response.scrapPost);
    //         });
    //     });

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
                        {scrapPost.map((scrapPost) => (
                            <p className="bar" scrapPost={scrapPost} key={scrapPost.id}>
                                {scrapPost.title}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScrapPost;

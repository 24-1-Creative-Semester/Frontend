import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChatList.css";
import NavigationBar from "../Component/Navigation";
import axios from "axios"; // axios 라이브러리를 임포트합니다.

const ChatList = () => {
    //프로젝트 초기 정의
    const navigate = useNavigate();

    const [chatList, setChatList] = useState([
        { chatID: 1, name: "카리나", image: "/initImage.webp" },
        { chatID: 2, name: "윈터", image: "/winter.png" },
        { chatID: 3, name: "닝닝", image: "/initImage.webp" },
        { chatID: 7, name: "지젤", image: "/initImage.webp" },
        { chatID: 1, name: "카리나", image: "/initImage.webp" },
        { chatID: 2, name: "윈터", image: "/winter.png" },
        { chatID: 3, name: "닝닝", image: "/initImage.webp" },
        { chatID: 7, name: "지젤", image: "/initImage.webp" },
        { chatID: 7, name: "지젤", image: "/initImage.webp" },
    ]);

    //userId 보내고 response로 title불러오기
    useEffect(() => {
        async function fetchChatList() {
            const userID = localStorage.getItem("userID");
            if (!userID) {
                console.error("사용자 ID가 없습니다.");
            }
            try {
                const response = await axios.get(`https://서버주소/userinfo/${userID}`, { userID }); //둘 중에 하나 지우기
                setChatList((prevState) => ({
                    ...prevState,
                    chatID: response.data.chatID,
                    name: response.data.name,
                }));
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchChatList();
    }, []);

    const handlePostClick = (chatID) => {
        console.log(chatID);
        // 클릭 시 해당 게시물의 상세 페이지로 이동
        navigate(`/ChatPage/${chatID}`);
    };

    return (
        <div>
            <NavigationBar />
            <div className="back">
                <div className="채팅목록">채팅 목록</div>
                <div className="chattingList">
                    {chatList.map((chatList) => (
                        <div
                            className="chattingRoom"
                            key={chatList.chatID}
                            onClick={() => handlePostClick(chatList.chatID)}
                        >
                            <img src={process.env.PUBLIC_URL + chatList.image} className="img"></img>
                            {chatList.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;

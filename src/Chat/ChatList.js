import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatList.css";
import NavigationBar from "../Component/Navigation";
import axios from "axios"; // axios 라이브러리를 임포트합니다.
import ChatPage from "./ChatPage";

const ChatList = () => {
    const navigate = useNavigate();

    const [chatList, setChatList] = useState([
        {
            //chatRoomId: 1, chatRoomName: "카리나", xImage: "/initImage.webp"
        },
    ]);

    useEffect(() => {
        async function fetchChatList() {
            const user = JSON.parse(localStorage.getItem("user"));
            const userID = parseInt(user.id, 10);
            if (!userID) {
                console.error("사용자 ID가 없습니다.");
                return;
            }
            try {
                const response = await axios.get(`http://192.168.45.51:8080/chatroom/${userID}`);
                // 응답 데이터를 배열로 설정
                setChatList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        }
        fetchChatList();
    }, []);

    const handlePostClick = (chatRoomId, chatRoomName, ximage, xuserId) => {
        console.log(ximage, xuserId);
        console.log("안녕");
        // 클릭 시 해당 게시물의 상세 페이지로 이동
        //navigate(`/ChatPage/${chatRoomId}`);
        navigate(`/ChatPage/${chatRoomId}`, { state: { chatRoomId, chatRoomName, ximage, xuserId } });
    };

    return (
        <div>
            <NavigationBar/>
            <div className="back">
                <div className="채팅목록">채팅 목록</div>
                <div className="chattingList">
                    {Array.isArray(chatList) &&
                        chatList.map((chat) => (
                            <div
                                className="chattingRoom"
                                //key={chat.chatRoomId}
                                onClick={() =>
                                    handlePostClick(chat.chatRoomId, chat.chatRoomName, chat.ximage, chat.xuserId)
                                }
                            >
                                <img src={chat.ximage} className="img" alt="chat"></img>
                                {chat.chatRoomName}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
//<ChatPage roomId={chat.chatRoomId} ximage={chat.ximage} name={chat.chatRoomName} />
//<NavigationBar />

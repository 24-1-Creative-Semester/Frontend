import React, { useState, useEffect } from "react";
import "./ChatPage.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Component/Navigation";
import axios from "axios"; // axios 라이브러리를 임포트합니다.
import { useLocation } from "react-router-dom";

const ChatPage = () => {
    const location = useLocation();
    const { chatRoomId, chatRoomName, ximage, xuserId } = location.state || {};
    console.log("Chat Room ID:", chatRoomId);  // Chat Room ID 확인

    const [messages, setMessages] = useState([]); // 초기 상태를 빈 배열로 설정
    const [inputMessage, setInputMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const userID = parseInt(user.id, 10);
    const username = userID;

    const xusername = parseInt(xuserId, 10);

    useEffect(() => {
        // 채팅방의 모든 메시지를 로드합니다.
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://192.168.45.51:8080/chatroom/${chatRoomId}/messages`);
                console.log("Messages:", response.data); // 응답 데이터 확인
                setMessages(Array.isArray(response.data) ? response.data : []); // 응답 데이터가 배열이 아닌 경우 빈 배열로 설정
            } catch (error) {
                console.error("Failed to load messages:", error);
                setMessages([]); // 오류가 발생한 경우 빈 배열로 설정
            }
        };

        if (chatRoomId) {
            fetchMessages();

            const eventSource = new EventSource(`http://192.168.45.51:8080/chatroom/${chatRoomId}/messages`);
            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data]);
            };

            return () => {
                eventSource.close();
            };
        }
    }, [chatRoomId]);

    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            month: "short",
            day: "numeric",
        });
        return formattedDate;
    };

    const renderMessage = (data) => {
        return (
            <div className={data.sender === username ? "outgoing_msg" : "received_msg"} key={data.id}>
                <div className={data.sender === username ? "sent_msg" : "received_withd_msg"}>
                    <p>{data.msg}</p>
                    <span className="time_date">
                        {formatDate(data.createdAt)} / <b>{data.sender}</b>
                    </span>
                </div>
            </div>
        );
    };

    const sendMessage = async () => {
        const messageContent = inputMessage.trim();

        if (messageContent !== "") {
            try {
                // 서버로 메시지를 전송하는 코드
                const response = await axios.post("http://192.168.45.51:8080/chat", {
                    chatRoomId: chatRoomId,
                    msg: messageContent,
                    sender: username,
                    receiver: xusername,
                    createdAt: new Date().toISOString(),
                });

                console.log(response.data); // 서버로부터 받은 응답 데이터 처리
                setInputMessage(""); // 메시지 전송 후 입력란 초기화
            } catch (error) {
                console.error("Error sending message:", error); // 에러 처리
            }
        } else {
            alert("메시지를 입력하세요.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="container-fluid">
            <NavigationBar />
            <div className="back">
                <div className="row">
                    <div className="col-sm-12">
                        <div id="user_chat_data" className="user_chat_data">
                            <div className="profile_name">
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <img src={ximage} className="profile_image" alt="profile" />
                                &nbsp;&nbsp;
                                <span id="username">{chatRoomName}</span>
                            </div>
                            <div className="container-fluid chat_section">
                                {Array.isArray(messages) && messages.map((message) => renderMessage(message))}
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input
                                        id="chat-outgoing-msg"
                                        type="text"
                                        className="write_msg"
                                        placeholder="Type a message"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button className="msg_send_btn" type="button" onClick={sendMessage}>
                                        보내기
                                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;

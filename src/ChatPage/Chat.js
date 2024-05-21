import React, { useState, useEffect } from "react";
import "./Chat.css";
import NavigationBar from "../Component/Navigation";
import axios from "axios"; // axios 라이브러리를 임포트합니다.

const Chat = () => {
    return (
        <div>
            <NavigationBar />
            <div className="back">
                <div className="title">채팅 목록</div>
                <div className="chattingList">
                    <div className="chattingRoom">
                        <img src={process.env.PUBLIC_URL + "/winter.png"} className="image"></img>신혜빈
                    </div>
                    <div className="chattingRoom">
                        <img src={process.env.PUBLIC_URL + "/winter.png"} className="image"></img>신혜빈
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

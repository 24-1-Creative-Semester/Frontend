import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import NavigationBar from '../Component/Navigation';
import axios from 'axios';

const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [chatRoomId, setRoomNum] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const usernameInput = "사용자명"; // 받아온 사용자명
    const roomNumInput = "채팅방번호"; // 받아온 채팅방 번호
    setUsername(usernameInput);
    setRoomNum(roomNumInput);

    // const eventSource = new EventSource(`http://localhost:8080/chat/chatRoomId/${roomNumInput}`);
    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setMessages(prevMessages => [...prevMessages, data]);
    // }

    // return () => {
    //   eventSource.close();
    // };
  }, []);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric' });
    return formattedDate;
  };

  const renderMessage = (data) => {
    return (
      <div className={data.sender === username ? "outgoing_msg" : "received_msg"} key={data.createdAt}>
        <div className={data.sender === username ? "sent_msg" : "received_withd_msg"}>
          <p>{data.msg}</p>
          <span className="time_date">{formatDate(data.createdAt)} / <b>{data.sender}</b></span>
        </div>
      </div>
    );
  };

  const sendMessage = () => {
    const messageContent = inputMessage.trim();
  
    if (messageContent !== "") {
      const newMessage = {
        sender: username,
        msg: messageContent,
        createdAt: new Date().toISOString() // 현재 시간을 ISO 형식으로 저장
      };

      // 서버로 메시지를 전송하는 코드
      /*
      axios.post('서버의 API 엔드포인트', newMessage)
        .then(response => {
          console.log(response.data); // 서버로부터 받은 응답 데이터 처리
        })
        .catch(error => {
          console.error('Error sending message:', error); // 에러 처리
        });
      */

      setMessages(prevMessages => [...prevMessages, newMessage]);

      // 메시지 전송 후 입력란 초기화
      setInputMessage("");
    } else {
      alert("메시지를 입력하세요.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container-fluid">
      <NavigationBar />
      <div className="row">
        <div className="col-sm-12">
          <div id="user_chat_data" className="user_chat_data">
            <div className="profile_name">
              &nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="profile_image" /> &nbsp;&nbsp;
              <span id="username">{username}</span>
            </div>
            <div className="container-fluid chat_section">
              {messages.map(message => renderMessage(message))}
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
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

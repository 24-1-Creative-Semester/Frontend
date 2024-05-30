import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ChatList.css";

function ChatList({ onSelectRoom }) {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    axios.get('http://172.16.86.241:8080/api/chat/rooms')
      .then(response => setChatRooms(response.data));
  }, []);

  return (
    <div>
      <h2>Chat Rooms</h2>
      <ul>
        {chatRooms.map(room => (
          <li key={room.id} onClick={() => onSelectRoom(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ChatList({ onSelectRoom }) {
//   const [chatRooms, setChatRooms] = useState([]);

//   useEffect(() => {
//     axios.get('http://172.16.86.241:8080/chat/rooms')
//       .then(response => setChatRooms(response.data));
//   }, []);

//   return (
//     <div>
//       <h2>Chat Rooms</h2>
//       <ul>
//         {chatRooms.map(room => (
//           <li key={room.id} onClick={() => onSelectRoom(room.id)}>
//             {room.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ChatList;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import "./ChatList.css";
// import NavigationBar from "../Component/Navigation";
// import axios from "axios"; // axios 라이브러리를 임포트합니다.

// const ChatList = () => {
//     //프로젝트 초기 정의
//     const navigate = useNavigate();

//     const [chatList, setChatList] = useState([
//         { chatID: 1, name: "카리나", image: "/initImage.webp" },
//         { chatID: 2, name: "윈터", image: "/winter.png" },
//         { chatID: 3, name: "닝닝", image: "/initImage.webp" },
//         { chatID: 7, name: "지젤", image: "/initImage.webp" },
//     ]);

//     //userId 보내고 response로 title불러오기
//     useEffect(() => {
//         async function fetchChatList() {
//             const userID = localStorage.getItem("userID");
//             if (!userID) {
//                 console.error("사용자 ID가 없습니다.");
//             }
//             try {
//                 const response = await axios.get(`http://172.16.86.241:8080/chatroom/${userID}`, { userID }); //둘 중에 하나 지우기
//                 setChatList((prevState) => ({
//                     ...prevState,
//                     chatID: response.data.id,
//                     // name: response.data.name,
//                 }));
//             } catch (error) {
//                 console.error("사용자 정보를 불러오는데 실패했습니다:", error);
//             }
//         }
//         fetchChatList();
//     }, []);

//     const handlePostClick = (chatID) => {
//         console.log(chatID);
//         navigate(`/ChatPage/${chatID}`);
//     };

//     return (
//         <div>
//             <NavigationBar />
//             <div className="back">
//                 <div className="채팅목록">채팅 목록</div>
//                 <div className="chattingList">
//                     {chatList.map((chatList) => (
//                         <div
//                             className="chattingRoom"
//                             key={chatList.chatID}
//                             onClick={() => handlePostClick(chatList.chatID)}
//                         >
//                             <img src={process.env.PUBLIC_URL + chatList.image} className="img"></img>
//                             {chatList.name}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatList;

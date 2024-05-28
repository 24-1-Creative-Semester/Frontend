// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import BoardPage from './Board/BoardPage';
import JobPage from './Job/JobPage';
import WritePage from './Board/WritePage';
import ViewAllPost from './Board/ViewAllPost';
import EditPost from './Board/EditPost';
import ChatPage from './Chat/ChatPage';
import ChatList from './Chat/ChatList';
import Profile from './Profile/Profile';
import "./App.css";

function App() {
  // 초기 게시물 데이터 설정 및 게시글 수정 함수
  const [posts, setPosts] = useState([
    { PostId: 1, name:'홍길동',department:'컴퓨터공학과',totalPeople:'40',title: '글내용글내용글내용1', content: '글내용1', tags: ['frontend', 'backend'], image:''},
    { PostId: 2, name:'김철수',department:'컴퓨터공학과',totalPeople:'30',title: '글내용글내용2', content: '글내용2', tags: ['frontend', 'ai'] , image:''},
    { PostId: 3, name:'김영희',department:'컴퓨터공학과',totalPeople:'60',title: '글내용3', content: '글내용3', tags: ['backend', 'ai'], image:'' },
  ]);

  return (
    <Router>
      <div className='AppContainer'>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/BoardPage" element={<BoardPage posts={posts} />} /> {/* posts props 전달 */}
          <Route path="/WritePage" element={<WritePage posts={posts} setPosts={setPosts} />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ChatList" element={<ChatList />} />
          <Route path="/JobPage" element={<JobPage />} />
          <Route path="/ViewAllPost/:postId" element={<ViewAllPost posts={posts} />} />
          <Route path="/EditPost/:postId" element={<EditPost posts={posts} setPosts={setPosts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate , BrowserRouter} from 'react-router-dom';
import './Navigation.css';

function NavigationBar(){
    const navigate = useNavigate();
    
    const goHome=()=>{
        window.location.href = '/BoardPage';
    }
    const handleClick = (menuName) => {
        console.log(`Clicked: ${menuName}`);
        switch(menuName) { // 각 메뉴에 따라 다른 경로로 이동
          case '게시판':
              navigate('/BoardPage');
              break;
          case '채용 공고':
              navigate('/RecruitmentPage');
              break;
          case '채팅':
              navigate('/ChatPage');
              break;
          case '프로필':
              navigate('/ProfilePage');
              break;
          // 나머지 메뉴들에 대한 경로 설정
          default:
              break;
        }
      }

    return(
        <div className="NavigationBar">
            <h2 className="connecteam" onClick={goHome}>CONNECTEAM</h2>
            <div className="NavigationBar_menu" onClick={() => handleClick('게시판')}>게시판</div>
            <div className="NavigationBar_menu" onClick={() => handleClick('채용 공고')}>채용 공고</div>
            <div className="NavigationBar_menu" onClick={() => handleClick('채팅')}>채팅</div>
            <div className="NavigationBar_menu" onClick={() => handleClick('프로필')}>프로필</div>
        </div>
    )
}

export default NavigationBar;
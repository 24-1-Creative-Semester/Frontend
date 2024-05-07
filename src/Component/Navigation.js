import React, { useState } from 'react';
import { useNavigate , BrowserRouter} from 'react-router-dom';
import './Navigation.css';

function Navigation(){

    return(
        <div className="NavigationBar">
            <h2 className="connecteam" >CONNECTEAM</h2>
            <div className="NavigationBar_menu" >게시판</div>
            <div className="NavigationBar_menu" >채용 공고</div>
            <div className="NavigationBar_menu" >채팅</div>
            <div className="NavigationBar_menu" >프로필</div>
        </div>
    )
}

export default Navigation;
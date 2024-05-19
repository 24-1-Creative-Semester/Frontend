import React, { useState } from 'react';
import axios from 'axios'; //HTTP 클라이언트 라이브러리 (요청)
import './LoginPage.css';

function LoginPage(){
  const [id, setId] = useState(''); //아이디 상태 관리
  const [pw, setPassword] = useState(''); //비밀번호
  const [error, setError] = useState(''); //에러 메시지
  const SERVER_URL = 'http://localhost:8080/login';

  // const goLogin = async () => { //비동기적 로그인 시도
  //   try {
  //     const response = await axios.post(SERVER_URL, { id, pw }); //서버로 로그인 요청 보냄
  //     alert(response.data)
  //     console.log("success"); //서버로부터 받은 데이터 콘솔에 출력
  //     window.location.href = '/BoardPage'; //로그인이 성공하면 BoardPage로 이동
  //   }
  //   catch (err) { //서버로부터 에러 응답이 오면
  //     setError(err.response.data.message); //에러 메시지를 상태에 저장
  //     window.location.href = '/BoardPage';
  //   }
  // };

  const goLogin = () =>{
    window.location.href = '/BoardPage';
  };

  return (
    <div className='margin'>
      <div className='form'>
        <h2>CONNECTEAM</h2>
        <div className='formContent'>
          <p><input className='login' type='text' name='id' placeholder='학번' value={id} onChange={event => setId(event.target.value)} /></p>
          <p><input className='login' type='password' name='pw' placeholder='비밀번호' value={pw} onChange={event => setPassword(event.target.value)} /></p>
          <p><button className='loginButton' onClick={goLogin}>로그인</button></p>
        </div>
        {error && <p className="loginError">{error}</p>} {/* 에러 메시지가 있을 경우 에러 메시지를 출력*/}
        <h4 className="loginNotice">학사정보시스템 아이디와 비밀번호로 로그인하세요!</h4>
      </div>
    </div>
  );
}

export default LoginPage;

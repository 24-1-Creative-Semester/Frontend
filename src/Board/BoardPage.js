import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import './BoardPage.css';
import { BiSearch } from "react-icons/bi"; //검색아이콘 넣으려고. react-icon 설치 해야함
import NavigationBar from '../Component/Navigation';

function BoardPage({ posts }) {
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        // 페이지가 렌더링될 때마다 최신 데이터를 가져옴
        // 만약 데이터를 서버에서 가져와야 한다면, 서버 API를 호출하는 코드를 여기에 추가
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

    const goHome=()=>{
        window.location.href = '/BoardPage';
    }

    const tagFunction = (tagName) => {
        console.log(`Tag Clicked: ${tagName}`);
        setSelectedTag(tagName);
    };

    const moveWritePage=()=>{
        window.location.href='/WritePage';
    };

    // 선택된 태그에 해당하는 게시물 필터링
    let filteredPosts = selectedTag ? posts.filter(post => post.tags.includes(selectedTag)) : posts;

    // 검색어에 따라 게시글 필터링
    if (searchInput.trim() !== '') {
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            post.content.toLowerCase().includes(searchInput.toLowerCase())
        );
    }

    return (
        <div className="total">
            <NavigationBar/>

            <div className="Line">
                {/* 태그들 */}
                <div className="TagLine1">
                    <div className = "WritePost" onClick={moveWritePage}>게시글 작성</div>
                    <div className="tag1" onClick={() => tagFunction('frontend')}>frontend</div>
                    <div className="tag1" onClick={() => tagFunction('backend')}>backend</div>
                    <div className="tag1" onClick={() => tagFunction('ai')}>ai</div>
                    <div className="tag1" onClick={() => tagFunction('design')}>design</div>
                </div>
                {/* 검색창 */}
                <div className="SearchContainer">
                    <BiSearch className="SearchIcon" size="30" color="gray"/> {/*아이콘삽입*/}
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="검색어를 입력하세요"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>

            <div className="posts">
                {filteredPosts.map(post => (
                    <Post key={post.PostId} post={post} />
                ))}
            </div>
        </div>
    );
}

export default BoardPage;

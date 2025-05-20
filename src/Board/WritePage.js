import React, { useState, useEffect } from 'react';
import './WritePage.css';
import NavigationBar from '../Component/Navigation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WritePage({ setPosts, posts }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [totalPeople, setTotalPeople] = useState('');
    const [userId, setUserId] = useState(0);
    const [content, setContent] = useState('');
    const [name, setAuthor] = useState('');
    const [department, setdepartment] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = parseInt(user.id, 10);
            console.log(user);
            console.log(userId);
            console.log(user.name);
            console.log(user.department);
            if (user) {
                setAuthor(user.name);
                setdepartment(user.department);  // 수정된 키 이름 사용
                // setProfilePicture(user.profilePicture);
                const parsedUserId = Number(user.id);
                if (!isNaN(parsedUserId)) {
                    setUserId(parsedUserId);
                } else {
                    console.error('Invalid user id:', user.id);
                }
            }
        } catch (error) {
            console.error('로컬 스토리지에서 사용자 정보를 가져오는 데 실패했습니다:', error);
        }
    }, []);

    const tagMapping = {
        '백엔드': { id: 1, name: '백엔드' },
        '프론트': { id: 2, name: '프론트' },
        'AI': { id: 3, name: 'AI' },
        '기획/디자인': { id: 4, name: '기획/디자인' }
    };

    const toggleTag = (tag) => {
        setSelectedTags((prevTags) => {
            const tagObject = tagMapping[tag];
            if (prevTags.some((t) => t.id === tagObject.id)) {
                return prevTags.filter((t) => t.id !== tagObject.id);
            } else {
                return [...prevTags, tagObject];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId === null) {
            console.error('User ID is not set');
            alert('유효한 사용자 ID가 필요합니다.');
            return;
        }

        const newPost = {
            title,
            userId,
            tags: selectedTags,
            participantsnum: parseInt(totalPeople, 10),
            content,
            name,
            department,
            // profilePicture
        };

        try {
            const response = await axios.post(`http://192.168.45.51:8080/board/writepro/${userId}`, newPost);
            const createdPost = response.data;
            setPosts([...posts, createdPost]);
            navigate('/BoardPage');
        } catch (error) {
            console.error('게시물 작성 실패:', error);
            alert('게시물 작성에 실패했습니다.');
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        if (window.confirm('작성을 멈추고 게시판으로 돌아가시겠습니까?')) {
            navigate('/BoardPage');
        }
    };

    return (
        <div className='write-page-container'>
            <NavigationBar />
            <div className='write-box'>
                <h2 className='write-title'>게시글 작성하기</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='title'>제목</label>
                        <input 
                            id='title'
                            type='text'
                            className='write-input'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='제목을 입력하세요'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='tag2'>태그</label>
                        <div className="TagLine2">
                            <div 
                                className={`tag2 ${selectedTags.some(tag => tag.id === 2) ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('프론트')}
                            >
                                프론트
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.some(tag => tag.id === 1) ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('백엔드')}
                            >
                                백엔드
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.some(tag => tag.id === 3) ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('AI')}
                            >
                                AI
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.some(tag => tag.id === 4) ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('기획/디자인')}
                            >
                                기획/디자인
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='totalPeople'>모집인원</label>
                        <input 
                            id='totalPeople'
                            type='number'
                            className='write-input'
                            value={totalPeople}
                            onChange={(e) => setTotalPeople(e.target.value)}
                            placeholder='모집인원을 입력하세요'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='content'>내용</label>
                        <textarea
                            id='content'
                            className='write-textarea'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='내용을 입력하세요'
                        ></textarea>
                    </div>
                    <div className='button-group'>
                        <button type='submit' className='write-button'>완료</button>
                        <button onClick={handleCancel} className='write-button'>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WritePage;
 
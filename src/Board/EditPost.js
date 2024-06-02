import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../Component/Navigation';
import axios from 'axios';
import './WritePage.css';

const SERVER_URL = "http://192.168.45.51:8080/board";

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [totalPeople, setTotalPeople] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/modify/${postId}`);
                const post = response.data;
                setTitle(post.title);
                setSelectedTags(post.tags.map(tag => ({ id: tag.id, name: tag.name }))); // 태그를 객체 형태로 설정
                setTotalPeople(post.participantsnum);
                setContent(post.content);
            } catch (error) {
                console.error('게시글 정보를 불러오는데 실패했습니다:', error);
            }
        };

        fetchPost();
    }, [postId]);

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

    const handleEditPost = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${SERVER_URL}/update/${postId}`, {
                title,
                tags: selectedTags,
                participantsnum: totalPeople,
                content
            });
            navigate(`/ViewAllPost/${postId}`);
        } catch (error) {
            console.error('게시글 수정에 실패했습니다:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/ViewAllPost/${postId}`);
    };

    return (
        <div className='write-page-container'>
            <NavigationBar />
            <div className='write-box'>
                <h2 className='write-title'>게시글 수정하기</h2>
                <form>
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
                                className={`tag2 ${selectedTags.some(tag => tag.id === tagMapping['프론트'].id) ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('프론트')}
                            >
                                프론트
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.some(tag => tag.id === tagMapping['백엔드'].id) ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('백엔드')}
                            >
                                백엔드
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.some(tag => tag.id === tagMapping['AI'].id) ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('AI')}
                            >
                                AI
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.some(tag => tag.id === tagMapping['기획/디자인'].id) ? 'selected-tag' : ''}`} 
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
                        <button type='button' onClick={handleEditPost} className='write-button'>완료</button>
                        <button type='button' onClick={handleCancel} className='write-button'>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPost;

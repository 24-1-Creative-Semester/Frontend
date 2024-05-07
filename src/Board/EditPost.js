import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../Component/Navigation';
import './WritePage.css';

const EditPost = ({ posts, setPosts }) => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = posts.find(post => post.PostId === parseInt(postId));

    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [totalPeople, setTotalPeople] = useState('');
    const [content, setContent] = useState('');

    const toggleTag = (tag) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tag)) {
                return prevTags.filter((t) => t !== tag);
            } else {
                return [...prevTags, tag];
            }
        });
    };

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setSelectedTags(post.tags);
            setTotalPeople(post.totalPeople);
            setContent(post.content);
        }
    }, [post]);

    const handleEditPost = () => {
        const updatedPosts = posts.map(p => {
            if (p.PostId === parseInt(postId)) {
                return {
                    ...p,
                    title: title,
                    tags: selectedTags,
                    totalPeople: totalPeople,
                    content: content
                };
            }
            return p;
        });

        setPosts(updatedPosts);
        navigate(`/ViewAllPost/${postId}`);
    };

    const handleCancel = () => {
        navigate(`/ViewAllPost/${postId}`);
    };

    return (
        <div className='write-page-container'>
            <NavigationBar />
            <div className='write-box'>
                <h2 className='write-title'>게시글 수정하기</h2>
                <form onSubmit={handleEditPost}>
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
                        <label htmlFor='tag'>태그</label>
                        <div className="TagLine">
                            <div 
                                className={`tag ${selectedTags.includes('frontend') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('frontend')}
                            >
                                frontend
                            </div>
                            <div 
                                className={`tag ${selectedTags.includes('backend') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('backend')}
                            >
                                backend
                            </div>
                            <div 
                                className={`tag ${selectedTags.includes('ai') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('ai')}
                            >
                                ai
                            </div>
                            <div 
                                className={`tag ${selectedTags.includes('design') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('design')}
                            >
                                design
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

export default EditPost;

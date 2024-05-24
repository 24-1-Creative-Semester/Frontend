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
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [major, setMajor] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setAuthor(user.name);
            setMajor(user.major);
            setProfilePicture(user.profilePicture);
        }
    }, []);

    const toggleTag = (tag) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tag)) {
                return prevTags.filter((t) => t !== tag);
            } else {
                return [...prevTags, tag];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            tags: selectedTags,
            totalPeople,
            content,
            author,
            major,
            profilePicture
        };

        try {
            const response = await axios.post('/api/posts', newPost);
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
                                className={`tag2 ${selectedTags.includes('프론트') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('프론트')}
                            >
                                frontend
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.includes('백엔드') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('백엔드')}
                            >
                                backend
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.includes('AI') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('AI')}
                            >
                                ai
                            </div>
                            <div 
                                className={`tag2 ${selectedTags.includes('기획/디자인') ? 'selected-tag' : ''}`} 
                                onClick={() => toggleTag('기획/디자인')}
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

export default WritePage;



// import React, { useState } from 'react';
// import './WritePage.css';
// import NavigationBar from '../Component/Navigation';
// import { useNavigate } from 'react-router-dom';

// function WritePage({ setPosts, posts }) {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState('');
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [totalPeople, setTotalPeople] = useState('');
//     const [content, setContent] = useState('');

//     const toggleTag = (tag) => {
//         setSelectedTags((prevTags) => {
//             if (prevTags.includes(tag)) {
//                 return prevTags.filter((t) => t !== tag);
//             } else {
//                 return [...prevTags, tag];
//             }
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newPost = {
//             PostId: posts.length + 1,
//             title,
//             tags: selectedTags,
//             totalPeople,
//             content,
//             author: '작성자',
//             major: '전공',
//         };

//         const updatedPosts = [...posts, newPost];
//         setPosts(updatedPosts);
//         navigate('/BoardPage');
//     };

//     const handleCancel = (e) => {
//         e.preventDefault();
//         if (window.confirm('작성을 멈추고 게시판으로 돌아가시겠습니까?')) {
//             navigate('/BoardPage');
//         }
//     };

//     const moveWritePage = () => {
//         // move to write page
//     };

//     return (
//         <div className='write-page-container'>
//             <NavigationBar />
//             <div className='write-box'>
//                 <h2 className='write-title'>게시글 작성하기</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className='form-group'>
//                         <label htmlFor='title'>제목</label>
//                         <input 
//                             id='title'
//                             type='text'
//                             className='write-input'
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder='제목을 입력하세요'
//                         />
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='tag2'>태그</label>
//                         <div className="TagLine2">
//                             <div 
//                                 className={`tag2 ${selectedTags.includes('frontend') ? 'selected-tag' : ''}`} 
//                                 onClick={() => toggleTag('frontend')}
//                             >
//                                 frontend
//                             </div>
//                             <div 
//                                 className={`tag2 ${selectedTags.includes('backend') ? 'selected-tag' : ''}`} 
//                                 onClick={() => toggleTag('backend')}
//                             >
//                                 backend
//                             </div>
//                             <div 
//                                 className={`tag2 ${selectedTags.includes('ai') ? 'selected-tag' : ''}`} 
//                                 onClick={() => toggleTag('ai')}
//                             >
//                                 ai
//                             </div>
//                             <div 
//                                 className={`tag2 ${selectedTags.includes('design') ? 'selected-tag' : ''}`} 
//                                 onClick={() => toggleTag('design')}
//                             >
//                                 design
//                             </div>
//                         </div>
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='totalPeople'>모집인원</label>
//                         <input 
//                             id='totalPeople'
//                             type='number'
//                             className='write-input'
//                             value={totalPeople}
//                             onChange={(e) => setTotalPeople(e.target.value)}
//                             placeholder='모집인원을 입력하세요'
//                         />
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='content'>내용</label>
//                         <textarea
//                             id='content'
//                             className='write-textarea'
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             placeholder='내용을 입력하세요'
//                         ></textarea>
//                     </div>
//                     <div className='button-group'>
//                         <button type='submit' className='write-button'>완료</button>
//                         <button onClick={handleCancel} className='write-button'>취소</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default WritePage;

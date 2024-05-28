import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../Component/Navigation';
import axios from 'axios';
import './ViewAllPost.css';

const ViewAllPost = () => {
    const { postId } = useParams(); // URL 파라미터로부터 postId를 추출
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isScrapped, setIsScrapped] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://172.16.86.241:8080/board/view?id=${postId}`);
                setPost(response.data); // 서버에서 가져온 게시물 설정
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [postId]);

    // 게시물 정보가 없는 경우에 대한 처리
    if (!post) {
        return <div>게시물을 불러오는 중입니다...</div>;
    }

    const handleCancel = () => {
        navigate('/BoardPage');
    };

    const handleScrap = () => {
        setIsScrapped(true);
        // 여기서 스크랩된 상태를 서버에 업데이트
    };

    return (
        <div>
            <NavigationBar />
            <div className="DetailBox">
                <div className="postInfo">
                    <div className="authorInfo">
                        <div className="profilePicture">
                            <img className="profileImage" src={post.imagePath} alt="프로필 사진" />
                        </div>
                        <div className="name">{post.name} / </div>
                        <div className="major">{post.department}  /  {post.tags && post.tags.map(tag => tag.name).join(', ')}</div>
                    </div>
                    <div className="numPeople">
                        <div className="totalPeopleInfo">{post.participantsnum}명</div>
                    </div>
                </div>
                <div className="titleBox">
                    <div className="ptitle">
                        <p>{post.title}</p>
                    </div>
                </div>
                <div className="contentBoxLarge">
                    <div className="contents">
                        <p>{post.content}</p>
                    </div>
                </div>
                <div>
                    <button onClick={handleScrap} className='ScrapButton' disabled={isScrapped}>스크랩</button>
                    <button onClick={handleCancel} className='CancelButton'>취소</button>
                </div>
            </div>
        </div>
    );
}

export default ViewAllPost;

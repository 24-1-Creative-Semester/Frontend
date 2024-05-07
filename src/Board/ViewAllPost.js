import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../Component/Navigation';
import './ViewAllPost.css';

const ViewAllPost = ({ posts }) => {
    const { postId } = useParams(); // URL 파라미터로부터 postId를 추출
    const navigate = useNavigate();

    // postId에 해당하는 게시물을 posts 배열에서 찾기
    const post = posts.find(post => post.PostId === parseInt(postId));
    const [isScrapped, setIsScrapped] = useState(false);

    // 게시물 정보가 없는 경우에 대한 처리
    if (!post) {
        return <div>해당하는 게시물을 찾을 수 없습니다.</div>;
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
            <div><NavigationBar /></div>
            <div className="DetailBox">
                <div className="postInfo">
                    <div className="authorInfo">
                        <div className="profilePicture">
                            <img className="profileImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="프로필 사진" />
                        </div>
                        <div className="name">{post.author}</div>
                        <div className="major">{post.major} / {post.tags.join(', ')}</div>
                    </div>
                    <div className="numPeople">
                        <div className="totalPeopleInfo">{post.totalPeople}명</div>
                    </div>
                </div>
                <div className="titleBox">
                    <div className="title">
                        <p>{post.title}</p>
                    </div>
                </div>
                <div className="contentBoxLarge">
                    <div className="content">
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

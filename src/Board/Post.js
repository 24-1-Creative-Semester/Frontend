import "./Post.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
    const navigate = useNavigate(); // 조건부 호출을 피하기 위해 여기서 호출

    if (!post) {
        return <div>게시물이 없습니다.</div>;
    }

    const handlePostClick = () => {
        // 클릭 시 해당 게시물의 상세 페이지로 이동
        navigate(`/ViewAllPost/${post.PostId}`); // 예를 들어, 각 게시물의 ID를 이용하여 동적 URL을 생성할 수 있습니다.
    };

    return (
        <div className="postContainer" onClick={handlePostClick}>
            <div className="postInfo">
                <div className="authorInfo">
                    <div className="profilePicture">
                        <img className="profileImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="프로필 사진" />
                    </div>
                    <div className="name">{post.author}</div>
                    <div className="major">{post.major}</div>
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
            <div className="contentBox">
                <div className="content">
                    <p>{post.content}</p>
                </div>
            </div>
            

        </div>
    );
}

export default Post;

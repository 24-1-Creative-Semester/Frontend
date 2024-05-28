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
                <div className="nameInfo">
                    <div className="profilePicture">
                        <img className="profileImage" src={post.image} alt="프로필 사진" /> 
                    </div>
                    <div className="pname">{post.name}</div>
                    <div className="department">{post.department}</div>
                </div>
                <div className="numPeople">
                    <div className="totalPeopleInfo">{post.totalPeople}명</div>
                </div>
            </div>
            <div className="titleBox">
                <div className="ptitle">
                    <p>{post.title}</p>
                </div>
            </div>
            <div className="contentBox">
                <div className="contents">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;

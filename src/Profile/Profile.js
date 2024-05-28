import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Profile.css';
import NavigationBar from '../Component/Navigation';
import MyPost from '../Modal/MyPost';
import ScrapPost from '../Modal/ScrapPost';
import MyLanguage from '../Modal/MyLanguage';
import MyProject from '../Modal/MyProject';
import MyField from '../Modal/MyField';

function Profile() {
    const [userId, setUserId] = useState(0);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [grade, setGrade] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');
    const [profileId, setProfileId] = useState(0);
    const profileInput = useRef(null);

    const [userInfo, setUserInfo] = useState({
        name: '',
        department: '',
        grade: '',
        status: '',
        image: '',
    });

    const profileOnClick = () => {
        profileInput.current?.click();
    };

    // 사용자 정보를 가져오는 비동기 함수
    const fetchUserInfo = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = parseInt(user.id, 10);
            const profileId = parseInt(user.profile.profileId, 10);
            
            setName(user.name);
            setUserId(userId);
            setDepartment(user.department);
            setGrade(user.grade);
            setStatus(user.status);
            setImage(user.image);
            setProfileId(profileId);

            const response = await axios.get(`http://172.16.86.241:8080/${profileId}/imagereturn`);
            console.log("GET 요청");
            console.log(response.data);
            const imageUrl = response.data;

            setUserInfo(prevState => ({
                ...prevState,
                image: imageUrl,
            }));
            
            setImage(imageUrl); // 이미지 변수 수정
        } catch (error) {
            console.error("사용자 정보를 불러오는데 실패했습니다:", error);
        }
    };

    // 컴포넌트가 마운트될 때 사용자 정보를 가져옴
    useEffect(() => {
        fetchUserInfo();
    }, []);

    const imageOnChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const result = await axios.post(`http://172.16.86.241:8080/${profileId}/imageUpload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                const imageURL = result.data; // 서버에서 반환된 이미지 URL
                console.log("POST 요청의 반환값: " + imageURL);
                setImage(imageURL);

                setUserInfo(prevState => ({
                    ...prevState,
                    image: imageURL,
                }));

                // 로컬 스토리지에 이미지 URL 저장
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                user.image = imageURL;
                localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                console.error("이미지 업로드에 실패했습니다:", error);
            }
        }
    };

    const [myPostModalOpen, setMyPostModalOpen] = useState(false);
    const [scrapPostModalOpen, setScrapPostModalOpen] = useState(false);
    const [myLanguageModalOpen, setMyLanguageModalOpen] = useState(false);
    const [myProjectModalOpen, setMyProjectModalOpen] = useState(false);
    const [myFieldModalOpen, setMyFieldModalOpen] = useState(false);

    const showMyPostModal = () => setMyPostModalOpen(true);
    const showScrapPostModal = () => setScrapPostModalOpen(true);
    const showMyLanguageModal = () => setMyLanguageModalOpen(true);
    const showMyProjectModal = () => setMyProjectModalOpen(true);
    const showMyFieldModal = () => setMyFieldModalOpen(true);

    return (
        <div>
            <NavigationBar />
            <div>
                <img src={image} className="사진" alt="프로필사진" onClick={profileOnClick} />
                <input type="file" accept="image/*" hidden ref={profileInput} onChange={imageOnChange} />
            </div>
            <div style={{ textAlign: "center" }}>
                {name} / {department} / {grade}학년 / {status}
            </div>
            <div className="my">
                <div className="내가올린게시물" onClick={showMyPostModal}>내가 올린 게시물</div>
                {myPostModalOpen && <MyPost setMyPostModalOpen={setMyPostModalOpen} />}
                <div className="저장한글" onClick={showScrapPostModal}>저장한 글</div>
                {scrapPostModalOpen && <ScrapPost setScrapPostModalOpen={setScrapPostModalOpen} />}
                <div className="사용언어" onClick={showMyLanguageModal}>사용언어</div>
                {myLanguageModalOpen && <MyLanguage setMyLanguageModalOpen={setMyLanguageModalOpen} />}
                <div className="프로젝트이력" onClick={showMyProjectModal}>프로젝트 이력</div>
                {myProjectModalOpen && <MyProject setMyProjectModalOpen={setMyProjectModalOpen} />}
                <div className="관심분야" onClick={showMyFieldModal}>관심분야</div>
                {myFieldModalOpen && <MyField setMyFieldModalOpen={setMyFieldModalOpen} />}
            </div>
        </div>
    );
}

export default Profile;

import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import axios from "axios";
import NavigationBar from "../Component/Navigation";
import MyPost from "../Modal/MyPost";
import ScrapPost from "../Modal/ScrapPost";
import MyLanguage from "../Modal/MyLanguage";
import MyProject from "../Modal/MyProject";
import MyField from "../Modal/MyField";

function Profile() {
    //변수 정의, 변수 초기값 설정
    const [name, setName] = useState("카리나"); //이름
    const [department, setDepartment] = useState("컴퓨터공학과"); //학과
    const [grade, setGrade] = useState("3학년"); //학년
    const [state, setState] = useState("재학");
    const [project, setProject] = useState(null); //프로젝트
    const [field, setField] = useState(null); //분야
    const [image, setImage] = useState(process.env.PUBLIC_URL + "/initImage.webp"); //사진
    const profileInput = useRef(null);

    /*필요한 사용자 데이터 불러오기
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response=>{
            setName(response.name);
            setDepartment(response.department);
            setGrade(response.grade);
            setState(response.state);
            setLanguage(response.language);
            setProject(response.project);
            setField(response.field);
            setImage(response.image);
        });
    });
    사용자 데이터 보내기 - 이해필요
    */

    /* <<<<<<<<<<<<< !!!!!!!! 이 부분만 추가 해놧어 로그인페이지에서 id 로컬 스토리지로 저장햇어 이거 써서 하면 돼 - 승히 !!!!!!!!! >>>>>>>>>>>>>>>>>>>>>>>>>>>
    const [userInfo, setUserInfo] = useState({
        name: "",
        department: "",
        grade: "",
        state: "",
        image: process.env.PUBLIC_URL + "/initImage.webp",
    });

    useEffect(() => {
        async function fetchUserInfo() {
            const userID = localStorage.getItem('userID');
            if (!userID) {
                console.error('사용자 ID가 없습니다.');
                return;
            }

            try {
                const response = await axios.get(`https://서버주소/userinfo/${userID}`);
                setUserInfo(prevState => ({
                    ...prevState,
                    name: response.data.name,
                    department: response.data.department,
                    grade: response.data.grade,
                    state: response.data.state,
                    // 필요한 다른 사용자 정보 추가
                }));
            } catch (error) {
                console.error('사용자 정보를 불러오는데 실패했습니다:', error);
            }
        }
        fetchUserInfo();
    }, []);
    */

    //프로필 사진 변경
    const profileOnClick = () => {
        profileInput.current.click();
    };
    const imageOnChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setImage(reader.result);
            //axios.post('https://jsonplaceholder.typicode.com/todos/1', reader.result);
        };
        console.log(e.target.files[0]);
    };

    //지금은 안 쓰는 기능(데이터 바로바로 바뀌는 기능)이지만 혹시 몰라 놔두는 게 좋을 듯
    /* 
    const promptProject = () => {
        const projectInput = prompt("프로젝트 이력을 입력하세요: ");
        if(projectInput!=null){
        const 프로젝트이력Element = document.querySelector('.프로젝트이력');
        프로젝트이력Element.textContent = "프로젝트 이력: " + projectInput;
        setProject(projectInput);
        console.log('프로젝트이력:'+projectInput);
        }
    }

    const promptField = () => {
        const fieldInput = prompt("관심분야를 입력하세요: ");
        if(fieldInput!=null){
        const 관심분야Element = document.querySelector('.관심분야');
        관심분야Element.textContent = "관심분야: " + fieldInput;
        setField(fieldInput);
        console.log('관심분야:'+fieldInput);
        }
    }
    */

    //modal 정의
    const [myPostModalOpen, setMyPostModalOpen] = useState(false);
    const [scrapPostModalOpen, setScrapPostModalOpen] = useState(false);
    const [myLanguageModalOpen, setMyLanguageModalOpen] = useState(false);
    const [myProjextModalOpen, setMyProjectModalOpen] = useState(false);
    const [myFieldModalOpen, setMyFieldModalOpen] = useState(false);
    //modal 키기
    const showMyPostModal = () => {
        setMyPostModalOpen(true);
    };
    const showScrapPostModal = () => {
        setScrapPostModalOpen(true);
    };
    const showMyLanguageModal = () => {
        setMyLanguageModalOpen(true);
    };
    const showMyProjectModal = () => {
        setMyProjectModalOpen(true);
    };
    const showMyFieldModal = () => {
        setMyFieldModalOpen(true);
    };

    return (
        <div>
            <NavigationBar />
            <div>
                <img src={image} className="image" alt="프로필사진" onClick={profileOnClick} />
                <input type="file" accept="image" hidden ref={profileInput} onChange={(e) => imageOnChange(e)} />
            </div>
            <div style={{ textAlign: "center" }}>
                {name} / {department} / {grade} / {state}
            </div>
            <div className="my">
                <div className="내가올린게시물" onClick={showMyPostModal}>
                    내가 올린 게시물
                </div>
                {myPostModalOpen && <MyPost setMyPostModalOpen={setMyPostModalOpen} />}
                <div className="저장한글" onClick={showScrapPostModal}>
                    저장한 글
                </div>
                {scrapPostModalOpen && <ScrapPost setScrapPostModalOpen={setScrapPostModalOpen} />}
                <div className="사용언어" onClick={showMyLanguageModal}>
                    사용언어
                </div>
                {myLanguageModalOpen && <MyLanguage setMyLanguageModalOpen={setMyLanguageModalOpen} />}
                <div className="프로젝트이력" onClick={showMyProjectModal}>
                    프로젝트 이력
                </div>
                {myProjextModalOpen && <MyProject setMyProjectModalOpen={setMyProjectModalOpen} />}
                <div className="관심분야" onClick={showMyFieldModal}>
                    관심분야
                </div>
                {myFieldModalOpen && <MyField setMyFieldModalOpen={setMyFieldModalOpen} />}
            </div>
        </div>
    );
}

export default Profile;
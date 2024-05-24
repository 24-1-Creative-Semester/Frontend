import React, { useEffect, useState } from 'react';
import NavigationBar from '../Component/Navigation';
import "./Job.css";
import axios from 'axios';

const JobListing = ({ job }) => {
  return (
    <div className="job-listing">
      <h2>{job.JO_SJ}</h2>
      <p><strong>기업명:</strong> {job.CMPNY_NM}</p>
      <p><strong>구인등록번호:</strong> {job.JO_REGIST_NO}</p>
      <p><strong>모집인원수:</strong> {job.RCRIT_NMPR_CO}</p>
      <p><strong>경력 조건:</strong> {job.CAREER_CND_CMMN_CODE_SE}</p>
      <p><strong>마감일:</strong> {job.RCEPT_CLOS_NM}</p>
      <p><strong>직무내용:</strong> {job.DTY_CN}</p>
    </div>
  );
};

const JobPage = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // 실제 API 호출은 주석 처리
        // axios.get('API_URL')
        //   .then(response => {
        //     setJobs(response.data);
        //   })
        //   .catch(error => {
        //     console.error('There was an error fetching the job listings!', error);
        //   });

        // 더미 데이터 사용
        const dummyData = [
            {
                CMPNY_NM: "Company A",
                JO_REGIST_NO: "12345",
                RCRIT_NMPR_CO: "5",
                CAREER_CND_CMMN_CODE_SE: "경력 무관",
                RCEPT_CLOS_NM: "2024-12-31",
                JO_SJ: "Software Engineer",
                DTY_CN: "Develop and maintain web applications."
            },
            {
                CMPNY_NM: "Company B",
                JO_REGIST_NO: "67890",
                RCRIT_NMPR_CO: "3",
                CAREER_CND_CMMN_CODE_SE: "신입",
                RCEPT_CLOS_NM: "2024-11-30",
                JO_SJ: "Data Analyst",
                DTY_CN: "Analyze data and generate reports."
            },
            {
                CMPNY_NM: "Company B",
                JO_REGIST_NO: "67890",
                RCRIT_NMPR_CO: "3",
                CAREER_CND_CMMN_CODE_SE: "신입",
                RCEPT_CLOS_NM: "2024-11-30",
                JO_SJ: "Data Analyst",
                DTY_CN: "Analyze data and generate reports."
            },
            {
                CMPNY_NM: "Company B",
                JO_REGIST_NO: "67890",
                RCRIT_NMPR_CO: "3",
                CAREER_CND_CMMN_CODE_SE: "신입",
                RCEPT_CLOS_NM: "2024-11-30",
                JO_SJ: "Data Analyst",
                DTY_CN: "Analyze data and generate reports."
            }
        ];

        setJobs(dummyData);
    }, []);

    return (
        <div className="job-page">
            <NavigationBar/>
            <button onClick={() => window.location.href = 'https://pf.kakao.com/_TxerNb'} className='SejongJob'>! 세종대학교 일자리플러스센터 바로가기 !</button>
            <div className="job-list">
                {jobs.map(job => (
                    <JobListing key={job.JO_REGIST_NO} job={job} />
                ))}
            </div>
        </div>
    );
};


export default JobPage;

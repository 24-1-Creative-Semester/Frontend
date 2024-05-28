import React, { useEffect, useState } from 'react';
import NavigationBar from '../Component/Navigation';
import "./Job.css";
import axios from 'axios';

const JobListing = ({ job }) => {
  return (
    <div className="job-listing">
      <h2>{job.jobTitle}</h2>
      <p><strong>기업명:</strong> {job.companyName}</p>
      <p><strong>구인등록번호:</strong> {job.jobRegisterNumber}</p>
      <p><strong>모집인원수:</strong> {job.recruitNumber}</p>
      <p><strong>경력 조건:</strong> {job.careerConditionCode}</p>
      <p><strong>마감일:</strong> {job.closingDate}</p>
      <p><strong>직무내용:</strong> {job.dutyContent}</p>
    </div>
  );
};

const JobPage = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // 실제 API 호출은 주석 처리
        axios.get("http://172.16.100.133:8080/api/job-postings")
          .then(response => {
            console.log(response.data);
            setJobs(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the job listings!', error);
          });
    }, []);

    return (
        <div className="job-page">
            <NavigationBar/>
            <button onClick={() => window.location.href = 'https://pf.kakao.com/_TxerNb'} className='SejongJob'>! 세종대학교 일자리플러스센터 바로가기 !</button>
            <div className="job-list">
                {jobs.map(job => (
                    <JobListing key={job.jobRegisterNumber} job={job} />
                ))}
            </div>
        </div>
    );
};


export default JobPage;
 
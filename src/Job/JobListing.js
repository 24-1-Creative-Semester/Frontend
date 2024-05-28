import React from 'react';
import "./Job.css";

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

export default JobListing;

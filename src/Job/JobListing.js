import React from 'react';
import "./Job.css";

const JobListing = ({ job }) => {
  return (
    <div className="job-listing">
      <h2>{job.JO_SJ}</h2>
      <p><strong>기업명:</strong> {job.CMPNY_NM}</p>
      <p><strong>구인등록번호:</strong> {job.JO_REGIST_NO}</p>
      <p><strong>모집인원수:</strong> {job.RCRIT_NMPR_CO}</p>
      <p><strong>경력조건코드:</strong> {job.CAREER_CND_CMMN_CODE_SE}</p>
      <p><strong>마감일:</strong> {job.RCEPT_CLOS_NM}</p>
      <p><strong>직무내용:</strong> {job.DTY_CN}</p>
    </div>
  );
};

export default JobListing;

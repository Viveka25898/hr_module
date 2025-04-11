/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ApprovalReview from './ApprovalReview';

const HRHeadApprovalPage = () => {
  const [status, setStatus] = useState(null);
  const [comment, setComment] = useState('');

  const candidateData = {
    name: 'Ramesh Kumar',
    cvLink: 'https://example.com/cv-ramesh.pdf',
    interviewRounds: [
      {
        roundName: 'Housekeeping Round',
        status: 'Passed',
        formData: {
          cleanliness: 'Excellent',
          punctuality: 'Good',
          communication: 'Fair',
        },
      },
      {
        roundName: 'Manager Round',
        status: 'Passed',
        formData: {
          attitude: 'Positive',
          experience: '3 years',
          teamFit: 'Yes',
        },
      },
      {
        roundName: 'Cluster Manager Round',
        status: 'Passed',
        formData: {
          leadership: 'Strong',
          decisionMaking: 'Very Good',
          comments: 'Recommended for offer',
        },
      },
    ],
    compensation: {
      grade: 'G3',
      basic: '₹12,000',
      hra: '₹3,000',
      specialAllowance: '₹2,000',
      totalCTC: '₹17,000',
    },
    PAN: 'ABCPK1234X',
    ESIC: '2345212000234',
  };

  const handleApprove = (comment) => {
    setStatus('approved');
    setComment(comment);
    // dispatch({ type: 'APPROVE_HR_HEAD', payload: { comment } })
  };

  const handleReject = (comment) => {
    setStatus('rejected');
    setComment(comment);
    // dispatch({ type: 'REJECT_HR_HEAD', payload: { comment } })
  };

  return (
    <ApprovalReview
      role="HR Head"
      data={candidateData.interviewRounds}
      extraDetails={{
        name: candidateData.name,
        cvLink: candidateData.cvLink,
        ...candidateData.compensation,
        PAN: candidateData.PAN,
        ESIC: candidateData.ESIC,
      }}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
};

export default HRHeadApprovalPage;

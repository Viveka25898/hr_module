/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// components/ApprovalReview.jsx
import React, { useState } from 'react';

const ApprovalReview = ({ role, onApprove, onReject, data, extraDetails }) => {
  const [status, setStatus] = useState(null);
  const [comment, setComment] = useState('');

  const handleApprove = () => {
    setStatus('approved');
    onApprove && onApprove(comment);
  };

  const handleReject = () => {
    setStatus('rejected');
    onReject && onReject(comment);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        {role} Approval View
      </h2>

      {/* Candidate Rounds Section */}
      {data.map((round, index) => (
        <div key={index} className="bg-gray-50 border rounded p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{round.roundName}</h3>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                round.status === 'Passed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {round.status}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            {Object.entries(round.formData).map(([label, val]) => (
              <div key={label}>
                <p className="text-sm text-gray-500 capitalize">{label}</p>
                <p className="font-medium text-gray-800">{val}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Extra Details Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Candidate Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
          {Object.entries(extraDetails).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              {key === 'cv' || key.includes('Document') ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Document
                </a>
              ) : (
                <p className="font-medium text-gray-800">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">Comments</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={`Enter your comments here (${role})`}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleApprove}
          disabled={status !== null}
          className={`px-5 py-2 font-medium rounded ${
            status === 'approved'
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {status === 'approved' ? 'Approved' : 'Approve'}
        </button>
        <button
          onClick={handleReject}
          disabled={status !== null}
          className={`px-5 py-2 font-medium rounded ${
            status === 'rejected'
              ? 'bg-red-600 text-white cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {status === 'rejected' ? 'Rejected' : 'Reject'}
        </button>
      </div>
    </div>
  );
};

export default ApprovalReview;

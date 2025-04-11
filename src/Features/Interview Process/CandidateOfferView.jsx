/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './CandidateOfferView.css';

const CandidateOfferView = () => {
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState(null);
  const [actionTaken, setActionTaken] = useState(false);

  const candidate = {
    id: '2',
    name: 'Priya Sharma',
    role: 'Admin Executive',
    site: 'Site B',
    supervisor: 'Ms. Nisha Patel',
    doj: '2025-04-18',
    email: 'priya.sharma@example.com',
    contact: '+91 9876501234',
    compAndBen: {
      grade: 'G4',
      basic: '₹14,000',
      hra: '₹4,000',
      specialAllowance: '₹3,000',
      totalCTC: '₹21,000',
    },
  };

  const handleAccept = () => {
    setStatus('accepted');
    setActionTaken(true);
  };

  const handleReject = () => {
    setStatus('rejected');
    setActionTaken(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 no-print no-screenshot">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/4 text-[100px] text-red-300 opacity-10 font-bold -rotate-45 pointer-events-none select-none z-0">
        DRAFT
      </div>

      <div className="relative bg-white shadow-2xl rounded-lg w-full max-w-3xl p-8 z-10">
        <h1 className="text-2xl font-bold mb-2 text-center">Offer Letter</h1>
        <p className="text-sm text-center text-gray-400 mb-6">[Confidential Preview Only]</p>

        {/* Screenshot & print restriction info */}
        <div className="text-red-600 text-xs mb-4 text-center font-medium">
          📢 Screenshots and Printing are disabled. Offer can be viewed once only. DRAFT until Date of Joining.
        </div>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Candidate Name:</strong> {candidate.name}</p>
          <p><strong>Role:</strong> {candidate.role}</p>
          <p><strong>Site:</strong> {candidate.site}</p>
          <p><strong>Reporting To:</strong> {candidate.supervisor}</p>
          <p><strong>Date of Joining:</strong> {candidate.doj}</p>
          <p><strong>Email:</strong> {candidate.email}</p>
          <p><strong>Contact:</strong> {candidate.contact}</p>
        </div>

        <h3 className="mt-6 font-semibold underline text-gray-800">Compensation & Benefits</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          <li><strong>Grade:</strong> {candidate.compAndBen.grade}</li>
          <li><strong>Basic:</strong> {candidate.compAndBen.basic}</li>
          <li><strong>HRA:</strong> {candidate.compAndBen.hra}</li>
          <li><strong>Special Allowance:</strong> {candidate.compAndBen.specialAllowance}</li>
          <li><strong>Total CTC:</strong> {candidate.compAndBen.totalCTC}</li>
        </ul>

        <textarea
          className="w-full mt-6 p-3 border border-gray-300 rounded text-sm"
          placeholder="Enter confirmation of Date of Joining or reason for rejection..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={4}
          disabled={actionTaken}
        />

        {status && (
          <div
            className={`mt-4 text-center text-sm font-medium ${
              status === 'accepted' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Offer {status === 'accepted' ? 'Accepted' : 'Rejected'} Successfully ✅
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            className={`px-4 py-2 rounded text-white ${
              actionTaken
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={handleAccept}
            disabled={actionTaken}
          >
            Accept Offer
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${
              actionTaken
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
            onClick={handleReject}
            disabled={actionTaken}
          >
            Reject Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateOfferView;

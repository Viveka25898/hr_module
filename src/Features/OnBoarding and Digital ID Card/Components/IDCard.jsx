/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const IDCard = ({ joiner }) => {
  const employeeCode = `EMP-${joiner.id.toString().padStart(4, '0')}`;

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-blue-200">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-green-700">Employee ID Card</h2>
        <p className="text-green-500 text-sm">Powered by iSMART</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-inner space-y-2">
        <div>
          <span className="font-semibold text-gray-700">Name:</span> {joiner.name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Employee Code:</span> {employeeCode}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Site Name:</span> {joiner.siteName}
        </div>
        <div>
          <span className="font-semibold text-gray-700">PF Number:</span> {joiner.pfNumber}
        </div>
        <div>
          <span className="font-semibold text-gray-700">ESIC Number:</span> {joiner.esicNumber}
        </div>
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.ismart.app"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          📲 Download iSMART App
        </a>
      </div>
    </div>
  );
};

export default IDCard;

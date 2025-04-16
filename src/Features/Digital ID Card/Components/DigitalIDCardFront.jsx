/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const DigitalIDCardFront = ({ onFlip }) => {
  const [activeTab, setActiveTab] = useState('Training');

  const features = [
    'Training',
    'Company Info',
    'PF / ESIC',
    'Whiteboard',
    'SOS Locations',
    'Lead Generation',
    'Candidate Profile',
    'Card Scanner',
    'Brochure Sharing',
  ];

  return (
    <div className="w-[350px] h-[550px] bg-white shadow-xl rounded-2xl p-4 flex flex-col justify-between">
        {/* Company Logo - Top Left */}
<img
  src="/src/Auth/assets/iSmart.png" // update this to your actual logo path
  alt="Company Logo"
  className="absolute top-0 left-3 w-20 h-20 object-contain"
/>

      {/* Header Section */}

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-4">
        <img
          src="/src/Assets/candidtaeimage.png"
          alt="Employee"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
        />
        <h2 className="text-lg font-semibold mt-2">John Doe</h2>
        <p className="text-sm text-gray-600">Software Engineer</p>
        <p className="text-sm text-gray-500">iSmart Technologies</p>
        <p className="text-sm text-gray-400">Pune, MH</p>
      </div>

      {/* Attendance Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        <button className="border border-gray-300 py-2 px-2 rounded-lg hover:bg-gray-100">
          🌍 Geo Attendance
        </button>
        <button className="border border-gray-300 py-2 px-2 rounded-lg hover:bg-gray-100">
          🔳 QR Scan
        </button>
      </div>

     {/* Tab Navigation */}
     <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {features.map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-1 px-3 rounded-full text-xs font-medium ${
                        activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    >
                    {tab}
                    </button>
                ))}
                </div>

      {/* Feature Cards Grid */}
      {/* ✅ Active Tab Content */}




      {/* Flip Button */}
      <div className="mt-3 text-center">
        <button
          onClick={onFlip}
          className="text-sm text-blue-500 hover:underline"
        >
          Flip to Back
        </button>
      </div>
    </div>
  );
};

  
  

export default DigitalIDCardFront;

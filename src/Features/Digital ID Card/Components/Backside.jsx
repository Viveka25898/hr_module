/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import QRCode from 'react-qr-code'; // Make sure this package is installed

const BackSide = ({ onFlip }) => {
  const employee = {
    name: 'John Doe',
    designation: 'Software Engineer',
    phone: '+1 234 567 890',
    email: 'johndoe@example.com',
    profileUrl: 'https://www.example.com/johndoe', // Link to share
  };

  const handleShare = async () => {
    const shareData = {
      title: `${employee.name} | ${employee.designation}`,
      text: `Contact: ${employee.name}\n${employee.designation}\nPhone: ${employee.phone}\nEmail: ${employee.email}`,
      url: employee.profileUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    } else {
      alert('Web Share is not supported in this browser.');
    }
  };

  return (
    <div className="w-[350px] h-[550px] bg-white shadow-xl rounded-2xl p-6 mx-auto flex flex-col justify-between items-center text-gray-800">
        <img
  src="/src/Auth/assets/iSmart.png" // update this to your actual logo path
  alt="Company Logo"
  className="absolute top-0 left-0 w-20 h-20 object-contain"
/>
      {/* Employee Photo */}
      <div className="mb-4">
        <img
          src="/src/Assets/candidtaeimage.png"
          alt="Employee Photo"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Employee Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold">{employee.name}</h3>
        <p className="text-sm text-gray-500">{employee.designation}</p>
        <p className="text-sm text-gray-600">{employee.phone}</p>
        <p className="text-sm text-gray-600">{employee.email}</p>
      </div>

      {/* QR Code */}
      <div className="mb-4">
        <QRCode value={employee.profileUrl} size={100} />
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Share
      </button>

      {/* Flip Back Button */}
      <button
        onClick={onFlip}
        className="mt-4 text-sm text-blue-500 hover:underline"
      >
        Flip to Front
      </button>
    </div>
  );
};

export default BackSide;

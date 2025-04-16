/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const QRCodeSection = ({ employee }) => {
  if (!employee) return null;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(employee.qrData)}&size=150x150`;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">Dynamic QR Code</h3>

      <img
        src={qrUrl}
        alt="Employee QR Code"
        className="w-36 h-36 mb-2"
      />

      <p className="text-sm text-gray-600 text-center">
        Scan this QR to record attendance or share contact details.
      </p>

      {/* Optional: Placeholder for geo/face/scan options */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
          Geo Attendance
        </button>
        <button className="px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600">
          QR Scan Mode
        </button>
        <button className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm hover:bg-purple-600">
          Face Recognition
        </button>
      </div>
    </div>
  );
};

export default QRCodeSection;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const FlipCard = ({ employee }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!employee) return null;

  return (
    <div
      className="w-[300px] h-[200px] perspective cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front - ID Card */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-xl p-4 backface-hidden">
          <div className="flex items-center gap-4">
            <img
              src={employee.photoUrl}
              alt={employee.name}
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <h3 className="text-lg font-bold">{employee.name}</h3>
              <p className="text-sm">{employee.designation}</p>
              <p className="text-sm">{employee.department}</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <p><strong>Site:</strong> {employee.site}</p>
            <p><strong>Mobile:</strong> {employee.mobile}</p>
            <p><strong>Email:</strong> {employee.email}</p>
          </div>
        </div>

        {/* Back - Visiting Card */}
        <div className="absolute w-full h-full bg-gray-100 rounded-xl shadow-xl p-4 rotate-y-180 backface-hidden">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img
              src={employee.photoUrl}
              alt="Employee"
              className="w-20 h-20 rounded-full border border-gray-300 mb-2"
            />
            <h3 className="font-semibold text-lg">{employee.name}</h3>
            <p className="text-sm">{employee.company}</p>
            <p className="text-sm">{employee.address}</p>
            <p className="text-sm">{employee.mobile}</p>
            <div className="mt-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(employee.qrData)}&size=100x100`}
                alt="QR Code"
                className="mx-auto"
              />
              <p className="text-xs mt-1">Scan to save contact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

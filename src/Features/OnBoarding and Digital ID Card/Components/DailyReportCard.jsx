/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/sections/bhr/dailyReport/DailyReportCard.jsx

import React from "react";

const DailyReportCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 w-full sm:w-[300px]">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DailyReportCard;

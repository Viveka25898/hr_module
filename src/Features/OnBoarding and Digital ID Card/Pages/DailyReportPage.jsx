/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/sections/bhr/dailyReport/DailyReportPage.jsx

import React, { useState } from "react";
import DailyReportCard from "../Components/DailyReportCard";
import { todayJoiners, totalEmployees, averageCostPerEmployee } from "../data/mockData";
import { generatePDF } from "../Components/utils";
import { FaUsers, FaMoneyBillWave, FaCalendarCheck } from "react-icons/fa";

const DailyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  // Filtered joiners by selected date
  const filteredJoiners = todayJoiners.filter(
    (j) => j.joiningDate === selectedDate
  );

  const totalJoinersToday = filteredJoiners.length;
  const totalCost = totalEmployees * averageCostPerEmployee;

  const handleSendMock = () => {
    alert("📨 Report sent to Senior Management (mock)!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daily Report to Senior Management</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label className="text-sm font-semibold">
          Filter by Date:{" "}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="ml-2 border p-2 rounded"
          />
        </label>

        <div className="flex gap-3 mt-2 sm:mt-0">
          <button
            onClick={() => generatePDF(filteredJoiners, selectedDate)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download as PDF
          </button>

          <button
            onClick={handleSendMock}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send to Management
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <DailyReportCard
          title="Today's Joiners"
          value={totalJoinersToday}
          icon={<FaCalendarCheck />}
        />
        <DailyReportCard
          title="Total Active Staff"
          value={totalEmployees}
          icon={<FaUsers />}
        />
        <DailyReportCard
          title="Notional Monthly Cost"
          value={`₹${totalCost.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Today's Joiners</h2>
        {filteredJoiners.length > 0 ? (
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Joining Date</th>
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Site</th>
              <th className="py-2 px-4 text-left">Site Manager</th>
              <th className="py-2 px-4 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredJoiners.map((joiner) => (
                <tr key={joiner.id} className="border-t">
                  <td className="py-2 px-4">{joiner.name}</td>
                  <td className="py-2 px-4">{joiner.joiningDate}</td>
                  <td className="py-2 px-4">{joiner.department}</td>
                  <td className="py-2 px-4">{joiner.role}</td>
                  <td className="py-2 px-4">{joiner.siteName}</td>
                  <td className="py-2 px-4">{joiner.siteManagerName}</td>
                  <td className="py-2 px-4">₹{joiner.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No joiners found for selected date.</p>
        )}
      </div>
    </div>
  );
};

export default DailyReportPage;

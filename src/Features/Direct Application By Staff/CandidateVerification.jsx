/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CandidateVerification = () => {
  const location = useLocation();
  const oldData = location.state?.oldData || {};

  const [currentData, setCurrentData] = useState({ ...oldData });
  const [activeTab, setActiveTab] = useState("old"); // Default: 'old' tab selected

  // Handle Input Change
  const handleChange = (e) => {
    setCurrentData({ ...currentData, [e.target.name]: e.target.value });
  };

  //Handle Save
  const handleSave=()=>{
    console.log("Updated Candidate Data",currentData);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Candidate Verification
        </h2>

        {/* Tab Buttons */}
        <div className="flex mb-4">
          <button
            className={`flex-1 p-2 text-gray-700 font-bold rounded-l transition ${
              activeTab === "old" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("old")}
          >
            Old Details
          </button>
          <button
            className={`flex-1 p-2 text-gray-700 font-bold rounded-r transition ${
              activeTab === "current" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("current")}
          >
            Current Details
          </button>
        </div>

        {/* Old Details - Read-Only */}
        {activeTab === "old" && (
          <div className="bg-gray-200 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Old Details (Read-Only)</h3>
            {Object.keys(oldData).map((key) => (
              <p key={key} className="text-gray-700">
                <strong>{key.toUpperCase()}:</strong> {oldData[key]}
              </p>
            ))}
          </div>
        )}

        {/* Current Details - Editable */}
        {activeTab === "current" && (
          <div className="bg-white p-4 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Current Details (Editable)</h3>
            {Object.keys(currentData).map((key) => (
              <div key={key} className="mb-2">
                <label className="block text-gray-700 font-semibold">{key.toUpperCase()}:</label>
                <input
                  type="text"
                  name={key}
                  value={currentData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-gray-200"
                />
              </div>
            ))}
          </div>
        )}

        {/* Save Button (Only Visible on Current Details Tab) */}
        {activeTab === "current" && (
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleSave}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default CandidateVerification;

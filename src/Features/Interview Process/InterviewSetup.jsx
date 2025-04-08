/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InterviewSetup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { candidateName: initialName = "" } = location.state || {};

  const [candidateName] = useState(initialName); // Read-only
  const [timeOfEntry, setTimeOfEntry] = useState("");
  const [grade, setGrade] = useState("");
  const [isTechnicalStaff, setIsTechnicalStaff] = useState(false);
  const [isFinalRound, setIsFinalRound] = useState(false);

  const handleEntrySubmit = () => {
    if (!timeOfEntry || !grade) {
      alert("Please fill all required fields.");
      return;
    }

    const entryData = {
      candidateName,
      timeOfEntry,
      grade,
      isTechnicalStaff,
      isFinalRound,
    };

    navigate("/dashboard/TA/interviews-table", { state: entryData });
  };

  return (
    <div className="space-y-4">
       <h1 className="text-3xl font-semibold text-green-800 mb-6 border-b pb-2 text-center">
                Interview Setup
        </h1>
      <div>
        <label className="font-medium">Candidate Name:</label>
        <input
          className="w-full border p-2 rounded mt-1"
          type="text"
          value={candidateName}
          placeholder="Enter full name"
          readOnly
        />
      </div>

      <div>
        <label className="font-medium">Time of Entry:</label>
        <input
          className="w-full border p-2 rounded mt-1"
          type="time"
          value={timeOfEntry}
          onChange={(e) => setTimeOfEntry(e.target.value)}
        />
      </div>

      <div>
        <label className="font-medium">Grade / Role:</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="">Select Grade</option>
          <option value="Executive">Executive</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Manager">Manager</option>
          <option value="Vice President">Vice President</option>
        </select>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <input
          type="checkbox"
          checked={isTechnicalStaff}
          onChange={(e) => setIsTechnicalStaff(e.target.checked)}
        />
        <label>Technical Staff?</label>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isFinalRound}
          onChange={(e) => setIsFinalRound(e.target.checked)}
        />
        <label>Is this a Final Round?</label>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleEntrySubmit}
      >
        Submit Entry
      </button>
    </div>
  );
};

export default InterviewSetup;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Dummy candidate
const dummyCandidate = {
  id: 2,
  candidateName: "Priya Desai",
  interviewDate: "2025-04-08",
  entryTime: "11:00 AM",
  grade: "Manager",
  department: "Finance",
};

// Dummy panelists
const allPanelists = [
  { id: 1, name: "Meera Iyer", designation: "Director", department: "IT" },
  { id: 2, name: "Anil Rathi", designation: "AVP", department: "HR" },
  { id: 3, name: "Raj Shekhar", designation: "Sr. Manager", department: "Operations" },
  { id: 4, name: "Sunita Meena", designation: "Team Lead", department: "Sales" },
  { id: 5, name: "Manish Paul", designation: "GM", department: "Legal" },
  { id: 6, name: "Kavita Sinha", designation: "VP", department: "Marketing" },
  { id: 7, name: "Anurag Joshi", designation: "Sr. Executive", department: "Admin" },
];

const AssignPanelist = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [assigned, setAssigned] = useState(false);
  const [selectedPanelists, setSelectedPanelists] = useState([]);
  const [interviewType, setInterviewType] = useState("");
  const [interviewRound, setInterviewRound] = useState("");

  useEffect(() => {
    const found = dummyCandidate;
    setCandidate(found);

    // Pre-select panelists based on grade
    let panelCount = 0;
    if (found.grade === "Manager") panelCount = 1;
    else if (found.grade === "Vice President") panelCount = 2;

    const eligiblePanelists = allPanelists.filter(
      (p) => p.department !== found.department
    );

    setSelectedPanelists(eligiblePanelists.slice(0, panelCount));
  }, []);

  const handleAssign = () => {
    if (!interviewType || !interviewRound) {
      toast.error("Please fill Interview Type and Interview Round.");
      return;
    }

    setAssigned(true);
    toast.success("Panelist(s) assigned successfully!");
  };

  if (!candidate) {
    return (
      <div className="p-6 text-red-600 font-medium text-lg">
        Candidate not found or data missing.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-3xl font-semibold text-green-700 underline mb-6 text-center">
        Assign Panelist
      </h2>

      {/* Interview Info Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border border-green-300 p-4 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Interview Type</label>
          <select
            value={interviewType}
            onChange={(e) => setInterviewType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Managerial">Managerial</option>
            <option value="Vice President">Vice President</option>
            <option value="Final Round">Final Round</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Interview Round</label>
          <input
            type="text"
            placeholder="e.g., Round 1"
            value={interviewRound}
            onChange={(e) => setInterviewRound(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Candidate Info */}
      <div className="border border-green-300 rounded p-4 mb-6 shadow">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Candidate Information
        </h3>
        <p><strong>Name:</strong> {candidate.candidateName}</p>
        <p><strong>Date:</strong> {candidate.interviewDate}</p>
        <p><strong>Entry Time:</strong> {candidate.entryTime}</p>
        <p><strong>Grade:</strong> {candidate.grade}</p>
        <p><strong>Department:</strong> {candidate.department}</p>

        {/* Display Interview Info if entered */}
        {interviewType && interviewRound && (
          <div className="bg-green-50 p-3 rounded mt-4 border border-green-200">
            <p className="text-green-800 font-semibold">
              Interview Type: <span className="font-normal">{interviewType}</span>
            </p>
            <p className="text-green-800 font-semibold">
              Interview Round: <span className="font-normal">{interviewRound}</span>
            </p>
          </div>
        )}
      </div>

      {/* Assigned Panelist */}
      <div className="border border-green-300 rounded p-4 shadow">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Assigned Panelists</h3>

        {selectedPanelists.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 mb-4">
            {selectedPanelists.map((panelist) => (
              <li key={panelist.id}>
                {panelist.name} – {panelist.designation} ({panelist.department})
              </li>
            ))}
          </ul>
        ) : (
          assigned && (
            <p className="text-gray-500 mb-4">No panelists assigned.</p>
          )
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          className={`px-5 py-2 rounded font-semibold ${
            assigned
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          disabled={assigned}
          onClick={handleAssign}
        >
          {assigned ? "Panelist Assigned" : "Assign Panelist"}
        </button>

        <button
          className="px-5 py-2 bg-white border border-green-600 text-green-700 hover:bg-green-50 rounded font-semibold"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AssignPanelist;

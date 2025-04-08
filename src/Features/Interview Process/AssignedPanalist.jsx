/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Dummy candidate data
const dummyCandidates = [
  {
    id: 1,
    candidateName: "Rohit Sharma",
    interviewDate: "2025-04-08",
    entryTime: "10:30 AM",
    grade: "Executive",
    department: "Operations",
  },
  {
    id: 2,
    candidateName: "Priya Desai",
    interviewDate: "2025-04-08",
    entryTime: "11:00 AM",
    grade: "Manager",
    department: "Finance",
  },
  {
    id: 3,
    candidateName: "Ankit Patel",
    interviewDate: "2025-04-08",
    entryTime: "11:45 AM",
    grade: "Vice President",
    department: "Marketing",
  },
  {
    id: 4,
    candidateName: "Sneha Shah",
    interviewDate: "2025-04-08",
    entryTime: "12:30 PM",
    grade: "Supervisor",
    department: "Sales",
  },
  {
    id: 5,
    candidateName: "Aman Gupta",
    interviewDate: "2025-04-08",
    entryTime: "01:00 PM",
    grade: "Manager",
    department: "IT",
  },
  {
    id: 6,
    candidateName: "Komal Joshi",
    interviewDate: "2025-04-08",
    entryTime: "01:30 PM",
    grade: "Vice President",
    department: "Operations",
  },
  {
    id: 7,
    candidateName: "Deepak Nair",
    interviewDate: "2025-04-08",
    entryTime: "02:00 PM",
    grade: "Executive",
    department: "HR",
  },
  {
    id: 8,
    candidateName: "Neha Mehta",
    interviewDate: "2025-04-08",
    entryTime: "02:30 PM",
    grade: "Manager",
    department: "Admin",
  },
  {
    id: 9,
    candidateName: "Yash Raj",
    interviewDate: "2025-04-08",
    entryTime: "03:00 PM",
    grade: "Supervisor",
    department: "Finance",
  },
  {
    id: 10,
    candidateName: "Tanya Kapoor",
    interviewDate: "2025-04-08",
    entryTime: "03:30 PM",
    grade: "Vice President",
    department: "Admin",
  },
];

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
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [assigned, setAssigned] = useState(false);
  const [selectedPanelists, setSelectedPanelists] = useState([]);

  useEffect(() => {
    const found = dummyCandidates.find((c) => c.id === Number(candidateId));
    if (found) {
      setCandidate(found);

      // Panelist assignment logic
      let panelCount = 0;
      if (found.grade === "Manager") panelCount = 1;
      if (found.grade === "Vice President") panelCount = 2;

      const eligiblePanelists = allPanelists.filter(
        (p) => p.department !== found.department
      );

      setSelectedPanelists(eligiblePanelists.slice(0, panelCount));
    }
  }, [candidateId]);

  const handleAssign = () => {
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

      <div className="border border-green-300 rounded p-4 mb-6 shadow">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Candidate Information
        </h3>
        <p><strong>Name:</strong> {candidate.candidateName}</p>
        <p><strong>Date:</strong> {candidate.interviewDate}</p>
        <p><strong>Entry Time:</strong> {candidate.entryTime}</p>
        <p><strong>Grade:</strong> {candidate.grade}</p>
        <p><strong>Department:</strong> {candidate.department}</p>
      </div>

      <div className="border border-green-300 rounded p-4 shadow">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Assigned Panelists</h3>
        {selectedPanelists.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {selectedPanelists.map((p) => (
              <li key={p.id}>
                {p.name} – {p.designation} ({p.department})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No additional panelists required.</p>
        )}
      </div>

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

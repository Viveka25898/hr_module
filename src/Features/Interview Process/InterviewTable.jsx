/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

const dummyCandidates = [
  {
    id: 1,
    candidateName: "Rohit Sharma",
    interviewDate: "2025-04-08",
    entryTime: "10:30 AM",
    grade: "Executive",
    totalRounds: 3,
    completedRounds: 2,
  },
  {
    id: 2,
    candidateName: "Priya Desai",
    interviewDate: "2025-04-08",
    entryTime: "11:00 AM",
    grade: "Manager",
    totalRounds: 2,
    completedRounds: 2,
  },
  {
    id: 3,
    candidateName: "Ankit Patel",
    interviewDate: "2025-04-08",
    entryTime: "11:45 AM",
    grade: "Supervisor",
    totalRounds: 3,
    completedRounds: 1,
  },
];

const InterviewTable = () => {
    const navigate=useNavigate()
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700 underline">
        Interview Summary
      </h1>

      <div className="overflow-x-auto shadow-md rounded border border-green-200">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-green-100 text-green-800 font-semibold">
            <tr>
              <th className="px-4 py-3 border border-green-200">Candidate Name</th>
              <th className="px-4 py-3 border border-green-200">Interview Date</th>
              <th className="px-4 py-3 border border-green-200">Interview Time</th>
              <th className="px-4 py-3 border border-green-200">Grade</th>
              <th className="px-4 py-3 border border-green-200">Total Rounds</th>
              <th className="px-4 py-3 border border-green-200">Completed Rounds</th>
              <th className="px-4 py-3 border border-green-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="hover:bg-green-50 transition duration-200"
              >
                <td className="px-4 py-3 border border-green-100">{candidate.candidateName}</td>
                <td className="px-4 py-3 border border-green-100">{candidate.interviewDate}</td>
                <td className="px-4 py-3 border border-green-100">{candidate.entryTime}</td>
                <td className="px-4 py-3 border border-green-100">{candidate.grade}</td>
                <td className="px-4 py-3 border border-green-100">{candidate.totalRounds}</td>
                <td className="px-4 py-3 border border-green-100">{candidate.completedRounds}</td>
                <td className="px-4 py-3 border border-green-100">
                  <button
                    className="text-green-600 hover:underline font-medium"
                    title="Assign Panelist"
                    onClick={() => navigate(`/dashboard/TA/assign-panelist/${candidate.id}`)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewTable;

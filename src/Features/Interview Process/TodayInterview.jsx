/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const dummyCandidates = [
  {
    id: 1,
    candidateName: "Rohit Sharma",
    interviewDate: "2025-04-08",
    entryTime: "10:30 AM",
    department: "Operations",
    grade: "Executive",
    totalRounds: 3,
    completedRounds: 2,
    assigned: false,
  },
  {
    id: 2,
    candidateName: "Priya Desai",
    interviewDate: "2025-04-08",
    entryTime: "11:00 AM",
    department: "Sales",
    grade: "Manager",
    totalRounds: 2,
    completedRounds: 2,
    assigned: true,
  },
  {
    id: 3,
    candidateName: "Ankit Patel",
    interviewDate: "2025-04-08",
    entryTime: "11:45 AM",
    department: "Marketing",
    grade: "Vice President",
    totalRounds: 3,
    completedRounds: 1,
    assigned: false,
  },
];

const getPanelistRequirement = (grade) => {
  const lower = grade.toLowerCase();
  if (lower.includes("vice president")) return 2;
  if (lower.includes("manager")) return 1;
  return 0;
};

const TodaysInterview = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Today's Interview Candidates", 14, 15);

    const tableData = dummyCandidates.map((candidate) => [
      candidate.candidateName,
      candidate.entryTime,
      candidate.department,
      candidate.grade,
      candidate.totalRounds,
      candidate.completedRounds,
      getPanelistRequirement(candidate.grade) === 0
        ? "No Panelist Required"
        : candidate.assigned
        ? "Assigned"
        : "Not Assigned",
    ]);

    autoTable(doc, {
      head: [
        [
          "Candidate Name",
          "Interview Time",
          "Department",
          "Grade",
          "Total Rounds",
          "Completed Rounds",
          "Panelist Status",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("Todays_Interviews.pdf");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center text-green-700 border-b-2 border-green-300 pb-2">
          Today's Interviews
        </h2>
        <button
          onClick={exportToPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Export to PDF
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded border border-green-200">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-green-400 text-green-800 font-semibold">
            <tr>
              <th className="px-4 py-3 border border-green-200">Candidate Name</th>
              <th className="px-4 py-3 border border-green-200">Interview Time</th>
              <th className="px-4 py-3 border border-green-200">Department</th>
              <th className="px-4 py-3 border border-green-200">Grade</th>
              <th className="px-4 py-3 border border-green-200">Total Rounds</th>
              <th className="px-4 py-3 border border-green-200">Completed Rounds</th>
              <th className="px-4 py-3 border border-green-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyCandidates.map((candidate) => {
              const panelistCount = getPanelistRequirement(candidate.grade);

              return (
                <tr
                  key={candidate.id}
                  className="hover:bg-green-50 transition duration-200"
                >
                  <td className="px-4 py-3 border border-green-100">{candidate.candidateName}</td>
                  <td className="px-4 py-3 border border-green-100">{candidate.entryTime}</td>
                  <td className="px-4 py-3 border border-green-100">{candidate.department}</td>
                  <td className="px-4 py-3 border border-green-100">{candidate.grade}</td>
                  <td className="px-4 py-3 border border-green-100">{candidate.totalRounds}</td>
                  <td className="px-4 py-3 border border-green-100">{candidate.completedRounds}</td>
                  <td className="px-4 py-3 border border-green-100">
                    {panelistCount === 0 ? (
                      <span className="text-gray-500 italic">No Panelist Required</span>
                    ) : candidate.assigned ? (
                      <button
                        className="text-blue-600 hover:underline font-medium"
                        title="View Panelist"
                        onClick={() => openModal(candidate)}
                      >
                        View Panelist
                      </button>
                    ) : (
                      <button
                        className="text-green-600 hover:underline font-medium"
                        title="Assign Panelist"
                        onClick={() =>
                          navigate(`/dashboard/TA/assign-panelist/${candidate.id}`)
                        }
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* *************** Modal To See Panelist **************** */}
      {isModalOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">
              Assigned Panelist
            </h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> Arjun Mehta</p>
              <p><span className="font-medium">Designation:</span> Senior HR</p>
              <hr />
              <p><span className="font-medium">Name:</span> Meena Kulkarni</p>
              <p><span className="font-medium">Designation:</span> Operations Lead</p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysInterview;

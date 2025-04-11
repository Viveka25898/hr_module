/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyInterviewData = [
  {
    id: 1,
    name: "Rohit Sharma",
    skills: "Operations, Leadership",
    grade: "Executive",
    department: "Operations",
    totalRounds: 3,
    completedRounds: 2,
    result: null,
    roundNames: ["HR Round", "Technical Round", "Manager Round"],
  },
  {
    id: 2,
    name: "Priya Desai",
    skills: "Sales, CRM",
    grade: "Manager",
    department: "Sales",
    totalRounds: 2,
    completedRounds: 2,
    result: "Pass",
    roundNames: ["Initial Screening", "Final Round"],
  },
  {
    id: 3,
    name: "Ankit Patel",
    skills: "Marketing, Branding",
    grade: "Vice President",
    department: "Marketing",
    totalRounds: 3,
    completedRounds: 0,
    result: null,
    roundNames: ["Creative Round", "Marketing Strategy", "Leadership Round"],
  },
];

const InterviewProgress = () => {
  const [interviewData, setInterviewData] = useState(dummyInterviewData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedResult, setSelectedResult] = useState(null);
  const [pendingCandidate, setPendingCandidate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [viewRoundsModal, setViewRoundsModal] = useState(false);
  const [selectedCandidateRounds, setSelectedCandidateRounds] = useState([]);

  const navigate = useNavigate();

  const handleScheduleRound = (candidateId) => {
    navigate("/dashboard/TA/interview-setup");
  };

  const handleNextStage = (candidateId) => {
    navigate("/dashboard/TA/review-candidate")
  };

  const handleResultChange = (e, index) => {
    const newResult = e.target.value;
    setSelectedResult(newResult);
    setPendingCandidate(index);
    setShowConfirmation(true);
  };

  const confirmResultChange = () => {
    const updated = [...interviewData];
    updated[pendingCandidate].result = selectedResult;
    setInterviewData(updated);
    setShowConfirmation(false);
    setPendingCandidate(null);
    setSelectedResult(null);
  };

  const cancelResultChange = () => {
    setShowConfirmation(false);
    setPendingCandidate(null);
    setSelectedResult(null);
  };

  const getStatusIcon = (status) => {
    if (status === "Pass") return "✅";
    if (status === "Fail") return "❌";
    return "⏳";
  };

  const filterCandidates = () => {
    if (statusFilter === "All") return interviewData;
    if (statusFilter === "In Progress") {
      return interviewData.filter(
        (item) => item.completedRounds < item.totalRounds
      );
    }
    return interviewData.filter((item) => item.result === statusFilter);
  };

  const renderStatus = (item, index) => {
    const { completedRounds, totalRounds, result, id } = item;

    if (completedRounds === totalRounds) {
      return (
        <div className="flex flex-col items-center gap-1">
          <select
            value={result || ""}
            onChange={(e) => handleResultChange(e, index)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Select Result</option>
            <option value="Pass">Pass ✅</option>
            <option value="Fail">Fail ❌</option>
          </select>
          {result === "Pass" && (
            <button
              className="text-green-700 text-xs underline hover:text-green-900"
              onClick={() => handleNextStage(id)}
            >
              Proceed to Next Stage
            </button>
          )}
        </div>
      );
    } else {
      const status =
        completedRounds === 0 ? "Not Started" : "In Progress";
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-yellow-600 font-semibold">
            {getStatusIcon(status)} {status}
          </span>
          <button
            onClick={() => handleScheduleRound(id)}
            className="text-blue-600 text-xs underline hover:text-blue-800"
          >
            Schedule Round
          </button>
        </div>
      );
    }
  };

  const handleViewRounds = (item) => {
    const completed = item.roundNames.slice(0, item.completedRounds);
    const remaining = item.roundNames.slice(item.completedRounds);
    setSelectedCandidateRounds({ completed, remaining });
    setViewRoundsModal(true);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-3xl font-bold text-green-700 mb-4 border-b pb-2">
          Interview Progress
        </h2>

        {/* Filter Section */}
        <div className="flex items-center mb-4 gap-3">
          <label className="font-medium">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-1 rounded shadow-sm"
          >
            <option value="All">All</option>
            <option value="Pass">Pass ✅</option>
            <option value="Fail">Fail ❌</option>
            <option value="In Progress">In Progress ⏳</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-green-200 max-w-6xl mx-auto">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-green-400 text-green-800 font-semibold">
              <tr>
                <th className="px-2 py-2 border text-sm">Candidate Name</th>
                <th className="px-2 py-2 border text-sm">Skills</th>
                <th className="px-2 py-2 border text-sm">Department</th>
                <th className="px-2 py-2 border text-sm">Grade</th>
                <th className="px-2 py-2 border text-sm">Total Rounds</th>
                <th className="px-2 py-2 border text-sm">Completed Rounds</th>
                <th className="px-2 py-2 border text-sm">Status</th>
                <th className="px-2 py-2 border text-sm">Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {filterCandidates().map((item, index) => (
                <tr key={item.id} className="hover:bg-green-50 transition">
                  <td className="px-2 py-2 border text-sm">{item.name}</td>
                  <td className="px-2 py-2 border text-sm">{item.skills}</td>
                  <td className="px-2 py-2 border text-sm">{item.department}</td>
                  <td className="px-2 py-2 border text-sm">{item.grade}</td>
                  <td className="px-2 py-2 border text-sm">
                    {item.totalRounds}{" "}
                    <button
                      onClick={() => handleViewRounds(item)}
                      className="text-blue-600 underline text-xs hover:text-blue-800"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="px-2 py-2 border text-sm">
                    {item.completedRounds}{" "}
                    <button
                      onClick={() => handleViewRounds(item)}
                      className="text-blue-600 underline text-xs hover:text-blue-800"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="px-2 py-2 border text-sm">{renderStatus(item, index)}</td>
                  <td className="px-2 py-2 border text-sm">
                    {item.completedRounds > 0 ? (
                      <span className="text-green-700 font-medium">Scheduled</span>
                    ) : (
                      <span className="text-gray-500">Unscheduled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to mark this candidate as{" "}
              <span className="font-bold">{selectedResult}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelResultChange}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmResultChange}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Round View Modal */}
      {viewRoundsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center">Round Details</h3>
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">Completed Rounds</th>
                  <th className="border px-2 py-1">Remaining Rounds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-2 align-top">
                    {selectedCandidateRounds.completed.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {selectedCandidateRounds.completed.map((round, idx) => (
                          <li key={idx}>{round}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </td>
                  <td className="border px-2 py-2 align-top">
                    {selectedCandidateRounds.remaining.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {selectedCandidateRounds.remaining.map((round, idx) => (
                          <li key={idx}>{round}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewRoundsModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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

export default InterviewProgress;

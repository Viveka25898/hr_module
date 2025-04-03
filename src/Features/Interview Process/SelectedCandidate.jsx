/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


   

const SelectedCandidate = () => {

     // Dummy rejection history data
  const rejectionHistory = {
    1: "Expected Salary is higher",
    2: "Already employed, not looking for a job",
    3: "Wants to work, but not now",
  };


  const location = useLocation();
  const navigate = useNavigate();
  const initialCandidates = location.state?.selectedCandidates || [];

  const [selectedCandidates, setSelectedCandidates] = useState(
    initialCandidates.map((candidate) => ({
      ...candidate,
      interviewDate: "",
      interviewTime: "",
      status: "Not Sent",
      rejectionReason: "",
    }))
  );
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleScheduleChange = (id, field, value) => {
    setSelectedCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  const handleSendLink = (id) => {
    setSelectedCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, status: "Pending" } : candidate
      )
    );
    alert("Interview link sent to candidate! (Handled in backend)");
  };

  const handleMockResponse = (id, response) => {
    setSelectedCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              status: response.status,
              rejectionReason: response.status === "Rejected" ? response.reason : "",
            }
          : candidate
      )
    );
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white shadow-md rounded-lg border border-gray-300">
      <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
        Selected Candidates
      </h2>

      {selectedCandidates.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-green-500 text-green-900 text-left">
                <th className="border border-gray-400 px-2 py-1">#</th>
                <th className="border border-gray-400 px-2 py-1">Name</th>
                <th className="border border-gray-400 px-2 py-1">Exp</th>
                <th className="border border-gray-400 px-2 py-1">Skills</th>
                <th className="border border-gray-400 px-2 py-1">Date</th>
                <th className="border border-gray-400 px-2 py-1">Time</th>
                <th className="border border-gray-400 px-2 py-1">Status</th>
                <th className="border border-gray-400 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedCandidates.map((candidate, index) => (
                <tr key={candidate.id} className="border-b border-gray-300">
                  <td className="border border-gray-400 px-2 py-1">{index + 1}</td>
                  <td className="border border-gray-400 px-2 py-1 whitespace-nowrap">
                    {candidate.name}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">{candidate.experience}</td>
                  <td className="border border-gray-400 px-2 py-1">{candidate.skills}</td>
                  
                  {/* Interview Date Input */}
                  <td className="border border-gray-400 px-2 py-1">
                    <input
                      type="date"
                      value={candidate.interviewDate}
                      onChange={(e) => handleScheduleChange(candidate.id, "interviewDate", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  </td>

                  {/* Interview Time Input */}
                  <td className="border border-gray-400 px-2 py-1">
                    <input
                      type="time"
                      value={candidate.interviewTime}
                      onChange={(e) => handleScheduleChange(candidate.id, "interviewTime", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  </td>

                  {/* Status */}
                  <td className="border border-gray-400 px-2 py-1 font-semibold text-center">
                    {candidate.status}
                    {candidate.status === "Rejected" && (
                      <p className="text-red-500 text-xs">({candidate.rejectionReason})</p>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="border p-2 flex items-center justify-center space-x-3">
                    
                    <button
                        onClick={() => handleSendLink(candidate.id)}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                         Link
                         
                    </button>
                    
                    <button
                        onClick={() => setSelectedCandidates(selectedCandidates.filter(c => c.id !== candidate.id))}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg text-sm hover:bg-red-600 transition"
                    >
                        Remove
                    </button>

                    {rejectionHistory[candidate.id] && (
                        <button
                        onClick={() => setSelectedHistory(rejectionHistory[candidate.id])}
                        className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition"
                        >
                        History
                        </button>
                    )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p className="text-center text-gray-600">No candidates selected.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full text-sm"
          >
            Back to Selection
          </button>
        </>
      )}

      {/* History Modal */}
      {selectedHistory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Interview Rejection History</h3>
            <p className="text-gray-700">{selectedHistory}</p>
            <button
              onClick={() => setSelectedHistory(null)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCandidate;

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSchedule } from "react-icons/md";

const SelectedCandidate = () => {
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
  const [reasonModal, setReasonModal] = useState({ open: false, reason: "" });

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

    setTimeout(() => {
      const isRejected = Math.random() > 0.5;
      const randomReason = "This role doesn't match my current preferences.";

      setSelectedCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === id
            ? {
                ...candidate,
                status: isRejected ? "Rejected" : "Accepted",
                rejectionReason: isRejected ? randomReason : "",
              }
            : candidate
        )
      );
    }, 2000);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto bg-white shadow-md rounded-lg border border-gray-300">
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
                <th className="border border-gray-400 px-2 py-1 text-center">
                  Schedule Interview
                </th>
                <th className="border border-gray-400 px-2 py-1 text-center">Status</th>
                <th className="border border-gray-400 px-2 py-1 text-center">Action</th>
                <th  className="border border-gray-400 px-2 py-1 text-center">Proceed To Schedule</th>
              </tr>
            </thead>
            <tbody>
              {selectedCandidates.map((candidate, index) => (
                <tr key={candidate.id} className="border-b border-gray-300 text-center">
                  <td className="border border-gray-400 px-2 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-2 py-2">{candidate.name}</td>
                  <td className="border border-gray-400 px-2 py-2">{candidate.experience}</td>
                  <td className="border border-gray-400 px-2 py-2">{candidate.skills}</td>

                  {/* Interview Scheduling (Date + Time in one cell) */}
                  <td className="border border-gray-400 px-2 py-2">
                    <div className="flex flex-col gap-2 items-center">
                      <input
                        type="date"
                        value={candidate.interviewDate}
                        onChange={(e) =>
                          handleScheduleChange(candidate.id, "interviewDate", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-36"
                      />
                      <input
                        type="time"
                        value={candidate.interviewTime}
                        onChange={(e) =>
                          handleScheduleChange(candidate.id, "interviewTime", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-36"
                      />
                    </div>
                  </td>

                  <td className="border border-gray-400 px-2 py-2 font-semibold">
                    {candidate.status}
                    {candidate.status === "Rejected" && (
                      <div className="text-xs text-red-500 mt-1">
                        <button
                          onClick={() =>
                            setReasonModal({ open: true, reason: candidate.rejectionReason })
                          }
                          className="underline text-blue-600"
                        >
                          Reason
                        </button>
                      </div>
                    )}
                  </td>
                    {/* Action  */}
                  <td className="border border-gray-400 px-2 py-2">
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleSendLink(candidate.id)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      >
                        Send Link
                      </button>
                      <button
                        onClick={() =>
                          setSelectedCandidates(selectedCandidates.filter((c) => c.id !== candidate.id))
                        }
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                      {rejectionHistory[candidate.id] && (
                        <button
                          onClick={() => setSelectedHistory(rejectionHistory[candidate.id])}
                          className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                        >
                          History
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-400 px-2 py-2 text-center">
                          {candidate.status === "Accepted" ? (
                            <button
                            onClick={() =>
                              navigate("/dashboard/TA/interview-setup", {
                                state: {
                                  candidateName: "John Doe", // Replace with dynamic name if available
                                },
                              })
                            }
                            className="text-green-600 hover:text-green-800 text-xl"
                            title="Proceed to Schedule"
                          >
                              <MdOutlineSchedule />
                            </button>
                          ) : (
                            <MdOutlineSchedule className="text-gray-400 text-xl cursor-not-allowed" title="Accept invitation to proceed" />
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

      {/* Rejection Reason Modal */}
      {reasonModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-5 rounded-md shadow-md max-w-sm w-full">
            <h3 className="text-lg font-bold mb-3 text-red-600">Rejection Reason</h3>

            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Candidate's Reason:
            </label>
            <textarea
              className="w-full p-2 border rounded h-20 resize-none bg-gray-100 text-gray-700 mb-4"
              value={reasonModal.reason}
              readOnly
            />

            <label className="block mb-1 text-sm font-semibold text-gray-700">
              TA's Additional Reason (Optional):
            </label>
            <textarea
              className="w-full p-2 border rounded h-20 resize-none"
              value={reasonModal.taReason || ""}
              onChange={(e) =>
                setReasonModal((prev) => ({
                  ...prev,
                  taReason: e.target.value,
                }))
              }
              placeholder="Add your own notes if needed..."
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  console.log("TA Reason Saved:", reasonModal.taReason);
                  setReasonModal({ open: false, reason: "", taReason: "" });
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setReasonModal({ open: false, reason: "", taReason: "" })}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCandidate;

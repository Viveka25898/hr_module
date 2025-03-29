/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import dummyBlacklistData from "./dummyBlacklistData";

const BlacklistApproval = () => {
  const [blacklistRequests, setBlacklistRequests] = useState(dummyBlacklistData);
  const [reason, setReason] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  console.log(blacklistRequests);

  useEffect(() => {
    const timer = setInterval(() => {
      setBlacklistRequests((prevRequests) =>
        prevRequests.map((request) => {
          const timeElapsed = (Date.now() - request.timestamp) / (1000 * 60 * 60);
          if (timeElapsed >= 24 && request.status === "Pending") {
            return { ...request, status: "Approved" };
          }
          return request;
        })
      );
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  const handleApprove = (uin) => {
    setBlacklistRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.uin === uin ? { ...request, status: "Approved" } : request
      )
    );
  };

  const handleReject = (uin, reason) => {
    setBlacklistRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.uin === uin ? { ...request, status: "Rejected", rejectionReason: reason } : request
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Blacklist Approval Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2">UIN</th>
              <th className="p-2">Name</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {blacklistRequests.map((request) => (
              <tr key={request.uin} className="text-center">
                <td className="p-2">{request.uin}</td>
                <td className="p-2">{request.name}</td>
                <td className="p-2">{request.reason}</td>
                <td className={`p-2 font-bold ${request.status === "Pending" ? "text-yellow-500" : request.status === "Approved" ? "text-green-500" : "text-red-500"}`}>{request.status}</td>
                <td className="p-2">
                  {request.status === "Pending" && (
                    <div className="flex space-x-2">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                        onClick={() => handleApprove(request.uin)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        onClick={() => setSelectedRequest(request)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Reject Blacklist Request</h2>
            <p><strong>Name:</strong> {selectedRequest.name}</p>
            <p><strong>UIN:</strong> {selectedRequest.uin}</p>
            <textarea
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter rejection reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  handleReject(selectedRequest.uin, reason);
                  setSelectedRequest(null);
                  setReason("");
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlacklistApproval;
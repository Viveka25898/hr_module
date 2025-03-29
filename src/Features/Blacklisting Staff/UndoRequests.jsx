import { useState, useEffect } from "react";

const UndoBlacklistRequests = () => {
  const [undoRequests, setUndoRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("undoRequests")) || [];
    setUndoRequests(storedRequests);
  }, []);

  const handleAction = (index, action) => {
    const updatedRequests = [...undoRequests];
    updatedRequests[index].status = action;
    setUndoRequests(updatedRequests);
    localStorage.setItem("undoRequests", JSON.stringify(updatedRequests));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Undo Blacklist Requests</h2>
      {undoRequests.length === 0 ? (
        <p className="text-gray-500">No pending undo requests.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Staff Name</th>
              <th className="p-2 border">Requested By</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {undoRequests.map((request, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{request.staffName}</td>
                <td className="p-2 border">{request.requestedBy}</td>
                <td className="p-2 border">{request.reason}</td>
                <td className="p-2 border text-center">
                  {request.status === "Pending" ? (
                    <>
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                        onClick={() => handleAction(index, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleAction(index, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={request.status === "Accepted" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                      {request.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UndoBlacklistRequests;

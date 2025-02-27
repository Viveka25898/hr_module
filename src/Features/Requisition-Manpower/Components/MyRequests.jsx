/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // 🔄 Refresh key to trigger updates
  
//Fetching Data From Local Storage
const fetchRequests = () => {
    const storedRequests = JSON.parse(localStorage.getItem("manpowerRequests")) || [];
    setRequests(storedRequests);
  };
  useEffect(() => {
    fetchRequests()
  }, [refreshKey]); 

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "manpowerRequests") {
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger update
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">My Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests submitted</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Site Name</th>
              <th className="p-2 border">Requested Manpower</th>
              <th className="p-2 border">Supervisor Approval</th>
              <th className="p-2 border">Approver Approval</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{req.siteName || "N/A"}</td>
                <td className="p-2 border">{req.staffType}</td>
                <td className={`p-2 border font-bold ${req.supervisorStatus === "Rejected" ? "text-red-500" : req.supervisorStatus === "Accepted" ? "text-green-500" : "text-yellow-500"}`}>
                  {req.supervisorStatus || "Pending"}
                </td>
                <td className={`p-2 border font-bold ${req.approverStatus === "Rejected" ? "text-red-500" : req.approverStatus === "Accepted" ? "text-green-500" : "text-yellow-500"}`}>
                  {req.approverStatus || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
    </div>
  );
};

export default MyRequests;

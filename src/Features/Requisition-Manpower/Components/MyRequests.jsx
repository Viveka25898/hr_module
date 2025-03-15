/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();


   //***************** Get the logged-in user's username from localStorage***************************
   const loggedInUser = JSON.parse(localStorage.getItem("userData")) || {};
  //  console.log("Logged In User Data:", loggedInUser);
   const loggedInUsername = loggedInUser.username || "";
  // Function to fetch and sort requests

  const fetchRequests = () => {
              const storedRequests = JSON.parse(localStorage.getItem("manpowerRequests")) || [];
              // console.log("Stored Requests:-",storedRequests);
            
              //Filter The Requests To Show the Requests those submitted by Logged In Manager
              const filteredRequest=storedRequests.filter(req => req.managerUsername === loggedInUsername)
              // console.log("Filtered Requests for", loggedInUsername, ":", filteredRequest); 

              // Sorting Order
              const statusOrder = {
                "Pending": 1, // Highest priority
                "Submitted": 2, // Below Pending
                "Accepted": 3, // Below Submitted
                "Rejected": 4 // Lowest priority (at bottom)
              };
            
              const sortedRequests = filteredRequest.sort((a, b) => {
                // Compare Supervisor Status first
                const supervisorComparison = (statusOrder[a.supervisorStatus] || 5) - (statusOrder[b.supervisorStatus] || 5);
                if (supervisorComparison !== 0) return supervisorComparison;
            
                // If Supervisor Status is the same, compare Approver Status
                return (statusOrder[a.approverStatus] || 5) - (statusOrder[b.approverStatus] || 5);
              });
            
              setRequests(sortedRequests);
  };
  
// console.log("Requests:-",requests);

  useEffect(() => {
    fetchRequests();
  }, [refreshKey]);

  // Listen for localStorage changes and refresh the table dynamically
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "manpowerRequests") {
        setRefreshKey((prev) => prev + 1);
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
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Site Name</th>
              <th className="p-2 border">Requested Manpower</th>
              <th className="p-2 border">Supervisor Approval</th>
              <th className="p-2 border">Approver Approval</th>
              <th className="p-2 border">Bench Staff</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index} className="border">
                {/* Format date (Default to "N/A" if missing) */}
                <td className="p-2 border">{req.date ? new Date(req.date).toLocaleDateString("en-GB") : "N/A"}</td>
                <td className="p-2 border">{req.siteName || "N/A"}</td>
                <td className="p-2 border">{req.staffType}</td>
                <td
                  className={`p-2 border font-bold ${
                    req.supervisorStatus === "Rejected"
                      ? "text-red-500"
                      : req.supervisorStatus === "Accepted"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {req.supervisorStatus || "Pending"}
                </td>
                <td
                  className={`p-2 border font-bold ${
                    req.approverStatus === "Rejected"
                      ? "text-red-500"
                      : req.approverStatus === "Accepted"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {req.approverStatus || "Pending"}
                </td>
                {/* Show Bench Staff Column */}
                <td className="p-2 border text-center">
                  {req.supervisorStatus === "Submitted" ? (
                    
                    <FaEye className="text-blue-600 cursor-pointer text-lg hover:text-blue-800"
                    onClick={() => navigate(`/dashboard/site-manager/bench-staff/${encodeURIComponent(req.siteName)}`)}
                     />
                    
                  ) : (
                    <FaEye className="text-gray-400 cursor-not-allowed text-lg" />
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

export default MyRequests;

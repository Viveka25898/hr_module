import { useState, useEffect } from "react";

const SupervisorRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem("manpowerRequests")) || [];
    setRequests(storedRequests);
  }, []);

  const handleReject = (index) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
    localStorage.setItem("manpowerRequests", JSON.stringify(updatedRequests));
  };

  const handleApprove = (index) => {
    alert("Request Submitted to Approver!");
    handleReject(index); // Remove request after approval
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Requests From Site Manager</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests available</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Staff Type</th>
              <th className="p-2 border">Skill</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Budget</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{req.staffType}</td>
                <td className="p-2 border">{req.skill}</td>
                <td className="p-2 border">{req.grade}</td>
                <td className="p-2 border">{req.department}</td>
                <td className="p-2 border">{req.budget}</td>
                <td className="p-2 border">{req.location}</td>
                <td className="p-2 border">
                  <button onClick={() => handleReject(index)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Reject</button>
                  <button onClick={() => handleApprove(index)} className="bg-blue-500 text-white px-2 py-1 rounded">Submit to Approver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SupervisorRequests;

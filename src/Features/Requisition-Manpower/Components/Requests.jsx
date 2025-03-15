import { useState, useEffect } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const { username } = userData;

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("benchStaffRequests")) || [];
    const myRequests = storedRequests.filter((req) => req.to === username);
    setRequests(myRequests);
  }, [username]);

  const handleAccept = (index) => {
    let updatedRequests = [...requests];
    let acceptedStaff = updatedRequests[index];

    // Update Bench Staff Data
    let storedStaff = JSON.parse(localStorage.getItem("benchStaff")) || [];
    storedStaff = storedStaff.map((staff) =>
      staff.name === acceptedStaff.staffName ? { ...staff, assignedManager: acceptedStaff.from } : staff
    );
    localStorage.setItem("benchStaff", JSON.stringify(storedStaff));

    // Remove request from list
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
    localStorage.setItem("benchStaffRequests", JSON.stringify(updatedRequests));
  };

  const handleReject = (index) => {
    let updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
    localStorage.setItem("benchStaffRequests", JSON.stringify(updatedRequests));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Bench Staff Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests received.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Requested Staff</th>
              <th className="p-2 border">Requested By</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{req.staffName}</td>
                <td className="p-2 border">{req.from}</td>
                <td className="p-2 border">
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleAccept(index)}>
                    Accept
                  </button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleReject(index)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Requests;

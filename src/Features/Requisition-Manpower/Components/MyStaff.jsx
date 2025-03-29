/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaEye, FaBan, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyStaff = () => {
  const [allStaff, setAllStaff] = useState([]);
  const [loggedInManager, setLoggedInManager] = useState("");
  const [undoBlacklistStaff, setUndoBlacklistStaff] = useState(null);
  const [undoReason, setUndoReason] = useState("");
  const [submittedRequests, setSubmittedRequests] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setLoggedInManager(userData.username);

      const storedStaff = JSON.parse(localStorage.getItem("benchStaff")) || [];
      const assignedStaff = storedStaff.filter(
        (staff) => staff.manager === userData.username
      );

      const blacklistedStaff = [
        {
          name: "Rahul Sharma",
          age: 35,
          currentSite: "Pune",
          isBlacklisted: true,
          blacklistedBy: "Admin",
          lastWorkingDay: "15th March 2025",
          manager: "SiteManager1",
        },
        {
          name: "Amit Verma",
          age: 29,
          currentSite: "Mumbai",
          isBlacklisted: true,
          blacklistedBy: userData.username,
          lastWorkingDay: "10th March 2025",
          manager: userData.username,
        },
        {
            name: "Amit Verma2",
            age: 29,
            currentSite: "Mumbai",
            isBlacklisted: true,
            blacklistedBy: userData.username,
            lastWorkingDay: "10th March 2025",
            manager: userData.username,
          },
          {
            name: "Amit Verma3",
            age: 29,
            currentSite: "Mumbai",
            isBlacklisted: true,
            blacklistedBy: userData.username,
            lastWorkingDay: "10th March 2025",
            manager: userData.username,
          },
          {
            name: "Amit Verma4",
            age: 29,
            currentSite: "Mumbai",
            isBlacklisted: true,
            blacklistedBy: userData.username,
            lastWorkingDay: "10th March 2025",
            manager: userData.username,
          },
      ];

      const updatedStaff = [...assignedStaff, ...blacklistedStaff];
      setAllStaff(updatedStaff);

      const existingRequests = JSON.parse(localStorage.getItem("undoRequests")) || [];
      const submittedRequestsMap = {};
      existingRequests.forEach((request) => {
        submittedRequestsMap[request.staffName] = true;
      });
      setSubmittedRequests(submittedRequestsMap);
    }
  }, []);

  const showAlert = (staff) => {
    alert(`🚨 ${staff.name} is blacklisted. Last Working Day: ${staff.lastWorkingDay}`);
  };

  const handleBlacklistStaff = (staff) => {
    navigate("/dashboard/site-manager/blacklist-staff", { state: { staffDetails: staff } });
  };

  const openUndoModal = (staff) => {
    if (staff.blacklistedBy === loggedInManager) {
      setUndoBlacklistStaff(staff);
      setUndoReason("");
    }
  };

  const submitUndoRequest = () => {
    if (!undoReason.trim()) {
      alert("Please provide a reason for undoing the blacklist.");
      return;
    }

    const undoRequest = {
      staffName: undoBlacklistStaff.name,
      reason: undoReason,
      requestedBy: loggedInManager,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const existingRequests = JSON.parse(localStorage.getItem("undoRequests")) || [];
    const updatedRequests = [...existingRequests, undoRequest];

    localStorage.setItem("undoRequests", JSON.stringify(updatedRequests));

    setSubmittedRequests((prev) => ({
      ...prev,
      [undoBlacklistStaff.name]: true,
    }));

    alert(`✅ Undo request for ${undoBlacklistStaff.name} submitted successfully.`);

    setUndoBlacklistStaff(null);
  };

  return (
    <>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          My Staff (Manager {loggedInManager})
        </h2>
        {allStaff.length === 0 ? (
          <p className="text-gray-500">No Staff Assigned to you.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Current Site</th>
                <th className="p-2 border">Blacklist</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.map((staff, index) => (
                <tr key={index} className={`border ${staff.isBlacklisted ? "bg-red-200" : ""}`}>
                  <td className={`p-2 border flex items-center ${staff.isBlacklisted ? "text-red-600 font-bold" : ""}`}>
                    {staff.name}
                    {staff.isBlacklisted && (
                      <FaEye className="ml-2 text-blue-600 cursor-pointer" onClick={() => showAlert(staff)} />
                    )}
                  </td>
                  <td className="p-2 border">{staff.age}</td>
                  <td className="p-2 border">{staff.currentSite}</td>
                  <td className="p-2 border text-center">
                    {staff.isBlacklisted ? (
                      staff.blacklistedBy === loggedInManager ? (
                        <button
                          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium ${
                            submittedRequests[staff.name]
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-yellow-500 text-white hover:bg-yellow-600"
                          }`}
                          onClick={() => openUndoModal(staff)}
                          disabled={submittedRequests[staff.name]}
                        >
                          <FaUndo />
                          Undo Blacklisting
                        </button>
                      ) : (
                        <span className="text-gray-500">🔒 (Admin Blacklisted)</span>
                      )
                    ) : (
                      <button
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        onClick={() => handleBlacklistStaff(staff)}
                      >
                        <FaBan />
                        Blacklist Staff
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {undoBlacklistStaff && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-red-600">Undo Blacklist Request</h2>
            <p className="mb-2">Staff: {undoBlacklistStaff.name}</p>
            <label className="block mb-2 text-sm font-medium">Reason:</label>
            <textarea
              className="w-full p-2 border rounded"
              value={undoReason}
              onChange={(e) => setUndoReason(e.target.value)}
              placeholder="Enter reason..."
            />
            <div className="flex justify-between mt-4">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setUndoBlacklistStaff(null)}>
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  undoReason.trim()
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={submitUndoRequest}
                disabled={!undoReason.trim()}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyStaff;

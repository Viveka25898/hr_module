/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { FaEye, FaTimes } from "react-icons/fa";

const SupervisorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); //  Refresh key to trigger updates
  const [selectedCost, setSelectedCost] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const userName=useSelector((state)=>state.auth.user || "Unknown")

//****************************Getting Data from Local Storage */
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
        setRefreshKey((prev) => prev + 1); //  Increment refresh key to trigger update
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  // ************************Updating Request Status*************************************

  const updateRequestStatus = (index, status) => {
    let updatedRequests = [...requests];
    updatedRequests[index] = { ...updatedRequests[index], supervisorStatus: status };
    setRequests(updatedRequests);
    localStorage.setItem("manpowerRequests", JSON.stringify(updatedRequests));
  };
  
  // *************************Handle Reject and Approve**********************************
  const handleReject = (index) => updateRequestStatus(index, "Rejected");
  const handleApprove = (index) => updateRequestStatus(index, "Submitted");

//****************************Open PopUP*********************************** */
  const openPopup = (cost) => {
    setSelectedCost(cost);
    setIsPopupOpen(true);
  };


  //****************************Close PopUP*********************************** */
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCost(null);
  };
  
  return (
    // <div className="p-4 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
    //   <h2 className="text-2xl font-bold mb-4 text-green-600">Requests From Site Manager || Site ID or Site Code</h2>

    //   {requests.length === 0 ? (
    //     <p className="text-gray-500">No requests available</p>
    //   ) : (
    //     <table className="w-[400px] border-collapse border border-gray-300">
    //       <thead>
    //         <tr className="bg-green-600 text-white">
    //           <th className="p-2 border">Site Name</th>
    //           <th className="p-2 border">Manager Name</th>
    //           <th className="p-2 border">Staff Type</th>
    //           <th className="p-2 border">Skill</th>
    //           <th className="p-2 border">Grade</th>
    //           <th className="p-2 border">Department</th>
    //           <th className="p-2 border">Budget</th>
    //           <th className="p-2 border">Location</th>
    //           <th className="p-2 border">Actions</th>
    //           <th className="p-2 border">Cost</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //                   {requests.map((req, index) => (
                        
    //                       <tr 
    //                         key={index} 
    //                         className={`border ${req.isUnBudgeted ? "bg-red-400 text-red-900" : ""}`} // Highlight in RED if unbudgeted
    //                       >
    //                         <td className="p-2 border">{req.siteName || "N/A"}</td>
    //                         <td className="p-2 border">{userName}</td>
    //                         <td className="p-2 border">{req.staffType}</td>
    //                         <td className="p-2 border">{req.skill}</td>
    //                         <td className="p-2 border">{req.grade}</td>
    //                         <td className="p-2 border">{req.department}</td>
    //                         <td className="p-2 border">{req.budget}</td>
    //                         <td className="p-2 border">{req.location}</td>
    //                         <td className="p-2 border text-center">
    //                           {req.supervisorStatus === "Rejected" ? (
    //                             <button className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed" disabled>
    //                               Rejected
    //                             </button>
    //                           ) : req.supervisorStatus === "Submitted" ? (
    //                             <button className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed" disabled>
    //                               Submitted
    //                             </button>
    //                           ) : (
    //                             <>
    //                               <button
    //                                 onClick={() => handleReject(index)}
    //                                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mr-2"
    //                               >
    //                                 Reject
    //                               </button>
    //                               <button
    //                                 onClick={() => handleApprove(index)}
    //                                 className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
    //                               >
    //                                 Submit to Approver
    //                               </button>
    //                             </>
    //                           )}
    //                         </td>
    //                         <td className="p-2 border text-center">
    //                             <FaEye className="text-blue-600 cursor-pointer text-lg hover:text-blue-800" onClick={() => openPopup(req.budget)} />
    //                         </td>
    //                       </tr>
    //                     ))}
    //       </tbody>
    //     </table>
    //   )}

    //   {/* Popup Content */}
    //   {isPopupOpen && (
    //     <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
    //       <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
    //             <button onClick={closePopup} className="absolute top-2 right-2 text-gray-600 hover:text-red-600">
    //               <FaTimes size={20} />
    //             </button>
    //             <h2 className="text-xl font-bold text-green-600 mb-4">Cost Details</h2>
    //             <p className="text-gray-800 text-lg">Total Cost: ₹{selectedCost}</p>
    //             <p className="text-gray-800 text-lg">Total Site Budget: ₹10,00,000</p>
    //             <p className="text-gray-800 text-lg">Used Budget: ₹9,80,000</p>
    //             <p className="text-gray-800 text-lg">Remaining Budget: ₹20,000</p>
    //       </div>
    //     </div>  
    //   )}
    // </div>
<div className="p-4 bg-white shadow-md rounded-lg mx-auto">
  <h2 className="text-xl font-bold mb-4 text-green-600">Requests From Site Manager</h2>

  {/* Scrollable Table Container */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-max border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-green-600 text-white">
          <th className="p-1 border">Site</th>
          <th className="p-1 border">Manager</th>
          <th className="p-1 border">Staff Type</th>
          <th className="p-1 border">Skill</th>
          <th className="p-1 border">Grade</th>
          <th className="p-1 border">Dept</th>
          <th className="p-1 border">Budget</th>
          <th className="p-1 border">Location</th>
          <th className="p-1 border">Status</th>
          <th className="p-1 border">Cost</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req, index) => (
          <tr key={index} className={`border ${req.isUnBudgeted ? "bg-red-400 text-red-900" : ""}`}>
            <td className="p-1 border">{req.siteName || "N/A"}</td>
            <td className="p-1 border">{req.managerName || "Unknown"}</td>
            <td className="p-1 border">{req.staffType}</td>
            <td className="p-1 border">{req.skill}</td>
            <td className="p-1 border">{req.grade}</td>
            <td className="p-1 border">{req.department}</td>
            <td className="p-1 border">{req.budget}</td>
            <td className="p-1 border">{req.location}</td>
            <td className="p-1 border text-center">
              {req.supervisorStatus === "Rejected" ? (
                <span className="text-red-500 font-bold">Rejected</span>
              ) : req.supervisorStatus === "Submitted" ? (
                <span className="text-blue-500 font-bold">Submitted</span>
              ) : (
                <>
                  <button
                    onClick={() => handleReject(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mr-1 text-xs"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 text-xs"
                  >
                    Submit to Approver
                  </button>
                </>
              )}
            </td>
            <td className="p-1 border text-center">
              <FaEye className="text-blue-600 cursor-pointer text-lg hover:text-blue-800" onClick={() => openPopup(req.budget)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* Popup Content */}
       {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button onClick={closePopup} className="absolute top-2 right-2 text-gray-600 hover:text-red-600">
                  <FaTimes size={20} />
                </button>
                <h2 className="text-xl font-bold text-green-600 mb-4">Cost Details</h2>
                <p className="text-gray-800 text-lg">Total Cost: ₹{selectedCost}</p>
                <p className="text-gray-800 text-lg">Total Site Budget: ₹10,00,000</p>
                <p className="text-gray-800 text-lg">Used Budget: ₹9,80,000</p>
                <p className="text-gray-800 text-lg">Remaining Budget: ₹20,000</p>
          </div>
        </div>  
      )}
  </div>
</div>


  );
};

export default SupervisorRequests;
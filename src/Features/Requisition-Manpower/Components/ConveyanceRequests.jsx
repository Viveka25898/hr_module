/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveClaim, loadClaims, rejectClaim } from './conveyanceSlice';

const ConveyanceRequests = () => {
    const dispatch=useDispatch()
    // ✅ Dispatch loadClaims on mount
  useEffect(() => {
    dispatch(loadClaims());
  }, [dispatch]);
    // ✅ Get logged-in manager from Redux
  const loggedInManager = useSelector((state) => state.auth.user); 
  // ✅ Get all conveyance requests from Redux
  const conveyanceRequests = useSelector((state) => state.conveyance.claims);
  console.log("Redux State Conveyance Claims:", conveyanceRequests);

 //Filter the Requests
 const filteredRequests=conveyanceRequests.filter(
    (req)=>req.manager === loggedInManager
 )
console.log(filteredRequests);

//handle Approve
const handleApprove=(id)=>{
    dispatch(approveClaim(id))
};

//handle Reject
const handleReject=(id)=>{
    dispatch(rejectClaim(id))

}

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Conveyance Requests</h2>

      {filteredRequests.length === 0 ? (
        <p className="text-gray-500">No conveyance requests found</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Distance</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className="border">
                <td className="p-2 border">{req.staffName}</td>
                <td className="p-2 border">₹{req.ammount}</td>
                <td className="p-2 border">{req.distance} km</td>
                <td className="p-2 border font-bold">
                  {req.status === "Pending" ? (
                    <span className="text-yellow-500">Pending</span>
                  ) : req.status === "Approved" ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-red-500">Rejected</span>
                  )}
                </td>
                <td className="p-2 border text-center">
                  {req.status === "Pending" && (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 mr-2"
                        onClick={() => handleApprove(req.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                        onClick={() => handleReject(req.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ConveyanceRequests
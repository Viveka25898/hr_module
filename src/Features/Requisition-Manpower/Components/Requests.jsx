/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptRequest, loadRequests, rejectRequest } from './benchStaffSlice'

const Requests = () => {
const dispatch=useDispatch()

//Getting Logged In Manager
  const loggedInManager=JSON.parse(localStorage.getItem("userData")) ?.username?.trim() || ""
  
//Loading Requests data from Redux
  const requests=useSelector((state)=>state.benchStaff.requests)


 // 🔄 Load requests when the component mounts
 useEffect(() => {
    dispatch(loadRequests());  // Make sure requests are loaded into Redux
}, [dispatch]);


//Filter the Requests only for logged in Manager
const filteredRequests=requests.filter((request)=>request.manager===loggedInManager)

  //Handle Accept Request
  const handleAccept=(requestId)=>{
    dispatch(acceptRequest({requestId}))
  }

  //Handle Reject Request
  const handleReject=(requestId,staffName)=>{
    dispatch(rejectRequest({requestId,staffName}))
  }

  return (
    <>
    <div className='p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4 text-green-600'>Bench Staff Requests</h2>
      {
        filteredRequests.length===0?(
          <p className='text-gray-500'>No Requests Available</p>
        ):(
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-green-600 text-white'>
                <th className='p-2 border'> Requested By</th>
                <th className='p-2 border'> Requested Staff</th>
                <th className='p-2 border'> Status</th>
                <th className='p-2 border'> Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredRequests.map((request,index)=>(
                  <tr key={index} className='border'>
                    <td className='p-2 border'>{request.requestedBy}</td>
                    <td className='p-2 border'>{request.requestedStaff}</td>
                    <td className={`p-2 border font-bold ${request.status==="Rejected" ? "text-red-500" : request.status==="Accepted"
                      ? "text-green-500" : "text-yellow-500"}`}>{request.status}</td>
                    <td className='p-2 border text-center'>
                      {
                        request.status === "Pending" ? (
                          <>
                          <button
                          className='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 mr-2'
                           onClick={()=>handleAccept(request.id)}
                          >
                            Accept
                          </button>

                          <button
                          className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700'
                          onClick={()=>handleReject(request.id)}
                          >
                            Reject
                          </button>
                          </>
                        ) : 
                            (
                              <span>Processed</span>
                            )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  </>
  )
}

export default Requests
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from "uuid";
import { loadClaims, submitClaim } from '../../../Features/Requisition-Manpower/Components/conveyanceSlice';

const BenchStaffClaim = () => {
    const dispatch=useDispatch()
    const claims=useSelector((state)=>state.conveyance.claims)
    const [ammount,setAmmount]=useState()
    const [staffInfo,setStaffInfo]=useState({})
    useEffect(()=>{
        dispatch(loadClaims()); 

        //  Fetch Logged-in Bench Staff Info
        const loggedInUser = JSON.parse(localStorage.getItem("userData"));
    
        if (loggedInUser) {
            const allBenchStaff = JSON.parse(localStorage.getItem("benchStaff")) || [];
            
            //  Find the Full Details of the Logged-in Bench Staff
            const staffDetails = allBenchStaff.find(staff => staff.name === loggedInUser.username);
    
            if (staffDetails) {
                setStaffInfo(staffDetails); //  Set Full Bench Staff Info
            } else {
                console.warn(" Bench Staff Details Not Found in Local Storage!");
                setStaffInfo({}); // Set an empty object to avoid errors
            }
        }

    },[dispatch])
    console.log(staffInfo.name);

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (staffInfo.distance < 10) {
            alert("Conveyance amount is only applicable for distances greater than 10 km.");
            return;
          }
          const newClaim={
            id:uuidv4(),
            staffName:staffInfo.name,
            manager:staffInfo.manager,
            distance:staffInfo.distance,
            ammount,
            status:"Pending"
          }
          dispatch(submitClaim(newClaim))
          alert("Claim Submitted Successfully!");
          setAmmount("");

    }
  return (
    <>
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      {/* 🏆 Title */}
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">Conveyance Claim</h2>

      {/* 👤 Staff Info */}
      <div className="border p-4 rounded-lg shadow-sm mb-6 bg-gray-50">
        <p className="text-lg font-semibold">📛 Staff Name: <span className="text-gray-700">{staffInfo.name}</span></p>
        <p className="text-lg font-semibold">👤 Assigned Manager: <span className="text-gray-700">{staffInfo.manager}</span></p>
        <p className="text-lg font-semibold">📍 Distance: <span className="text-gray-700">{staffInfo.distance} Km</span></p>
      </div>

      {/* 💰 Claim Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Amount (₹)"
          value={ammount}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setAmmount(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
          Submit Claim
        </button>
      </form>

      {/* 📜 Claims Table */}
      <h3 className="text-2xl font-bold mt-8 mb-4 text-center text-green-700">Your Claims</h3>
      {claims.filter((claim) => claim.staffName === staffInfo.name).length === 0 ? (
        <p className="text-center text-gray-500">No claims submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-2 border">Amount (₹)</th>
                <th className="p-2 border">Distance (km)</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {claims
                .filter((claim) => claim.staffName === staffInfo.name)
                .map((claim) => (
                  <tr key={claim.id} className="border">
                    <td className="p-2 border text-center">₹{claim.ammount}</td>
                    <td className="p-2 border text-center">{claim.distance} km</td>
                    <td className={`p-2 border text-center font-bold 
                      ${claim.status === "Pending" ? "text-yellow-600" : claim.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                      {claim.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    
    </>
  )
}

export default BenchStaffClaim
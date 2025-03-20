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
    <div className='p-6  max-w-2xl mx-auto bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold text-green-600'>Conveyance Claim</h2>
        <p>Staff Name:-{staffInfo.name}</p>
        <p className='mb-2'>Assigned Manager:{staffInfo.manager}</p>
        <p className='mb-4'>Distance:{staffInfo.distance} Km</p>
        <form 
        className='space-y-4'
        onSubmit={handleSubmit}
        >
            <input type="number"
            placeholder='Enter Ammount (₹)'
            value={ammount}
            required
            className='w-full p-3 border rounded-lg'
            onChange={(e)=>setAmmount(e.target.value)}
            />
            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg">
                Submit Claim
            </button>
        </form>
        <h3 className='text-xl font-bold mt-6 underline'>Your Claims</h3>
        <ul>
        {claims
          .filter((claim) => claim.staffName === staffInfo.username)
          .map((claim) => (
            <li key={claim.id} className="border p-2 my-2">
              ₹{claim.amount} - {claim.status}
            </li>
          ))}
      </ul>
    </div>
    
    </>
  )
}

export default BenchStaffClaim
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EmailAndAadharVerification = () => {
    const [aadhaar, setAadhaar] = useState("");
    const [email, setEmail] = useState("");
    const [aadhaarVerified, setAadhaarVerified] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState({ aadhaar: false, email: false });
    const navigate=useNavigate()
    //Aadhar Verification
    const validateAadhaar = (aadhaar) => {
        return /^[2-9]{1}[0-9]{11}$/.test(aadhaar);
      };

     //Email Verification
     const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      };

    const handleAadharVerification=()=>{
        if(!validateAadhaar(aadhaar)){
            alert("Invalid Aadhar Number")
            return
        }

        setLoading((prev)=>({...prev, aadhaar:true}));
        setTimeout(()=>{
            setAadhaarVerified(true)
            setLoading((prev) => ({ ...prev, aadhaar: false }));
            alert("Aadhar Verified Successfully!")
        },2000)
    }

    const handleEmailVerification=()=>{
        if (!validateEmail(email)) {
            alert("Invalid Email Address");
            return;
          }
          setLoading((prev) => ({ ...prev, email: true }));
          setTimeout(() => {
            setEmailVerified(true);
            setLoading((prev) => ({ ...prev, email: false }));
            alert("Email Verified Successfully");
          }, 2000);
    }
    

  return (
    <>
    <div className='flex flex-col items-center p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-6'>
        <h2 className='text-xl font-bold mb-4'>Verification</h2>
        {/* Aadhar Verification  */}
        <div className=' w-full mb-4'>
            <label className='block font-semibold mb-1' >Aadhar Number</label>
            <input type="text"
            value={aadhaar}
            onChange={(e)=>setAadhaar(e.target.value)}
            className='w-full border p-2 rounded'
            disabled={aadhaarVerified}
            />
            <button
            onClick={handleAadharVerification}
            className={`w-full mt-2 p-2 rounded ${aadhaarVerified ? 'bg-green-500' : 'bg-blue-500'} text-white`}
            disabled={aadhaarVerified || loading.aadhaar}
            >    
                {loading.aadhaar ? "Verifying..." : aadhaarVerified ? "Verified" : "Verify Aadhaar"}
            </button>

        </div>

        {/* Email Verification  */}
        <div className='w-full'>
            <label  className="block font-semibold mb-1"> Email Address</label>
            <input type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='w-full border p-2 rounded'
            disabled={emailVerified}
            />
            <button
                onClick={handleEmailVerification}
                className={`w-full mt-2 p-2 rounded ${emailVerified ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                disabled={emailVerified || loading.email}
                >
                {loading.email ? "Verifying..." : emailVerified ? "Verified" : "Verify Email"}
            </button>

        </div>
    </div>
    </>
  )
}

export default EmailAndAadharVerification
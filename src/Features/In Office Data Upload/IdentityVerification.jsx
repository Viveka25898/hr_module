/* eslint-disable no-unused-vars */
import { useState } from "react";

const IdentityVerification = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [uin, setUIN] = useState("");

  // Send Aadhaar OTP (Mock Function)
  const sendAadhaarOtp = () => {
    if (aadhaar.length === 12) {
      setOtpSent(true);
      setVerificationStatus(null);
    } else {
      setVerificationStatus("❌ Invalid Aadhaar number!");
    }
  };

  // Send Email OTP (Mock Function)
  const sendEmailOtp = () => {
    if (email.includes("@") && email.includes(".")) {
      setEmailOtpSent(true);
      setVerificationStatus(null);
    } else {
      setVerificationStatus("❌ Invalid Email address!");
    }
  };

  // Verify Aadhaar OTP (Mock Function)
  const verifyAadhaarOtp = () => {
    if (otp === "123456") {
      setAadhaarVerified(true);
      setVerificationStatus("✅ Aadhaar Verified Successfully!");
      setOtpSent(false);
    } else {
      setVerificationStatus("❌ Incorrect Aadhaar OTP!");
    }
  };

  // Verify Email OTP (Mock Function)
  const verifyEmailOtp = () => {
    if (emailOtp === "654321") {
      setEmailVerified(true);
      setVerificationStatus("✅ Email Verified Successfully!");
      setEmailOtpSent(false);
    } else {
      setVerificationStatus("❌ Incorrect Email OTP!");
    }
  };

  // Generate UIN
  const generateUIN = () => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    setUIN(`UIN-${formattedDate}-${randomNumber}`);
  };

  // Generate UIN automatically after both verifications
  if (aadhaarVerified && emailVerified && !uin) {
    generateUIN();
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Identity Verification</h2>

      {/* Aadhaar Verification */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
        <input
          type="text"
          maxLength="12"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter Aadhaar Number"
        />
        {!otpSent ? (
          <button onClick={sendAadhaarOtp} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Send Aadhaar OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Aadhaar OTP"
            />
            <button onClick={verifyAadhaarOtp} className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
              Verify Aadhaar OTP
            </button>
          </>
        )}
      </div>

      {/* Email Verification */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter Email Address"
        />
        {!emailOtpSent ? (
          <button onClick={sendEmailOtp} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Send Email OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              maxLength="6"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Email OTP"
            />
            <button onClick={verifyEmailOtp} className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
              Verify Email OTP
            </button>
          </>
        )}
      </div>

      {/* Verification Status */}
      {verificationStatus && <p className="text-center mt-2 font-semibold">{verificationStatus}</p>}

      {/* UIN Display */}
      {uin && (
        <div className="mt-4 p-3 bg-gray-100 border-l-4 border-green-500">
          <p className="font-medium">UIN Generated: <span className="text-blue-600 font-semibold">{uin}</span></p>
        </div>
      )}
    </div>
  );
};

export default IdentityVerification;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorRegistration = () => {
  const navigate = useNavigate();
  const [vendorDetails, setVendorDetails] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    registrationFee: 500, // Fixed fee for now
  });

  const handleChange = (e) => {
    setVendorDetails({ ...vendorDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Registration Details:", vendorDetails);
    alert("Payment successful! Redirecting to Employee Search...");
    navigate("/dashboard/vendor/employee-search");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Vendor Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Vendor Name" value={vendorDetails.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email" value={vendorDetails.email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="tel" name="phone" placeholder="Phone Number" value={vendorDetails.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="companyName" placeholder="Company Name" value={vendorDetails.companyName} onChange={handleChange} className="w-full border p-2 rounded" required />
          <div className="bg-gray-200 p-3 rounded text-center font-bold">Registration Fee: ₹{vendorDetails.registrationFee}</div>
          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition">Pay & Register</button>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration;

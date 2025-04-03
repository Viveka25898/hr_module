/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidateRegistration = () => {
  const [showUINPopup, setShowUINPopup] = useState(true);
  const [hasUIN, setHasUIN] = useState(null);
  const [showJobChangePopup, setShowJobChangePopup] = useState(false);
  const [jobChangeStatus, setJobChangeStatus] = useState("No");
  const [formVisible, setFormVisible] = useState(false);
  const [uin, setUIN] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    pan: "",
    aadhaar: "",
    uin: "",
  });

  const mockData = {
    "123456": {
      name: "John Doe",
      address: "123 Main St, City",
      phone: "9876543210",
      email: "john@example.com",
      pan: "ABCDE1234F",
      aadhaar: "123412341234",
    },
  };

  const handleUINSelection = (value) => {
    setHasUIN(value);
    if (value) {
      setShowJobChangePopup(true);
    } else {
      setShowUINPopup(false);
      setFormVisible(true);
    }
  };

  const handleJobChangeSelection = (value) => {
    setJobChangeStatus(value ? "Yes" : "No");
    setShowJobChangePopup(false);
    setShowUINPopup(false);
    setFormVisible(true);
  };
  console.log("Job Change Status:-",jobChangeStatus);

  const handleUINSubmit = () => {
    if (mockData[uin]) {
      setFormData({ ...mockData[uin], uin });
      navigate("/dashboard/candidate/candidate-verification", { state: { oldData: mockData[uin] } });
    } else {
      alert("UIN not found! Please enter a valid UIN.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    navigate("/dashboard/candidate/document-upload");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {showUINPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Do you have a UIN?</h2>
            <div className="flex justify-between">
              <button onClick={() => handleUINSelection(true)} className="bg-green-500 text-white px-4 py-2 rounded">Yes</button>
              <button onClick={() => handleUINSelection(false)} className="bg-red-500 text-white px-4 py-2 rounded">No</button>
            </div>
          </div>
        </div>
      )}

      {showJobChangePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Currently looking for Job Change: {jobChangeStatus}</h2>
            <p className="text-center">Are you currently looking for a job change?</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleJobChangeSelection(true)} className="bg-green-500 text-white px-4 py-2 rounded">Yes</button>
              <button onClick={() => handleJobChangeSelection(false)} className="bg-red-500 text-white px-4 py-2 rounded">No</button>
            </div>
          </div>
        </div>
      )}

      {!showUINPopup && !showJobChangePopup && (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Candidate Registration</h2>
          {hasUIN ? (
            <div>
              <label className="block font-semibold">Enter UIN</label>
              <input type="text" value={uin} onChange={(e) => setUIN(e.target.value)} className="w-full border p-2 rounded" />
              <button onClick={handleUINSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="pan" placeholder="PAN Card Number" value={formData.pan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="aadhaar" placeholder="Aadhaar Number" value={formData.aadhaar} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
              <button type="submit" className="w-full bg-green-700 text-white py-2 rounded">Submit</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateRegistration;

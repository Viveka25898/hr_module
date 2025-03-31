/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidateRegistration = () => {
  const [showModal, setShowModal] = useState(true);
  const [hasUIN, setHasUIN] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    pan: "",
    aadhaar: "",
    uin: "",
  });

  // Mock Data for Testing
  const mockData = {
    "123456": {
      name: "John Doe",
      address: "123 Main St, City",
      phone: "9876543210",
      email: "john@example.com",
      pan: "ABCDE1234F",
      aadhaar: "123412341234",
    },
    "654321": {
      name: "Jane Smith",
      address: "456 Elm St, Town",
      phone: "8765432109",
      email: "jane@example.com",
      pan: "XYZAB9876K",
      aadhaar: "987698769876",
    },
  };
  const navigate=useNavigate()

  // Handle UIN Submission
  const handleUINSubmit = () => {
    if (mockData[formData.uin]) {
      setFormData({ ...mockData[formData.uin], uin: formData.uin }); // Autofill form
      setFormVisible(true); // Show form
      navigate("/dashboard/candidate/candidate-verification",{state:{oldData:mockData[formData.uin]}})

    } else {
      alert("UIN not found! Please enter a valid UIN.");
    }
  };


  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    if(!hasUIN){
        navigate("/dashboard/candidate/document-upload")
    }
    setFormData({
        name: "",
    address: "",
    phone: "",
    email: "",
    pan: "",
    aadhaar: "",
    uin: "",
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Modal for UIN Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-xl font-bold mb-4 text-green-700">Do you have a UIN?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setHasUIN(true);
                  setShowModal(false);
                }}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setHasUIN(false);
                  setShowModal(false);
                  setFormVisible(true);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Candidate Registration</h2>

        {hasUIN && !formVisible ? (
          <>
            {/* UIN Input & Submit */}
            <input
              type="text"
              name="uin"
              placeholder="Enter UIN"
              value={formData.uin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring focus:ring-gray-200"
            />
            <button
              onClick={handleUINSubmit}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Submit
            </button>
          </>
        ) : (
          // Registration Form (Auto-filled if UIN exists)
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-gray-200"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-gray-200"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-gray-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-gray-200"
            />
            <input
              type="text"
              name="pan"
              placeholder="PAN Card Number"
              value={formData.pan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-gray-200"
            />
            <input
              type="text"
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={formData.aadhaar}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-gray-200"
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CandidateRegistration;
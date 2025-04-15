/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const CandidatePFForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    pan: "",
    pfNumber: "",
    esicNumber: "",
    phone: "",
    email: "",
    address: "",
    digitalSignature: false,
  });

  useEffect(() => {
    // Prefill dummy data
    setFormData({
      name: "John Doe",
      aadhaar: "1234-5678-9012",
      pan: "ABCDE1234F",
      pfNumber: "PF1234567",
      esicNumber: "ESIC789456",
      phone: "9876543210",
      email: "john.doe@example.com",
      address: "Mumbai, Maharashtra",
      digitalSignature: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ PF/ESIC Form submitted successfully!");
    // 🔜 Integrate with Redux store or API here
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">📝 PF / ESIC Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Aadhaar Number</label>
          <input
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">PAN Number</label>
          <input
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">PF Number</label>
          <input
            name="pfNumber"
            value={formData.pfNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">ESIC Number</label>
          <input
            name="esicNumber"
            value={formData.esicNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="digitalSignature"
            checked={formData.digitalSignature}
            onChange={handleChange}
            className="mr-2"
          />
          <label>I digitally sign this form</label>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default CandidatePFForm;

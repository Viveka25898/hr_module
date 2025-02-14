/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const ManpowerRequestForm = () => {
  // State Management
  const [formData, setFormData] = useState({
    staffType: "",
    skill: "",
    grade: "",
    department: "",
    budget: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", formData);
      alert("Manpower Request Submitted Successfully!");
      setFormData({
        staffType: "",
        skill: "",
        grade: "",
        department: "",
        budget: "",
        location: "",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Manpower Request Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Staff Type */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Staff Type</label>
            <select
              name="staffType"
              value={formData.staffType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Staff Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.staffType && <p className="text-red-500 text-sm">{errors.staffType}</p>}
          </div>

          {/* Skill */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Skill</label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter skill"
            />
            {errors.skill && <p className="text-red-500 text-sm">{errors.skill}</p>}
          </div>

          {/* Grade */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Grade</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Grade</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
            </select>
            {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter budget"
            />
            {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter location"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit to Supervisor
          </button>

        </form>
      </div>
    </div>
  );
};

export default ManpowerRequestForm;

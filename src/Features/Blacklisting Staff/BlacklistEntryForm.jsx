/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Plus Icon
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlacklistForm = () => {
  const [formData, setFormData] = useState({
    staffName: "",
    employeeID: "",
    actionType: "",
    reason: "",
    incidentDate: "",
    removalDate: "",
    documents: [""], // Start with one empty file field
  });
  const location = useLocation();
  const staffDetails = location.state?.staffDetails || {};
  console.log(staffDetails);
  const fileInputRefs = useRef([]); // Store refs for each file input

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (index, e) => {
    const files = e.target.files[0]; // Get the selected file
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index] = files;
    setFormData({ ...formData, documents: updatedDocuments });
  };

  const addFileField = () => {
    if (formData.documents.length < 10) {
      setFormData({ ...formData, documents: [...formData.documents, ""] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Removal Date required if actionType is "Blacklist"
    if (formData.actionType === "Blacklist" && !formData.removalDate) {
      toast.error("Removal Date is required for Blacklist action.");
      return;
    }

    console.log("Form Submitted:", formData);
    toast.success("Blacklist/Warning Entry Submitted Successfully!");

    // Clear all file input fields manually using refs
    fileInputRefs.current.forEach((input) => {
      if (input) input.value = "";
    });

    // Reset form fields
    setFormData({
      staffName: "",
      employeeID: "",
      actionType: "",
      reason: "",
      incidentDate: "",
      removalDate: "",
      documents: [""], // Reset documents array
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Blacklist/Warning Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Staff Name */}
        <div>
          <label className="block font-medium">Name of Staff</label>
          <input
            type="text"
            name="staffName"
            value={formData.staffName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block font-medium">Employee ID of Staff</label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Action Type */}
        <div>
          <label className="block font-medium">Action Type</label>
          <select
            name="actionType"
            value={formData.actionType}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Action</option>
            <option value="Warning">Warning</option>
            <option value="Blacklist">Blacklist</option>
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block font-medium">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Incident Date */}
        <div>
          <label className="block font-medium">Incident Date</label>
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Removal Date (Optional if Warning) */}
        {formData.actionType !== "Warning" && (
          <div>
            <label className="block font-medium">Removal Date</label>
            <input
              type="date"
              name="removalDate"
              value={formData.removalDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required={formData.actionType === "Blacklist"} // Required only for Blacklist
            />
          </div>
        )}

        {/* File Upload */}
        <div>
          <label className="block font-medium">Upload Documents (Max 10)</label>
          {formData.documents.map((_, index) => (
            <input
              key={index}
              ref={(el) => (fileInputRefs.current[index] = el)} // Store ref for each file input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(index, e)}
              className="w-full p-2 border rounded-lg mt-2"
            />
          ))}
          {formData.documents.length < 10 && (
            <button
              type="button"
              onClick={addFileField}
              className="flex items-center mt-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
            >
              <AiOutlinePlus className="mr-1" />
              Add Document
            </button>
          )}
          <p className="text-gray-500 text-sm">Accepted: PDF, DOC, JPG, PNG</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Submit Entry
        </button>
      </form>
    </div>
  );
};

export default BlacklistForm;

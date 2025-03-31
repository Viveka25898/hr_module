/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({
    panCard: null,
    aadhaarCard: null,
    resume: null,
    addressProof: null,
    educationCertificates: [],
  });

  const handleFileChange = (e, field, index = null) => {
    if (field === "educationCertificates" && index !== null) {
      const updatedCertificates = [...documents.educationCertificates];
      updatedCertificates[index] = e.target.files[0];
      setDocuments({ ...documents, educationCertificates: updatedCertificates });
    } else {
      setDocuments({ ...documents, [field]: e.target.files[0] });
    }
  };

  const addEducationCertificateField = () => {
    if (documents.educationCertificates.length < 5) {
      setDocuments({
        ...documents,
        educationCertificates: [...documents.educationCertificates, null],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploaded Documents:", documents);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Document Upload</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">PAN Card</label>
            <input type="file" onChange={(e) => handleFileChange(e, "panCard")} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold">Aadhaar Card</label>
            <input type="file" onChange={(e) => handleFileChange(e, "aadhaarCard")} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold">Resume</label>
            <input type="file" onChange={(e) => handleFileChange(e, "resume")} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold">Address Proof</label>
            <input type="file" onChange={(e) => handleFileChange(e, "addressProof")} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold">Education Certificates</label>
            {documents.educationCertificates.map((_, index) => (
              <input
                key={index}
                type="file"
                onChange={(e) => handleFileChange(e, "educationCertificates", index)}
                className="w-full border p-2 rounded mt-2"
              />
            ))}
            {documents.educationCertificates.length < 5 && (
              <button
                type="button"
                onClick={addEducationCertificateField}
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              >
                + Add Certificate
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;
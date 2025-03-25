import { useState } from "react";

const ReviewAndSubmit = () => {
  const [submitted, setSubmitted] = useState(false);

  // Dummy Data (Replace with Redux state later)
  const formData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    policeVerification: "Yes",
    verificationDate: "2025-03-21",
    documents: [
      { name: "Aadhaar.pdf" },
      { name: "PAN_Card.pdf" },
    ],
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      console.log("Data Sent for Verification");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>

      <div className="border p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-medium">Personal Details</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
      </div>

      <div className="border p-4 rounded-md bg-gray-100 mt-4">
        <h3 className="text-lg font-medium">Police Verification</h3>
        <p><strong>Status:</strong> {formData.policeVerification}</p>
        <p><strong>Verification Date:</strong> {formData.verificationDate}</p>
      </div>

      <div className="border p-4 rounded-md bg-gray-100 mt-4">
        <h3 className="text-lg font-medium">Uploaded Documents</h3>
        {formData.documents.length > 0 ? (
          formData.documents.map((doc, index) => (
            <p key={index}>📄 {doc.name}</p>
          ))
        ) : (
          <p>No documents uploaded</p>
        )}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Send for Verification to Recruitment Team
        </button>
      ) : (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center">
          ✅ The data has been successfully sent to the Recruitment Team for verification!
        </div>
      )}
    </div>
  );
};

export default ReviewAndSubmit;

/* eslint-disable react/prop-types */
import { useState } from "react";

const PoliceVerification = ({ onVerificationComplete }) => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const [verificationDate, setVerificationDate] = useState("");
  const [documents, setDocuments] = useState([null]);
  const [consentForm, setConsentForm] = useState(null);
  const [policeForm, setPoliceForm] = useState(null);
  const [additionalFee, setAdditionalFee] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerificationChange = (status) => {
    setVerificationStatus(status);
    if (status === "no") {
      setAdditionalFee(true);
    } else {
      setAdditionalFee(false);
    }
  };

  const handleFileUpload = (event, type, index) => {
    const file = event.target.files[0];
    if (type === "consent") {
      setConsentForm(file);
    } else if (type === "police") {
      setPoliceForm(file);
    } else {
      const newDocuments = [...documents];
      newDocuments[index] = file;
      setDocuments(newDocuments);
    }
  };

  const addDocumentField = () => {
    if (documents.length < 10) {
      setDocuments([...documents, null]);
    }
  };

  const handleSubmit = () => {
    if (verificationStatus === "yes" && !verificationDate) {
      alert("Please enter the verification date.");
      return;
    }
    setMessage("Verification details submitted successfully!");
    onVerificationComplete({
      status: verificationStatus,
      date: verificationDate,
      consentForm,
      policeForm,
      documents,
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Police Verification</h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Has Police Verification Been Done?
      </label>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            verificationStatus === "yes" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleVerificationChange("yes")}
        >
          Yes
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            verificationStatus === "no" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleVerificationChange("no")}
        >
          No
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            verificationStatus === "later" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleVerificationChange("later")}
        >
          Later
        </button>
      </div>

      {verificationStatus === "yes" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Verification Date</label>
          <input
            type="date"
            value={verificationDate}
            onChange={(e) => setVerificationDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      {verificationStatus === "no" && additionalFee && (
        <p className="text-red-500">Additional Fee is required for verification.</p>
      )}

      {(verificationStatus === "yes" || verificationStatus === "no") && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Consent Form</label>
            <input type="file" onChange={(e) => handleFileUpload(e, "consent")} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Police Form</label>
            <input type="file" onChange={(e) => handleFileUpload(e, "police")} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Additional Documents (Max 10)</label>
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input type="file" onChange={(e) => handleFileUpload(e, "documents", index)} />
                {index === documents.length - 1 && documents.length < 10 && (
                  <button onClick={addDocumentField} className="px-3 py-1 bg-blue-500 text-white rounded-md">+</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
    </div>
  );
};

export default PoliceVerification;

// src/features/joinerReview/JoinerReviewPage.jsx
import { useState } from "react";
import MissingFieldHighlighter from "./MissingFieldHighlighter";
import dummyJoiner from "../data/JoinersDummy.js"
const JoinerReviewPage = () => {
  const [formData, setFormData] = useState(dummyJoiner);
  const [resubmitted, setResubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(formData).every((val) => val !== "");

  const handleResubmit = () => {
    if (isFormValid) {
      console.log("Resubmitting to approval flow...", formData);
      setResubmitted(true);
      // Later: dispatch(updateJoiner(formData)) + API integration
    } else {
      alert("Please fill all required fields!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Candidate Review - BHR Panel</h2>

      <MissingFieldHighlighter
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <MissingFieldHighlighter
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <MissingFieldHighlighter
        label="Aadhaar Number"
        name="aadhaar"
        value={formData.aadhaar}
        onChange={handleChange}
      />
      <MissingFieldHighlighter
        label="PAN Number"
        name="pan"
        value={formData.pan}
        onChange={handleChange}
      />
      <MissingFieldHighlighter
        label="PF Number"
        name="pfNumber"
        value={formData.pfNumber}
        onChange={handleChange}
      />
      <MissingFieldHighlighter
        label="ESIC Number"
        name="esicNumber"
        value={formData.esicNumber}
        onChange={handleChange}
      />
      <MissingFieldHighlighter
        label="Site Name"
        name="siteName"
        value={formData.siteName}
        onChange={handleChange}
        />


      <button
        onClick={handleResubmit}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
      >
        Resend for Approval
      </button>

      {resubmitted && (
        <p className="text-green-600 mt-4 text-center font-medium">
          ✅ Data submitted for approval.
        </p>
      )}
    </div>
  );
};

export default JoinerReviewPage;

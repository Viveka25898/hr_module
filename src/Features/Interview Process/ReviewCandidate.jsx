/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    roundName: "Housekeeping Round",
    status: "Passed",
    formData: {
      cleanliness: "Excellent",
      punctuality: "Good",
      communication: "Fair",
    },
  },
  {
    roundName: "Manager Round",
    status: "Passed",
    formData: {
      attitude: "Positive",
      experience: "3 years",
      teamFit: "Yes",
    },
  },
  {
    roundName: "Cluster Manager Round",
    status: "Passed",
    formData: {
      leadership: "Strong",
      decisionMaking: "Very Good",
      comments: "Recommended for offer",
    },
  },
];

// Dummy extra data
const dummyCV = {
  fileName: "candidate_cv.pdf",
};

const compAndBen = {
  expectedCTC: "₹18,000/month",
  offeredCTC: "₹20,000/month",
  benefits: ["ESIC", "PF", "Uniform", "Meal Allowance"],
};

const panelAssessment = [
  {
    panelist: "Mr. Sharma",
    feedback: "Candidate shows initiative and fits well in team structure.",
  },
  {
    panelist: "Ms. Radhika",
    feedback: "Has prior experience and good understanding of role.",
  },
];

const CandidateReviewPage = () => {
  const navigate = useNavigate();

  const handleGiveOfferClick = () => {
    navigate("/dashboard/TA/offer-letter");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Candidate Final Review
      </h2>

      {dummyData.map((round, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">
              {round.roundName}
            </h3>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                round.status === "Passed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {round.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(round.formData).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm text-gray-600 capitalize">{key}</label>
                <div className="border px-3 py-2 rounded bg-gray-50 text-gray-800">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CV, Com & Ben, Assessment Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Forwarding Details to Deemed Supervisor
        </h3>

        {/* CV Upload Info */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">
            Uploaded CV:
          </label>
          <div className="border px-4 py-2 rounded bg-gray-50 text-blue-700 font-semibold">
            {dummyCV.fileName}
          </div>
        </div>

        {/* Compensation & Benefits */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">
            Compensation & Benefits:
          </label>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded border text-gray-800">
            <li><strong>Expected CTC:</strong> {compAndBen.expectedCTC}</li>
            <li><strong>Offered CTC:</strong> {compAndBen.offeredCTC}</li>
            <li><strong>Benefits:</strong> {compAndBen.benefits.join(", ")}</li>
          </ul>
        </div>

        {/* Panelist Assessments */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">
            Panelist Assessments:
          </label>
          <div className="space-y-2 bg-gray-50 p-4 rounded border">
            {panelAssessment.map((item, idx) => (
              <div key={idx} className="border p-3 rounded bg-white shadow-sm">
                <div className="text-sm text-gray-700 font-medium">
                  {item.panelist}
                </div>
                <p className="text-gray-600 mt-1">{item.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleGiveOfferClick}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Forward for Approval
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateReviewPage;

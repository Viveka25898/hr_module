/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const OfferLetterPage = () => {
  const { candidateId } = useParams();

  // Dummy candidate data
  const candidate = {
    id: candidateId,
    name: "Amit Sharma",
    skill: "Housekeeping",
    role: "Housekeeping Staff",
    gradeMatrix: {
      "Grade A": "₹22,000",
      "Grade B": "₹18,000",
      "Grade C": "₹15,000",
    },
    suggestedGrade: "Grade B",
  };

  const [selectedGrade, setSelectedGrade] = useState(candidate.suggestedGrade);
  const [salary, setSalary] = useState(candidate.gradeMatrix[selectedGrade]);
  const [offerSent, setOfferSent] = useState(false);
  const [candidateApproved, setCandidateApproved] = useState(false);

  const handleGradeChange = (e) => {
    const grade = e.target.value;
    setSelectedGrade(grade);
    setSalary(candidate.gradeMatrix[grade]);
  };

  const handleOffer = () => {
    setOfferSent(true);
  };

  const handleApprovalToggle = () => {
    setCandidateApproved(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Offer Letter Process
      </h2>

      {/* Candidate Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-700">
          Candidate Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <p><span className="font-semibold">Candidate ID:</span> {candidate.id}</p>
          <p><span className="font-semibold">Name:</span> {candidate.name}</p>
          <p><span className="font-semibold">Skill:</span> {candidate.skill}</p>
          <p><span className="font-semibold">Role:</span> {candidate.role}</p>
        </div>
      </div>

      {/* Offer Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
        <h3 className="text-lg font-medium mb-4 text-gray-700">Offer Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Grade</label>
            <select
              className="w-full border rounded-lg px-4 py-2 text-gray-700"
              value={selectedGrade}
              onChange={handleGradeChange}
              disabled={offerSent}
            >
              {Object.keys(candidate.gradeMatrix).map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
              value={salary}
              readOnly
            />
          </div>
        </div>

        {!offerSent && (
          <button
            onClick={handleOffer}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Offer to Candidate
          </button>
        )}
      </div>

      {/* Simulate Candidate Approval */}
      {offerSent && (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Candidate Response
          </h3>
          {!candidateApproved ? (
            <button
              onClick={handleApprovalToggle}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Candidate Approves ✅
            </button>
          ) : (
            <p className="text-green-700 font-medium">
              ✅ Offer Approved & Tagged with Candidate Name
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OfferLetterPage;

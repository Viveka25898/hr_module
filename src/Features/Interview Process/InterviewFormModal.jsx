/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const InterviewStarter = () => {
  const [candidateName, setCandidateName] = useState("");
  const [timeOfEntry, setTimeOfEntry] = useState("");
  const [grade, setGrade] = useState("");
  const [isFinalRound, setIsFinalRound] = useState(false);
  const [isTechnicalStaff, setIsTechnicalStaff] = useState(false);
  const [secondRoundInitiated, setSecondRoundInitiated] = useState(false);

  const [entrySubmitted, setEntrySubmitted] = useState(false);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [panelists, setPanelists] = useState([]);
  const [formData, setFormData] = useState({
    communication: "",
    jobKnowledge: "",
    overallRemarks: "",
  });

  const GRADE_PANEL_REQUIREMENTS = {
    Manager: 1,
    "Vice President": 2,
  };

  const panelistPool = [
    "Ravi (HR)",
    "Anita (Finance)",
    "Suresh (IT)",
    "Neha (Admin)",
    "Akshay (Legal)",
  ];

  const getRandomPanelists = (count) => {
    const shuffled = [...panelistPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleEntrySubmit = () => {
    if (!candidateName || !timeOfEntry || !grade) {
      alert("Please fill all fields.");
      return;
    }

    const panelistCount = GRADE_PANEL_REQUIREMENTS[grade] || 0;
    const selected = getRandomPanelists(panelistCount || 1);
    setPanelists(selected);

    setEntrySubmitted(true);
  };

  const handleInterviewSubmit = () => {
    console.log("Interview Submitted:", {
      candidateName,
      timeOfEntry,
      grade,
      isFinalRound,
      secondRoundInitiated,
      cvUploaded,
      panelists,
      formData,
    });
    alert("Interview submitted!");
  };

  const handleSecondRound = () => {
    const newPanelist = getRandomPanelists(1);
    setPanelists(newPanelist);
    setSecondRoundInitiated(true);
    setShowInterviewForm(true);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-10 border rounded shadow space-y-6">
      <h2 className="text-2xl font-semibold text-green-700 text-center">
        {isFinalRound
          ? "Final Round Interview Setup"
          : secondRoundInitiated
          ? "Second Round (Technical)"
          : "Interview Setup"}
      </h2>

      {!entrySubmitted && (
        <div className="space-y-4">
          <div>
            <label className="font-medium">Candidate Name:</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="font-medium">Time of Entry:</label>
            <input
              className="w-full border p-2 rounded mt-1"
              type="time"
              value={timeOfEntry}
              onChange={(e) => setTimeOfEntry(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Grade / Role:</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="">Select Grade</option>
              <option value="Executive">Executive</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Manager">Manager</option>
              <option value="Vice President">Vice President</option>
            </select>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              checked={isTechnicalStaff}
              onChange={(e) => setIsTechnicalStaff(e.target.checked)}
            />
            <label>Technical Staff?</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isFinalRound}
              onChange={(e) => setIsFinalRound(e.target.checked)}
            />
            <label>Is this a Final Round?</label>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleEntrySubmit}
          >
            Submit Entry
          </button>
        </div>
      )}

      {entrySubmitted && !showInterviewForm && (
        <div className="text-center space-y-4">
          <p className="text-gray-700 font-medium">
            Entry recorded for <strong>{candidateName}</strong> at <strong>{timeOfEntry}</strong>.
          </p>

          <div className="text-left bg-yellow-50 p-3 border-l-4 border-yellow-400 rounded">
            <p className="font-medium text-yellow-800">Panelist(s):</p>
            <ul className="list-disc ml-6">
              {panelists.map((p, idx) => (
                <li key={idx} className="text-sm text-gray-700">{p}</li>
              ))}
            </ul>
          </div>

          {!secondRoundInitiated && isTechnicalStaff && (
            <button
              onClick={handleSecondRound}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Start Second Round (New Panelist)
            </button>
          )}

          <button
            onClick={() => setShowInterviewForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Interview Form
          </button>
        </div>
      )}

      {showInterviewForm && (
        <div className="space-y-6 border-t pt-6">
          <h3 className="text-xl font-semibold text-green-700">Interview Form</h3>

          {!cvUploaded ? (
            <div>
              <label className="font-medium">Upload CV:</label>
              <input
                type="file"
                onChange={(e) => {
                  setCvFile(e.target.files[0]);
                  setCvUploaded(true);
                }}
                className="mt-2"
              />
            </div>
          ) : (
            <p className="text-sm text-green-600">CV uploaded: {cvFile?.name}</p>
          )}

          <div className="space-y-4">
            <div>
              <label className="font-medium">1. Communication Skills</label>
              <textarea
                name="communication"
                value={formData.communication}
                onChange={handleFormChange}
                placeholder="How well did the candidate communicate?"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="font-medium">2. Job Knowledge</label>
              <textarea
                name="jobKnowledge"
                value={formData.jobKnowledge}
                onChange={handleFormChange}
                placeholder="Relevant skills, experience, technical/domain knowledge"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="font-medium">3. Overall Remarks</label>
              <textarea
                name="overallRemarks"
                value={formData.overallRemarks}
                onChange={handleFormChange}
                placeholder="General observations, final recommendation"
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleInterviewSubmit}
          >
            Submit Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewStarter;

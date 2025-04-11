/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import UniformForm from "../Components/Uniform";
import Preview from "./Preview";
import ThankYouPopup from "./ThankYou";

// Dummy candidate data
const candidate = {
  name: "Ravi Kumar",
  grade: "Worker",
  role: "Electrician",
  gender: "Male",
  photoUrl: "/images/candidate-photo.jpg", // assume a static path for now
};

// Roles & grades eligible for uniform
const eligibleList = [
  { grade: "Worker", role: "Electrician" },
  { grade: "Worker", role: "Plumber" },
  { grade: "Supervisor", role: "Security Guard" },
  { grade: "Worker", role: "Cleaner" },
];

const UniformManagement = () => {
  const [isEligible, setIsEligible] = useState(false);
  
  const [formData, setFormData] = useState({
    shirtSize: "",
    pantSize: "",
    shoeSize: "",
    helmetSize: "",
  });
  const [step, setStep] = useState(1); // 1 = form, 2 = preview, 3 = thank you

  useEffect(() => {
    const match = eligibleList.some(
      (item) => item.grade === candidate.grade && item.role === candidate.role
    );
    setIsEligible(match);
  }, []);

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const confirmDetails = () => {
    setStep(2); // move to preview
  };

  const handleThumbsUp = () => {
    setStep(3); // move to thank you
  };

  if (!isEligible) {
    return (
      <div className="text-center p-4 text-gray-600">
        This role does not require a uniform. No details needed.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {step === 1 && (
        <UniformForm
          formData={formData}
          updateForm={updateForm}
          confirmDetails={confirmDetails}
        />
      )}
      {step === 2 && (
        <Preview
          formData={formData}
          candidate={candidate}
          onThumbsUp={handleThumbsUp}
        />
      )}
      {step === 3 && <ThankYouPopup />}
    </div>
  );
};

export default UniformManagement;

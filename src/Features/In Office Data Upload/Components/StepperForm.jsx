/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Stepper, Step, StepLabel } from "@mui/material";
import BasicDetails from "./BasicDetails";

const steps = [
  "Basic Details",
  "Identity Verification",
  "Police Verification",
  "Document Upload",
  "Review & Submit",
];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.form);

  const getStepContent = (step) => {
    switch (step) {
       case 0: return <BasicDetails />;
    //   case 1: return <IdentityVerification />;
    //   case 2: return <PoliceVerification />;
    //   case 3: return <DocumentUpload />;
    //   case 4: return <ReviewSubmit />;
      default: return "Unknown Step";
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-green-700 font-bold text-center mb-6">HR Data Upload & Verification</h2>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-6">{getStepContent(activeStep)}</div>

      <div className="mt-6 flex justify-between">
        <button
          className={`px-6 py-2 rounded-lg text-white transition-all ${
            activeStep === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
          }`}
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepperForm;

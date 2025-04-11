/* eslint-disable no-unused-vars */
import React from "react";
import { CheckCircle2 } from "lucide-react";

const ThankYouPopup = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center space-y-4">
      <CheckCircle2 size={48} className="text-green-600 mx-auto" />

      <h2 className="text-2xl font-semibold text-gray-800">
        Thank You!
      </h2>

      <p className="text-gray-600 text-sm">
        Your uniform and shoe size details have been recorded successfully.
      </p>

      <p className="text-gray-600 text-sm">
        Your uniform will be issued to you on your joining date.
      </p>
    </div>
  );
};

export default ThankYouPopup;

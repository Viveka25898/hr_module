/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const UINGeneration = () => {
  const [uin, setUin] = useState("");
  const [message, setMessage] = useState("");

  const generateUIN = () => {
    const newUIN = `UIN-${Math.floor(100000 + Math.random() * 900000)}`;
    setUin(newUIN);
    setMessage("UIN generated and sent via Email & SMS.");
    console.log(`Generated UIN: ${newUIN}`);
    console.log(`Mock Email Sent: Your UIN is ${newUIN}`);
    console.log(`Mock SMS Sent: Your UIN is ${newUIN}`);
  };

  const resendUIN = () => {
    if (!uin) return;
    setMessage("UIN resent via Email & SMS.");
    console.log(`Resent Email: Your UIN is ${uin}`);
    console.log(`Resent SMS: Your UIN is ${uin}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Generate UIN</h2>
        <button
          onClick={generateUIN}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate UIN
        </button>
        {uin && (
          <div className="mt-4 text-center">
            <p className="font-semibold">Generated UIN:</p>
            <p className="text-lg text-green-600 font-bold">{uin}</p>
            <button
              onClick={resendUIN}
              className="mt-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Resend UIN
            </button>
          </div>
        )}
        {message && <p className="text-center mt-2 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default UINGeneration;

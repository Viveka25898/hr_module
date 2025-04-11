/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const UniformForm = ({ formData, updateForm, confirmDetails, onSubmit }) => {
  const shirtSizes = ["S", "M", "L", "XL", "XXL"];
  const pantSizes = ["28", "30", "32", "34", "36", "38"];
  const shoeSizes = ["6", "7", "8", "9", "10", "11"];
  const helmetSizes = ["Small", "Medium", "Large"];

  const isValid = () =>
    formData.shirtSize &&
    formData.pantSize &&
    formData.shoeSize &&
    formData.helmetSize;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-700">
        Enter Uniform & Shoe Size Details
      </h2>

      {/* Shirt Size */}
      <div>
        <label className="block text-sm font-medium">Shirt/T-Shirt Size</label>
        <select
          value={formData.shirtSize}
          onChange={(e) => updateForm("shirtSize", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        >
          <option value="">Select Size</option>
          {shirtSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Pant Size */}
      <div>
        <label className="block text-sm font-medium">Pant/Trouser Size</label>
        <select
          value={formData.pantSize}
          onChange={(e) => updateForm("pantSize", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        >
          <option value="">Select Size</option>
          {pantSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Shoe Size */}
      <div>
        <label className="block text-sm font-medium">Shoe Size</label>
        <select
          value={formData.shoeSize}
          onChange={(e) => updateForm("shoeSize", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        >
          <option value="">Select Size</option>
          {shoeSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Helmet Size (optional for some roles, still required here for simplicity) */}
      <div>
        <label className="block text-sm font-medium">Cap/Helmet Size</label>
        <select
          value={formData.helmetSize}
          onChange={(e) => updateForm("helmetSize", e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        >
          <option value="">Select Size</option>
          {helmetSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>

      <button
        disabled={!isValid()}
        onClick={confirmDetails}
        className={`w-full mt-4 py-2 rounded-xl text-white font-semibold ${
          isValid()
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Continue to Preview
      </button>
    </div>
  );
};

export default UniformForm;

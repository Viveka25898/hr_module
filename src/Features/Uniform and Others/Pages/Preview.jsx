/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ThumbsUp, Smile } from "lucide-react"; // optional icons for nice UI

const Preview = ({ formData, onThumbsUp }) => {
  const { photoURL, jobRole, grade, gender, shirtSize, pantSize, shoeSize, helmetSize } = formData;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-center text-gray-700">
        Preview Your Uniform
      </h2>

      {/* Dummy Photo Preview */}
      <div className="flex justify-center">
        <img
          src={photoURL || "/dummy-user.png"}
          alt="Candidate Preview"
          className="w-40 h-40 object-cover rounded-full border"
        />
      </div>

      {/* Display details */}
      <div className="text-sm text-gray-700 space-y-1 text-center">
        <p><strong>Role:</strong> {jobRole}</p>
        <p><strong>Grade:</strong> {grade}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Shirt Size:</strong> {shirtSize}</p>
        <p><strong>Pant Size:</strong> {pantSize}</p>
        <p><strong>Shoe Size:</strong> {shoeSize}</p>
        <p><strong>Helmet Size:</strong> {helmetSize}</p>
      </div>

      {/* Like/Emoji Buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={onThumbsUp}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          <ThumbsUp size={20} /> I Like It
        </button>

        <button
          onClick={onThumbsUp}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500"
        >
          <Smile size={20} /> Looks Good!
        </button>
      </div>
    </div>
  );
};

export default Preview;

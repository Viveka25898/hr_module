/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const PhotoCaptureModal = ({ isOpen, onClose, onConfirm, joiner }) => {
  const [preview, setPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleConfirm = () => {
    if (!photoFile) return alert("Please upload a photo before confirming.");
    onConfirm(photoFile);
    setPhotoFile(null);
    setPreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Arrival</h2>
        <p className="mb-2">Candidate: <strong>{joiner.name}</strong></p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Candidate Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mb-2"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full border shadow"
            />
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Confirm Arrival
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCaptureModal;

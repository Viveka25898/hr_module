/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const WelcomeVideoModal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-3xl relative shadow-2xl">
        
        {/* Alert banner */}
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 text-sm text-center font-medium">
          🔊 Tap the <strong>speaker icon</strong> in the video controls to hear audio
        </div>

        {/* Video */}
        <video
          autoPlay
          muted
          controls
          className="w-full h-[420px] object-cover"
        >
          <source src="/src/Assets/welcome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          ✕ Close
        </button>
      </div>
    </div>
  );
};

export default WelcomeVideoModal;

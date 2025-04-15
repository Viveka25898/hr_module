/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import JoinerCard from "../Components/JoinerCard";
import PhotoCaptureModal from "../Components/PhotoCaptureModal";
import joinersDummy from "../data/JoinersDummy";
import { toast } from "react-toastify";

const JoinerDashboard = () => {
  const [joiners, setJoiners] = useState(joinersDummy);
  const [selectedJoiner, setSelectedJoiner] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [linkSent, setLinkSent] = useState({});

  const openPhotoModal = (joiner) => {
    setSelectedJoiner(joiner);
    setModalOpen(true);
  };

  const confirmArrival = (photoFile) => {
    const updated = joiners.map((j) =>
      j.id === selectedJoiner.id
        ? {
            ...j,
            status: "confirmed",
            photo: URL.createObjectURL(photoFile), // Save photo preview
          }
        : j
    );
    setJoiners(updated);
    setModalOpen(false);
  };

  //Send Link

  const handleSendLink = (id) => {
    setLinkSent((prev) => ({ ...prev, [id]: true }));
    toast.success("Link sent to Candidate to fill the PF/ESIC Form");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📝 Pending Manpower Tasks</h1>
      {joiners.length > 0 ? (
        joiners.map((joiner) => (
          <JoinerCard
            key={joiner.id}
            joiner={joiner}
            onClickConfirm={openPhotoModal}
            onSendLink={handleSendLink}
            linkSent={linkSent[joiner.id]}
          />
        ))
      ) : (
        <p>No joiners found.</p>
      )}

      <PhotoCaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmArrival}
        joiner={selectedJoiner}
      />
    </div>
  );
};

export default JoinerDashboard;

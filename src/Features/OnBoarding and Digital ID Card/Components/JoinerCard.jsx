/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const JoinerCard = ({ joiner, onClickConfirm, onSendLink, linkSent  }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4 border">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{joiner.name}</h2>
          <p>Skill: {joiner.skill}</p>
          <p>Department: {joiner.department}</p>
          <p>Joining Date: {joiner.joiningDate}</p>
          <p>Site: {joiner.site}</p>
        </div>
        {joiner.status === "pending" ? (
                <button
                    onClick={() => onClickConfirm(joiner)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Confirm Arrival
                </button>
                ) : (
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-green-700 font-medium">✅ Confirmed</span>
                            <button
                            onClick={() => onSendLink(joiner.id)}
                            disabled={linkSent}
                            className={`${
                                linkSent
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white px-3 py-1 rounded`}
                            >
                            {linkSent ? "Link Sent" : "Send Link"}
                            </button>
                        </div>
)}
        {joiner.photo && (
  <img
    src={joiner.photo}
    alt={`${joiner.name}'s Photo`}
    className="w-16 h-16 object-cover rounded-full border shadow-md mr-4"
  />
)}

      </div>
    </div>
  );
};

export default JoinerCard;

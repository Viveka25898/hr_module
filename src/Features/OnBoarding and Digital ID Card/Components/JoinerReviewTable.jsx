/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import hooks for Redux
import JoinerReviewDetails from './JoinerReviewDetails';
import IDCard from './IDCard';

const dummyJoiners = [
  {
    id: 1,
    name: 'Amit Kumar',
    joiningDate: '2025-04-15',
    pfNumber: 'PF123456',
    esicNumber: '',
    siteName: 'Site A',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Priya Singh',
    joiningDate: '2025-04-15',
    pfNumber: '',
    esicNumber: 'ESIC987654',
    siteName: 'Site B',
    status: 'Sent for Approval',
  },
];

const JoinerReviewTable = () => {
  const [selectedJoiner, setSelectedJoiner] = useState(null);
  const [joiners, setJoiners] = useState(dummyJoiners);

  // Accessing Redux store data
  const { role, assignedSites } = useSelector((state) => state.auth);  // Assuming the user data is stored in auth

  const handleStatusUpdate = (id, newStatus) => {
    const updatedJoiners = joiners.map((j) =>
      j.id === id ? { ...j, status: newStatus } : j
    );
    setJoiners(updatedJoiners);
  
    // Keep selectedJoiner to show ID card
    const updatedSelected = updatedJoiners.find((j) => j.id === id);
    setSelectedJoiner(updatedSelected);
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Joiner List - Today's Joining</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Joining Date</th>
            <th className="border px-4 py-2">Site</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {joiners.map((joiner) => (
            <tr key={joiner.id}>
              <td className="border px-4 py-2">{joiner.name}</td>
              <td className="border px-4 py-2">{joiner.joiningDate}</td>
              <td className="border px-4 py-2">{joiner.siteName}</td>
              <td className="border px-4 py-2 text-center">{joiner.status}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => setSelectedJoiner(joiner)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedJoiner && (
        <div className="mt-6">
          <JoinerReviewDetails
            joiner={selectedJoiner}
            onClose={() => setSelectedJoiner(null)}
            onApprove={(updatedJoiner) => {
                if (role === 'site-manager') {
                  handleStatusUpdate(updatedJoiner.id, 'Sent for Approval', updatedJoiner);
                } else {
                  handleStatusUpdate(selectedJoiner.id, 'Accepted', selectedJoiner);
                }
              }}
              onReject={() => handleStatusUpdate(selectedJoiner.id, 'Rejected')}
              role={role}
          />

        {selectedJoiner.status === 'Accepted' && (
            <IDCard joiner={selectedJoiner} />
            )}
        </div>
      )}
    </div>
  );
};

export default JoinerReviewTable;

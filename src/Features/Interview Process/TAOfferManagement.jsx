/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialCandidates = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      role: 'Site Cleaner',
      site: 'Galaxy Towers, Mumbai',
      status: 'Approved',
      supervisor: 'Mr. Rajeev Mehta',
      dateOfJoining: '2025-04-15',
      contact: {
        email: 'ramesh@example.com',
        phone: '9876543210',
        whatsapp: '9876543210',
      },
      compensation: {
        grade: 'G3',
        basic: 12000,
        hra: 3000,
        specialAllowance: 2000,
        totalCTC: 17000,
      }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Admin Executive',
      site: 'Site B - Andheri Office',
      status: 'Approved',
      supervisor: 'Ms. Kavita Joshi',
      dateOfJoining: '2025-04-20',
      contact: {
        email: 'priya.sharma@example.com',
        phone: '9876500002',
        whatsapp: '9876500002',
      },
      compensation: {
        grade: 'G4',
        basic: 15000,
        hra: 4000,
        specialAllowance: 3000,
        totalCTC: 22000,
      }
    },
    {
      id: 3,
      name: 'Amit Verma',
      role: 'Security Head',
      site: 'Site C - Navi Mumbai Warehouse',
      status: 'Approved',
      supervisor: 'Mr. Vinay Deshmukh',
      dateOfJoining: '2025-04-25',
      contact: {
        email: 'amit.verma@example.com',
        phone: '9876500003',
        whatsapp: '9876500003',
      },
      compensation: {
        grade: 'G5',
        basic: 18000,
        hra: 5000,
        specialAllowance: 4000,
        totalCTC: 27000,
      }
    },
    {
      id: 4,
      name: 'Meena Patil',
      role: 'Supervisor',
      site: 'Site D - Pune Head Office',
      status: 'Approved',
      supervisor: 'Ms. Shilpa Rane',
      dateOfJoining: '2025-04-22',
      contact: {
        email: 'meena.patil@example.com',
        phone: '9876500004',
        whatsapp: '9876500004',
      },
      compensation: {
        grade: 'G4',
        basic: 16000,
        hra: 4000,
        specialAllowance: 2500,
        totalCTC: 22500,
      }
    },
    {
      id: 5,
      name: 'Rajeev Raut',
      role: 'IT Support',
      site: 'Site E - Nagpur Support Centre',
      status: 'Approved',
      supervisor: 'Mr. Suresh Doke',
      dateOfJoining: '2025-04-28',
      contact: {
        email: 'rajeev.raut@example.com',
        phone: '9876500005',
        whatsapp: '9876500005',
      },
      compensation: {
        grade: 'G4',
        basic: 17000,
        hra: 3500,
        specialAllowance: 3000,
        totalCTC: 23500,
      }
    }
  ];

const TAOfferManagementPage = () => {
  const [candidates, setCandidates] = useState(initialCandidates);
  const navigate=useNavigate()

  const handleSendOffer = (candidate) => {
    navigate('/dashboard/TA/send-offer', { state: { candidate } });
  };

  const handleReject = (id) => {
    const updated = candidates.map((c) =>
      c.id === id ? { ...c, status: 'Rejected' } : c
    );
    setCandidates(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Approved Candidates</h2>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Site</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate.id} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{candidate.name}</td>
              <td className="p-2 border">{candidate.role}</td>
              <td className="p-2 border">{candidate.site}</td>
              <td className="p-2 border font-semibold">
                <span
                  className={`px-2 py-1 rounded ${
                    candidate.status === 'Offer Sent'
                      ? 'bg-green-100 text-green-600'
                      : candidate.status === 'Rejected'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {candidate.status}
                </span>
              </td>
              <td className="p-2 border space-x-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => alert(`Showing details of ${candidate.name}`)}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleSendOffer(candidate)}
                  disabled={candidate.status !== 'Approved'}
                >
                  Send Offer
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleReject(candidate.id)}
                  disabled={candidate.status !== 'Approved'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TAOfferManagementPage;

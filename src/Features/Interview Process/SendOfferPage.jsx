/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SendOfferPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const candidate = location.state?.candidate;

  const [joiningDate, setJoiningDate] = useState('');
  const [sendMethod, setSendMethod] = useState('email');
  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!candidate) {
      navigate('/ta/offer-management');
    }
  }, [candidate, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!joiningDate) {
      alert('Joining date is required');
      return;
    }
    setSubmitted(true);

    // Simulate sending offer
    setTimeout(() => {
      alert(`Offer sent via ${sendMethod.toUpperCase()} to ${candidate.name}`);
      navigate('/ta/offer-management');
    }, 1200);
  };

  if (!candidate) return null;

  const dummyOfferLink = `https://hrportal.company.com/offer/${candidate.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 border rounded bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Send Offer to {candidate.name}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Candidate Name</label>
          <input type="text" value={candidate.name} disabled className="w-full p-2 bg-gray-100 rounded border" />
        </div>

        <div>
          <label className="block font-medium">Site</label>
          <input type="text" value={candidate.site} disabled className="w-full p-2 bg-gray-100 rounded border" />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <input type="text" value={candidate.role} disabled className="w-full p-2 bg-gray-100 rounded border" />
        </div>

        <div>
          <label className="block font-medium">Supervisor Name</label>
          <input type="text" value={candidate.supervisor || 'N/A'} disabled className="w-full p-2 bg-gray-100 rounded border" />
        </div>

        <div>
          <label className="block font-medium">Date of Joining <span className="text-red-500">*</span></label>
          <input type="date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Send Via</label>
          <select value={sendMethod} onChange={(e) => setSendMethod(e.target.value)} className="w-full p-2 border rounded">
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Compensation & Benefits</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <span><strong>Grade:</strong> {candidate.compensation.grade}</span>
            <span><strong>Basic:</strong> ₹{candidate.compensation.basic}</span>
            <span><strong>HRA:</strong> ₹{candidate.compensation.hra}</span>
            <span><strong>Special Allowance:</strong> ₹{candidate.compensation.specialAllowance}</span>
            <span><strong>Total CTC:</strong> ₹{candidate.compensation.totalCTC}</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Remarks</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} className="w-full p-2 border rounded" rows={3} placeholder="Any remarks for the candidate or internal note" />
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            disabled={submitted}
            className={`px-5 py-2 rounded text-white font-semibold ${submitted ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {submitted ? 'Sending Offer...' : 'Send Offer'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default SendOfferPage;

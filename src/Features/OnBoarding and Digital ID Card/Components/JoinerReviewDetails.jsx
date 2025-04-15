/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const JoinerReviewDetails = ({ joiner, onClose, onApprove, onReject, role }) => {
  const [formData, setFormData] = useState({
    id: joiner.id,
    name: joiner.name || '',
    pfNumber: joiner.pfNumber || '',
    esicNumber: joiner.esicNumber || '',
    siteName: joiner.siteName || '',
  });

  const [employeeCode, setEmployeeCode] = useState('');
  const [idCardGenerated, setIdCardGenerated] = useState(false);
  const [ismartLinkSent, setIsmartLinkSent] = useState(false);

  const isMissing = (field) => formData[field].trim() === '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      isMissing('name') ||
      isMissing('pfNumber') ||
      isMissing('esicNumber') ||
      isMissing('siteName')
    ) {
      alert('Please fill all required fields.');
      return;
    }

    const updatedJoiner = {
      ...formData,
      joiningDate: joiner.joiningDate,
      status: 'Sent for Approval',
      reviewed: true,
    };

    onApprove(updatedJoiner);
  };

  const generateEmployeeCode = (name, id) => {
    return `EMP${name[0].toUpperCase()}${id.toString().padStart(4, '0')}`;
  };

  const handleAccept = () => {
    const code = generateEmployeeCode(joiner.name, joiner.id);
    setEmployeeCode(code);
    setIdCardGenerated(true);
    onApprove(); // you can pass the updated data if needed
  };

  return (
    <div className="bg-white shadow-md rounded p-4 border mt-6">
      <h3 className="text-lg font-semibold mb-4">Review Joiner Details</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              isMissing('name') ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">PF Number</label>
          <input
            name="pfNumber"
            value={formData.pfNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              isMissing('pfNumber') ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">ESIC Number</label>
          <input
            name="esicNumber"
            value={formData.esicNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              isMissing('esicNumber') ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Site Name</label>
          <input
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              isMissing('siteName') ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {role === 'site-manager' && (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit to Approval
          </button>
        )}
        {role === 'bhr' && joiner.status === 'Sent for Approval' && (
          <>
            <button
              onClick={handleAccept}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={onReject}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>

      {role === 'bhr' && idCardGenerated && (
        <div className="mt-6 border p-4 bg-gray-50 rounded shadow-sm space-y-4">
          <h4 className="text-lg font-semibold text-green-700">✔️ Approved</h4>
          <div>
            <p><strong>Employee Code:</strong> {employeeCode}</p>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Site:</strong> {formData.siteName}</p>
          </div>

          {!ismartLinkSent ? (
            <button
              onClick={() => {
                setIsmartLinkSent(true);
                alert(`iSMART App link sent to ${formData.name}`);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send iSMART App Link
            </button>
          ) : (
            <p className="text-blue-600 font-medium">📩 iSMART App link sent to candidate.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinerReviewDetails;

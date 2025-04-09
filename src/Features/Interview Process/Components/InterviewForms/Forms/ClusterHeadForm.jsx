/* eslint-disable no-unused-vars */
import React from "react";

const ClusterHeadForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Cluster Head Interview Assessment Form</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Understanding of Multi-site Operations</label>
          <textarea className="w-full border rounded px-3 py-2" rows="3" />
        </div>

        <div>
          <label className="block text-sm font-medium">Leadership & Strategic Thinking</label>
          <textarea className="w-full border rounded px-3 py-2" rows="3" />
        </div>

        <div>
          <label className="block text-sm font-medium">Problem Solving & Conflict Management</label>
          <textarea className="w-full border rounded px-3 py-2" rows="3" />
        </div>

        <div>
          <label className="block text-sm font-medium">Experience Managing Large Teams or Budgets</label>
          <textarea className="w-full border rounded px-3 py-2" rows="3" />
        </div>

        <div>
          <label className="block text-sm font-medium">Any Areas of Concern</label>
          <textarea className="w-full border rounded px-3 py-2" rows="2" />
        </div>

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Submit Assessment
        </button>
      </form>
    </div>
  );
};

export default ClusterHeadForm;

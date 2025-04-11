/* eslint-disable no-unused-vars */
import React from "react";

const ClusterHeadForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Cluster Head Interview Assessment Form</h2>

      <form className="space-y-4">
      <label className="block">
        Upload CV:
        <input
          type="file"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>

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

        <div className="block">
        <span className="block font-medium mb-1">
          Relative work in the Company:
        </span>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="relativeWork" value="yes" />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="relativeWork" value="no" />
            <span>No</span>
          </label>
        </div>
      </div>

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Submit Assessment
        </button>
      </form>
    </div>
  );
};

export default ClusterHeadForm;

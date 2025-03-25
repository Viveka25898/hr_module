/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"; // React Icon for Search
import blacklistData from "./dummyBlacklistData"; // Importing dummy data

const BlacklistSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic: Match search term with name, UIN, PAN, or location
  const filteredData = blacklistData.filter((staff) =>
    Object.values(staff).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by Name, UIN, PAN, Location..."
            className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500">
            <AiOutlineSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2">UIN</th>
              <th className="p-2">Name</th>
              <th className="p-2">PAN</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((staff) => (
                <tr
                  key={staff.UIN}
                  className={`text-center ${
                    staff.blacklisted ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  <td className="p-2">{staff.uin}</td>
                  <td className="p-2">{staff.name}</td>
                  <td className="p-2">{staff.pan}</td>
                  <td className="p-2">{staff.location}</td>
                  <td className="p-2 font-bold">
                    {staff.blacklisted ? "Blacklisted" : "Active"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlacklistSearch;

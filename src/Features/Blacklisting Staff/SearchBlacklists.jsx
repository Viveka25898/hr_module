/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import blacklistData from "./dummyBlacklistData";

const BlacklistSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const itemsPerPage = 10;

  const filteredData = blacklistData.filter((staff) =>
    Object.values(staff).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((staff) => (
                <tr
                  key={staff.uin}
                  className={`text-center ${
                    staff.blacklisted ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  <td className="p-2">{staff.uin}</td>
                  <td className="p-2">{staff.name}</td>
                  <td className="p-2">{staff.pan}</td>
                  <td className="p-2">{staff.location}</td>
                  <td className="p-2">
                    {staff.blacklisted && (
                      <button
                        onClick={() => setSelectedStaff(staff)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <AiOutlineEye className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                  <td className="p-2 font-bold">
                    {staff.blacklisted ? "Blacklisted" : "Active"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Blacklist/Warning Details</h2>
            <p><strong>Name:</strong> {selectedStaff.name}</p>
            <p><strong>UIN:</strong> {selectedStaff.uin}</p>
            <p><strong>PAN:</strong> {selectedStaff.pan}</p>
            <p><strong>Location:</strong> {selectedStaff.location}</p>
            <p><strong>Reason:</strong> {selectedStaff.reason}</p>
            {selectedStaff.document && (
              <p>
                <strong>Document:</strong> <a href={selectedStaff.document} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Document</a>
              </p>
            )}
            {selectedStaff.photo && (
              <div className="mt-4">
                <strong>Photo:</strong>
                <img src={selectedStaff.photo} alt="Staff" className="w-32 h-32 mt-2 rounded-lg border" />
              </div>
            )}
            <button
              onClick={() => setSelectedStaff(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlacklistSearch;
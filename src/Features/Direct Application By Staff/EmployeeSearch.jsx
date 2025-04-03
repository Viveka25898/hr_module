/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// Mock Data (50 entries for testing purposes)
const mockData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Employee ${index + 1}`,
  skills: `Skill ${Math.floor(Math.random() * 5) + 1}`,
  location: `Location ${Math.floor(Math.random() * 5) + 1}`,
  experience: `${Math.floor(Math.random() * 10) + 1} years`,
  jobType: Math.random() > 0.5 ? "Full-time" : "Part-time",
  availability: Math.random() > 0.5 ? "Available" : "Not Available",
}));

const EmployeeSearchPage = () => {
  const [filters, setFilters] = useState({
    name: "",
    skills: "",
    location: "",
    jobType: "",
    experience: "",
    availability: "",
  });
  const [filteredData, setFilteredData] = useState(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Items per page for pagination

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Function to apply filters
  const handleSearch = () => {
    const filtered = mockData.filter((employee) => {
      return (
        (filters.name === "" || employee.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.skills === "" || employee.skills.toLowerCase().includes(filters.skills.toLowerCase())) &&
        (filters.location === "" || employee.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.jobType === "" || employee.jobType.toLowerCase() === filters.jobType.toLowerCase()) &&
        (filters.experience === "" || employee.experience.toLowerCase().includes(filters.experience.toLowerCase())) &&
        (filters.availability === "" || employee.availability.toLowerCase() === filters.availability.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredData.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Employee Search</h2>
      </div>

      {/* Filters Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="skills"
            placeholder="Search by Skills"
            value={filters.skills}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Search by Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          />
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          <input
            type="text"
            name="experience"
            placeholder="Search by Experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          />
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-600">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Skills</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Experience</th>
              <th className="px-4 py-2 border">Job Type</th>
              <th className="px-4 py-2 border">Availability</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{employee.name}</td>
                <td className="px-4 py-2 border">{employee.skills}</td>
                <td className="px-4 py-2 border">{employee.location}</td>
                <td className="px-4 py-2 border">{employee.experience}</td>
                <td className="px-4 py-2 border">{employee.jobType}</td>
                <td className="px-4 py-2 border">{employee.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeSearchPage;

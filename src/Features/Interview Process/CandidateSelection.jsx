/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const candidatesData = [
  { 
    id: 1, 
    name: "John Doe", 
    experience: "5 Years", 
    skills: "React, Node.js", 
    feedback: "Good", 
    status: "Available", 
    remarks: "Strong in front-end, needs improvement in backend.",
    previousInterview: "Passed technical round, but salary expectations were high.",
    exitDetails: null,
    type: "Full-time",
    category: "Frontend"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    experience: "3 Years", 
    skills: "Python, Django", 
    feedback: "Blacklisted", 
    status: "Blacklisted", 
    remarks: "Unprofessional behavior in last interview.",
    previousInterview: "Rejected due to poor communication skills.",
    exitDetails: null,
    type: "Part-time",
    category: "Backend"
  },
  { 
    id: 3, 
    name: "Robert Brown", 
    experience: "7 Years", 
    skills: "Java, Spring Boot", 
    feedback: "Excellent", 
    status: "Available", 
    remarks: "Great leadership skills.",
    previousInterview: "Cleared technical and managerial rounds.",
    exitDetails: {
      company: "XYZ Ltd.",
      reason: "Better opportunity",
      interviewFeedback: "Good performer but left due to salary issues."
    },
    type: "Full-time",
    category: "Backend"
  }
];

const CandidateSelection = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [filters, setFilters] = useState({ type: "", category: "", skills: "" });
  const [filteredCandidates, setFilteredCandidates] = useState(candidatesData);
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const navigate=useNavigate()

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidates((prev) =>
      prev.some((c) => c.id === candidate.id) ? prev : [...prev, candidate]
    );
  };
  console.log(selectedCandidates);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filtered = candidatesData.filter((candidate) =>
      (filters.type === "" || candidate.type === filters.type) &&
      (filters.category === "" || candidate.category === filters.category) &&
      (filters.skills === "" || candidate.skills.toLowerCase().includes(filters.skills.toLowerCase()))
    );
    setFilteredCandidates(filtered);
  };

  const openModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Candidate Selection</h2>
      
      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-6 p-6 bg-green-100 rounded-lg">
        <div className="grid grid-cols-3 gap-6">
          <select name="type" onChange={handleFilterChange} className="p-3 border rounded w-full">
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          <input type="text" name="category" placeholder="Category" onChange={handleFilterChange} className="p-3 border rounded w-full" />
          <input type="text" name="skills" placeholder="Skills" onChange={handleFilterChange} className="p-3 border rounded w-full" />
        </div>
        <button type="submit" className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full">Filter Candidates</button>
      </form>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-green-50 border border-gray-300 rounded-lg text-sm">
          <thead>
            <tr className="bg-green-300 text-green-900 text-sm">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Exp</th>
              <th className="border px-4 py-2">Skills</th>
              <th className="border px-4 py-2">Feedback</th>
              <th className="border px-4 py-2">Remarks</th>
              <th className="border px-4 py-2">Interview</th>
              <th className="border px-4 py-2">Exit</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="text-center bg-white hover:bg-green-100 text-sm">
                <td className="border px-4 py-2">{candidate.name}</td>
                <td className="border px-4 py-2">{candidate.experience}</td>
                <td className="border px-4 py-2">{candidate.skills}</td>
                <td className={`border px-4 py-2 ${candidate.feedback === "Blacklisted" ? "text-red-500" : "text-green-700"}`}>{candidate.feedback}</td>
                <td className="border px-4 py-2"><button onClick={() => openModal("Remarks", candidate.remarks)} className="text-blue-600 hover:text-blue-800">Show Details</button></td>
                <td className="border px-4 py-2"><button onClick={() => openModal("Interview Details", candidate.previousInterview)} className="text-blue-600 hover:text-blue-800">Show Details</button></td>
                <td className="border px-4 py-2">
                  {candidate.exitDetails ? (
                    <button onClick={() => openModal("Exit Details", candidate.exitDetails)} className="text-blue-600 hover:text-blue-800">
                      <FiEye size={20} />
                    </button>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border px-4 py-2">{selectedCandidates.some(c => c.id === candidate.id) ? "Selected" :
                 <button onClick={() => handleSelectCandidate(candidate)} 
                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Select</button>}</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* *********************************Proceed Button**************************** */}
        {selectedCandidates.length > 0 && <button onClick={() => 
            navigate('/dashboard/TA/selected-candidate', { state: {selectedCandidates} })} 
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">Proceed</button>}

      </div>
      

      {/* **************************************************Modal************************************* */}
      {modalData && (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="bg-white p-6 rounded-lg w-[40%] max-w-lg shadow-xl border border-gray-200">
       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{modalTitle}</h2>
   
       {typeof modalData === "object" ? (
         <div className="space-y-4">
           <div>
             <h3 className="text-lg font-semibold text-gray-700">Company:</h3>
             <h4 className="text-base text-gray-900">{modalData.company}</h4>
           </div>
   
           <div>
             <h3 className="text-lg font-semibold text-gray-700">Reason:</h3>
             <p className="text-gray-800">{modalData.reason}</p>
           </div>
   
           <div>
             <h3 className="text-lg font-semibold text-gray-700">Interview Feedback:</h3>
             <p className="text-gray-800">{modalData.interviewFeedback}</p>
           </div>
         </div>
       ) : (
         <p className="text-gray-700 text-center">{modalData}</p>
       )}
   
       <button
         onClick={closeModal}
         className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all block mx-auto"
       >
         Close
       </button>
     </div>
   </div>
   
      )}
    </div>
  );
};

export default CandidateSelection;

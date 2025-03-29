import { useState } from "react";

const MyBlacklistedStaff = () => {
  const [blacklistedStaff, setBlacklistedStaff] = useState([
    { id: 1, name: "Rahul Sharma", age: 35, currentSite: "Pune", blacklistedBy: "Admin" },
    { id: 2, name: "Amit Verma", age: 40, currentSite: "Mumbai", blacklistedBy: "Admin" },
    { id: 3, name: "Neha Singh", age: 28, currentSite: "Delhi", blacklistedBy: "Admin" },
  ]);

  const handleUndoBlacklist = (id) => {
    const confirmUndo = window.confirm("Are you sure you want to undo blacklisting?");
    if (confirmUndo) {
      const updatedList = blacklistedStaff.filter((staff) => staff.id !== id);
      setBlacklistedStaff(updatedList);
      alert("Staff has been removed from the blacklist.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-600">My Blacklisted Staff</h2>
      {blacklistedStaff.length === 0 ? (
        <p className="text-gray-500">No blacklisted staff.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Current Site</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {blacklistedStaff.map((staff) => (
              <tr key={staff.id} className="border">
                <td className="p-2 border">{staff.name}</td>
                <td className="p-2 border">{staff.age}</td>
                <td className="p-2 border">{staff.currentSite}</td>
                <td className="p-2 border text-center">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleUndoBlacklist(staff.id)}
                  >
                    Undo Blacklisting
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBlacklistedStaff;
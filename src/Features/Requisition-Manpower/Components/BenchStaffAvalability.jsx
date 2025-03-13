/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import benchStaffData from "./benchData.json"

const BenchStaffAvailability = () => {
  const { siteName } = useParams(); // Get requestId from URL
  const decodedSiteName=decodeURIComponent(siteName.trim())
  console.log("Selected Site in Bench Staff Avalability:", decodedSiteName);
  console.log(benchStaffData);
  const [requestData, setRequestData] = useState(null);



  //Filter Staff based on the Seleted Site Address.
  const filteredStaff=benchStaffData.filter((staff)=>
    decodedSiteName.toLowerCase().includes(staff.address.toLowerCase())
)
console.log("Filter Satff:-",filteredStaff);

//   useEffect(() => {
//     // Fetch all manpower requests from localStorage
//     const storedRequests = JSON.parse(localStorage.getItem("manpowerRequests")) || [];

//     // Find the request with the matching requestId
//     const foundRequest = storedRequests.find(req => req.id === siteName);

//     // Set the found request data
//     setRequestData(foundRequest);
//   }, [siteName]);


  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Available Bench Staff for {decodedSiteName}</h2>

      {filteredStaff.length === 0 ? (
        <p className="text-gray-500">No Bench Staff Available</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Current Site</th>
              <th className="p-2 border">Distance (km)</th> {/* Add Distance Column */}
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{staff.name}</td>
                <td className="p-2 border">{staff.age}</td>
                <td className="p-2 border">{staff.address}</td>
                <td className="p-2 border">{staff.currentSite}</td>
                <td className="p-2 border">{staff.distance} km</td> {/* Show Distance */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BenchStaffAvailability;

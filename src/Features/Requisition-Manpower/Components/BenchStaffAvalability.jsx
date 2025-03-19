/* eslint-disable no-unused-vars */
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import benchStaffData from "./benchData.json"

// const BenchStaffAvailability = () => {
//   const { siteName } = useParams(); // Get requestId from URL
//   const decodedSiteName=decodeURIComponent(siteName.trim())
//   // console.log("Selected Site in Bench Staff Avalability:", decodedSiteName);
//   // console.log(benchStaffData);
//   const [requestData, setRequestData] = useState(null);
//   const [selectedStaff,setSelectedStaff]=useState(null)

//   const [benchStaffData, setBenchStaff] = useState([]);

//   // Fetch Bench Staff Data from Local Storage
//   useEffect(() => {
//     const storedStaff = JSON.parse(localStorage.getItem("benchStaff")) || [];
//     setBenchStaff(storedStaff);
//   }, []);

//   //Filter Staff based on the Seleted Site Address.
//   const filteredStaff=benchStaffData.filter((staff)=>
//     decodedSiteName.toLowerCase().includes(staff.address.toLowerCase())
// )
// console.log("Filter Satff:-",filteredStaff);

// //   useEffect(() => {
// //     // Fetch all manpower requests from localStorage
// //     const storedRequests = JSON.parse(localStorage.getItem("manpowerRequests")) || [];

// //     // Find the request with the matching requestId
// //     const foundRequest = storedRequests.find(req => req.id === siteName);

// //     // Set the found request data
// //     setRequestData(foundRequest);
// //   }, [siteName]);

// //Select The Staff

// const handleSelectStaff=(staff)=>{
//   setSelectedStaff(staff)
//   console.log("Selected Staff For Site:-",staff);

// }



//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-green-600">Available Bench Staff for {decodedSiteName}</h2>

//       {filteredStaff.length === 0 ? (
//         <p className="text-gray-500">No Bench Staff Available</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-green-600 text-white">
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Age</th>
//               <th className="p-2 border">Address</th>
//               <th className="p-2 border">Current Site</th>
//               <th className="p-2 border">Distance (km)</th> {/* Add Distance Column */}
//               <th className="p-2 border">Select For Your Site</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStaff.map((staff, index) => (
//               <tr key={index} className="border">
//                 <td className="p-2 border">{staff.name}</td>
//                 <td className="p-2 border">{staff.age}</td>
//                 <td className="p-2 border">{staff.address}</td>
//                 <td className="p-2 border">{staff.currentSite}</td>
//                 <td className="p-2 border">{staff.distance} km</td> {/* Show Distance */}
//                 <td className="p-2 border text-center">
//                   <button
//                   className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-700"
//                   onClick={()=>handleSelectStaff(staff)}
//                   >Select</button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BenchStaffAvailability;


/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRequests, sendRequest } from "./benchStaffSlice";
import { toast } from "react-toastify";

const BenchStaffAvailability = () => {
  const { siteName } = useParams(); // Get siteName from URL
  const cleanSiteName = decodeURIComponent(siteName.trim())
    .replace("Site ", "")
    .toLowerCase();
    console.log("Clean Site Name",cleanSiteName);
    const dispatch=useDispatch()

    //Get All Existing Request from Redux
    const existingRequest=useSelector((state)=>state.benchStaff.requests)
  //  State to store bench staff from LocalStorage
  const [benchStaffData, setBenchStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requestedStaff, setRequestedStaff] = useState(new Set()); // Store requested staff

  //  Get logged-in Manager Name
  const loggedInManager =
    JSON.parse(localStorage.getItem("userData"))?.username?.trim() || "";

  // Fetch Bench Staff Data from Local Storage on Component Mount
  // useEffect(() => {
  //   const storedStaff = JSON.parse(localStorage.getItem("benchStaff")) || [];
  //   console.log("📌 Stored Bench Staff Data:", storedStaff); // ✅ Debugging Step
  //   setBenchStaff(storedStaff);
  // }, []);


  // ********************Another Way************************
  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("benchStaff")) || [];
    setBenchStaff(storedStaff);
  }, []);

  // Load Requests from Redux 
  useEffect(()=>{
    dispatch(loadRequests())
  },[dispatch])
 
  
  // // ✅ Filter Staff Based on Address & Assigned Manager
  // const filteredStaff = benchStaffData.filter((staff) => {
  //   const staffAddress = staff.address.trim().toLowerCase();
  //   const staffManager = staff.assignedManager?.trim().toLowerCase() || "";
  
  //   return (
  //     staffAddress === cleanSiteName && // ✅ Match site name
  //     staffManager !== loggedInManager && // ✅ Exclude logged-in manager
  //     staffManager !== "" // ✅ Ensure staff is assigned to someone
  //   );
  // });

   // ✅ Filter Staff: Show only those NOT assigned to the logged-in manager
   const filteredStaff = benchStaffData.filter(
    (staff) => 
      staff.manager.trim().toLowerCase() !== loggedInManager.trim().toLowerCase() &&
      staff.address.toLowerCase() === cleanSiteName
  );

  //Check if the Staff is Already Requested
  useEffect(()=>{
    const requestedSet=new Set(
      existingRequest.filter((req)=>req.requestedBy===loggedInManager).map((req)=>req.requestedStaff)
    );
    setRequestedStaff(requestedSet)
  },[existingRequest,loggedInManager])

  // 🔹 Handle Select Staff (Open Confirmation Popup)
  const handleSelectStaff = (staff) => {
    setSelectedStaff(staff);
    setIsPopupOpen(true);
  };

  // 🔹 Handle Sending Request (Store in Local Storage)
  const handleSendRequest = () => {
   if(selectedStaff){
    dispatch(
      sendRequest({
        id:Date.now(),
        requestedBy:loggedInManager,
        requestedStaff:selectedStaff.name,
        manager:selectedStaff.manager,
        status:"Pending"
      })
    )
    setRequestedStaff((prev)=>new Set([...prev, selectedStaff.name]))
    toast.success("Request Sent Successfully!  ✅")
    setIsPopupOpen(false)
   }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        Available Bench Staff for {cleanSiteName}
      </h2>

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
              <th className="p-2 border">Assigned Manager</th>
              <th className="p-2 border">Distance (km)</th>
              <th className="p-2 border">Select For Your Site</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{staff.name}</td>
                <td className="p-2 border">{staff.age}</td>
                <td className="p-2 border">{staff.address}</td>
                <td className="p-2 border">{staff.currentSite}</td>
                <td className="p-2 border">{staff.manager}</td>
                <td className="p-2 border">{staff.distance} km</td>
                <td className="p-2 border text-center">
                 {
                  requestedStaff.has(staff.name)?(
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed" disabled>
                      Requested
                    </button>
                  ):(
                    <button
                    className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    onClick={() => handleSelectStaff(staff)}
                  >
                    Select
                  </button>
                  )
                 }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Confirmation Popup */}
      {isPopupOpen && selectedStaff && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Confirm Request
            </h2>
            <p className="text-gray-800 text-lg">
              Are you sure you want to request <b>{selectedStaff.name}</b>?
            </p>
            <p className="text-gray-700">
              This staff is currently assigned under{" "}
              <b>{selectedStaff.manager}</b>.
            </p>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setIsPopupOpen(false)}
              >
                No
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={handleSendRequest}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenchStaffAvailability;


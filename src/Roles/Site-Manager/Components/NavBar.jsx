// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import { setSelectedSite } from "../../../Features/Requisition-Manpower/Components/siteSlice"; 
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../../Auth/authSlice";
// import { toast } from "react-toastify";
// import ProfileImage from "../../../Auth/assets/profile-picture.jpg";

// const SiteManagerNavbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [site, setSite] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const selectedSite = useSelector((state) => state.site.selectedSite || "Select the Site");

//   //Sync Local Site When Store Update
//   useEffect(()=>{
//     setSite(selectedSite)
//   },[selectedSite])

//   // ****************************Logout Handle Submit********************
//   const handleLogout = () => {
//     dispatch(logout()); // Clear Redux state
//     navigate("/login"); // Redirect to login page
//     toast.success("Logout Successfully! 🚀", {
//       position: "top-right",
//       autoClose: 3000, // Closes after 3 sec
//     });
//     navigate("/");
//   };

//   // ********************************Site Selection***************************
//   const handleSelectSite = (e) => {
//    const newSite=e.target.value
//    console.log(newSite);
//    setSite(newSite)//Update Local State
//    dispatch(setSelectedSite(newSite))//Dispath to Store
//    localStorage.setItem("selectedSite",newSite)
//   };

//   console.log("Site Selected:-", site);

//   return (
//     <nav className="bg-green-600 text-white h-14 flex items-center justify-between px-4 md:px-8 shadow-md">
      
//       {/* Left: Site Selection Dropdown */}
//       <div className="w-1/3 flex items-center">
//         <select
//           name="site"
//           value={site}
//           onChange={handleSelectSite}
//           className="p-2 rounded-md bg-green-800 text-white w-52"
//         >
//           <option value="">Select Site</option>
//           <option value="Site Pune">Site Pune</option>
//           <option value="Site Mumbai">Site Mumbai</option>
//           <option value="Site C">Site C</option>
//           <option value="Site D">Site D</option>
//         </select>
//       </div>

//       {/* Center: Site Name & Location */}
//       <div className="hidden sm:flex flex-col items-center text-center">
//         <span className="text-base font-medium">Site Name:- {selectedSite}</span>
//       </div>

//       {/* Right: Profile Image + Dropdown */}
//       <div className="w-1/3 flex justify-end">
//         <div className="relative">
//           <div
//             className="flex items-center cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <img
//               src={ProfileImage} // Replace with actual image path
//               alt="Profile"
//               className="w-9 h-9 rounded-full border-2 border-white"
//             />
//           </div>

//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
//               <ul className="py-1">
//                 <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
//                 <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
//                 <li className="px-4 py-2 hover:bg-red-500 cursor-pointer" onClick={handleLogout}>
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default SiteManagerNavbar;


/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setSelectedSite,setAssignedSites } from "../../../Features/Requisition-Manpower/Components/siteSlice"; 
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Auth/authSlice";
import { toast } from "react-toastify";
import ProfileImage from "../../../Auth/assets/profile-picture.jpg";

const SiteManagerNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [site, setSite] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignedSites , selectedSite } = useSelector((state) => state.site || {});
  // console.log(assignedSites);


  //Sync Local Site When Store Update
  useEffect(()=>{
    const storedUserData= JSON.parse(localStorage.getItem("userData"))
    if(storedUserData?.assignedSites){
      dispatch(setAssignedSites(storedUserData.assignedSites))  //Set the Assigned Sites to the Redux
      const storedSite = localStorage.getItem("selectedSite");
      // Check if the stored site is valid for the logged-in manager
    if (!storedUserData.assignedSites.includes(storedSite)) {
      dispatch(setSelectedSite("")); // Reset selected site in Redux
      localStorage.removeItem("selectedSite"); // Remove from localStorage
    }
  
    }
  },[dispatch])

  // ****************************Logout Handle Submit********************
  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
    navigate("/login"); // Redirect to login page
    toast.success("Logout Successfully! 🚀", {
      position: "top-right",
      autoClose: 3000, // Closes after 3 sec
    });
    navigate("/");
  };

  // ********************************Site Selection***************************
  const handleSelectSite = (e) => {
   const newSite=e.target.value
   setSite(newSite)//Update Local State
   dispatch(setSelectedSite(newSite))//Dispath to Store
   localStorage.setItem("selectedSite",newSite)
  };

  return (
    <nav className="bg-green-600 text-white h-14 flex items-center justify-between px-4 md:px-8 shadow-md">
      
      {/* Left: Site Selection Dropdown */}
      <div className="w-1/3 flex items-center">
        <select
          name="site"
          value={selectedSite || ""}
          onChange={handleSelectSite}
          className="p-2 rounded-md bg-green-800 text-white w-52"
        >
          <option value="">Select Site</option>
          {
            assignedSites.length > 0 ? (
              assignedSites.map((site,index)=>(
                <option key={index} value={site}>{site}</option>
              ))
            ):(
              <option value="" disabled>No Sites Assigned</option>
            )
          }
        </select>
      </div>

      {/* Center: Site Name & Location */}
      <div className="hidden sm:flex flex-col items-center text-center">
        <span className="text-base font-medium">{selectedSite ? `Site Name: ${selectedSite}` : "Select a Site"}</span>
      </div>

      {/* Right: Profile Image + Dropdown */}
      <div className="w-1/3 flex justify-end">
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={ProfileImage} // Replace with actual image path
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-white"
            />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-red-500 cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SiteManagerNavbar;

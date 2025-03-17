/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import {useSelector} from "react-redux"
const MyStaff = () => {
    // const {benchStaff}=useSelector(state =>state.benchStaff)
    // const {userName}=useSelector(state => state.auth.userData) || {}

    // //getting Managers assigned Staff
    // const myStaff=benchStaff.filter(staff => staff.assignedManager === userName )

    // const [benchStaff,setBenchStaff]=useState([])
    // const [myStaff,setMyStaff]=useState([])
    // const userData=JSON.parse(localStorage.getItem("userData")) || {};
    // const {username}=userData

    // useEffect(()=>{
    //     const storedBenchStaff=JSON.parse(localStorage.getItem("benchStaff")) || [];
    //     const filteredStaff=storedBenchStaff.filter((staff)=>staff.assignedManager === username)
    //     setMyStaff(filteredStaff)
    // },[username])
    const [allStaff, setAllStaff] = useState([]);
  const [loggedInManager, setLoggedInManager] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setLoggedInManager(userData.username); // Set logged-in manager
  
      const storedStaff = JSON.parse(localStorage.getItem("benchStaff")) || {};
      
      // 🔹 Ensure correct manager staff filtering
      const assignedStaff = storedStaff[userData.username] || []; 
  
      setAllStaff(assignedStaff);
    }
  }, []); // ✅ No dependency on loggedInManager to prevent infinite loop

console.log("All:-",allStaff);
  return (
    <>
    <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-600">My Staff (Manager {loggedInManager})</h2>
        {
            allStaff.length === 0 ?(
                <p className="text-gray-500">No Staff Assigned to you.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Age</th>
                            <th className="p-2 border">Current Site</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allStaff.map((staff,index)=>(
                                <tr key={index} className="border">
                                     <td className="p-2 border">{staff.name}</td>
                                     <td className="p-2 border">{staff.age}</td>
                                     <td className="p-2 border">{staff.currentSite}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }

    </div>
    </>
   

  )
}

export default MyStaff
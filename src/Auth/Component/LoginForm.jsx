/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
;import "react-toastify/dist/ReactToastify.css";
import { useState } from "react"
import iSmartImg from "../assets/Web_Photo_Editor.jpg"
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
const LoginForm=(props)=>{
  // Declearing All the States 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRoleValue]=useState("")


  const dispatch=useDispatch()
  const navigate=useNavigate()

  // Navigate To Dashboard 
  
  const handleLoginFormSubmit=(e)=>{
          e.preventDefault()
          if(!role){
            alert("Please Select the Role!")
            return
          }
          // Fetch assigned sites for this user
              // const siteManagers = JSON.parse(localStorage.getItem("siteManagers")) || {};
              // const assignedSites = siteManagers[username] || [];
              // console.log(assignedSites);

              //Another Way
               // Dummy assigned sites for different Site Managers
                  const siteManagerSites = {
                    "A": ["Site Pune", "Site Mumbai"],
                    "B": ["Site Delhi", "Site Ahmedabad"]
                  };


                  //  Dummy Bench Staff Assigned to Site Managers
                  const benchStaff = [
                    { name: "Amit Sharma", age: 30, address: "Pune", currentSite: "Site B", assignedManager: "A", distance: 8 },
                    { name: "Rahul Verma", age: 28, address: "Mumbai", currentSite: "Site C", assignedManager: "B", distance: 12 },
                    { name: "Sneha Patil", age: 25, address: "Pune", currentSite: "Site A", assignedManager: "A", distance: 10 },
                    { name: "Priya Nair", age: 32, address: "Ahmedabad", currentSite: "Site D", assignedManager: "B", distance: 7 },
                    { name: "Vikram Desai", age: 29, address: "Pune", currentSite: "Site A", assignedManager: "A", distance: 6 },
                    { name: "Rajesh Gupta", age: 35, address: "Mumbai", currentSite: "Site C", assignedManager: "B", distance: 14 },
                    { name: "Amit Sharma2", age: 30, address: "Pune", currentSite: "Site B", assignedManager: "A", distance: 8 },
                    { name: "Rahul Verma2", age: 28, address: "Mumbai", currentSite: "Site C", assignedManager: "B", distance: 12 },
                    { name: "Sneha Patil2", age: 25, address: "Pune", currentSite: "Site A", assignedManager: "A", distance: 10 },
                    { name: "Priya Nair2", age: 32, address: "Delhi", currentSite: "Site D", assignedManager: "B", distance: 7 },
                    { name: "Vikram Desai2", age: 29, address: "Pune", currentSite: "Site A", assignedManager: "A", distance: 6 },
                    { name: "Rajesh Gupta2", age: 35, address: "Mumbai", currentSite: "Site C", assignedManager: "B", distance: 14 }
                  ];

                   // Store in Local Storage
                    if (!localStorage.getItem("benchStaff")) {
                      localStorage.setItem("benchStaff", JSON.stringify(benchStaff));
                    }


                  // const managerBenchStaff = {
                  //   A: [
                  //     { name: "Amit Sharma", age: 30, address: "Pune", assignedManager: "A" },
                  //     { name: "Sneha Patil", age: 25, address: "Pune", assignedManager: "A" }
                  //   ],
                  //   B: [
                  //     { name: "Rahul Verma", age: 28, address: "Delhi", assignedManager: "B" },
                  //     { name: "Priya Nair", age: 32, address: "Ahmedabad", assignedManager: "B" }
                  //   ]
                  // };

                  
           // Save user data to localStorage
              const userData = { username,
                                 role,
                                 assignedSites:siteManagerSites[username] || [],
                                //  benchStaff:managerBenchStaff[username] || []  //This is aving Bench staff for this Manager
                 };
              dispatch(login(userData));
              localStorage.setItem("userData",JSON.stringify(userData))
              localStorage.setItem("showLoginToast", "true");

          //Routing on the basis of Role.

          //************************************For Site Managaer********************************************** */
              if(role === "site-manager") navigate("/dashboard/site-manager")
                // ****************************************For Supervisor***************************************
                else if(role === "supervisor") navigate("/dashboard/supervisor")
                  //For Toaster
                  localStorage.setItem("showLoginToast", "true");

  }



    return(
        <>
          {/* This is Main Div  */}

        <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Part: Image Section (Hidden on Small Screens) */}
              <div className="w-full lg:w-1/2 h-64 lg:h-auto flex items-center justify-center bg-gray-200">
                        <img
                        src={iSmartImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                        />
              </div>

      {/* Right Part: Login Form */}



      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-sm text-center">
                <h2 className="text-5xl font-bold text-green-700 mb-8 font-mulish">{props.heading}</h2>
                  <form className="space-y-4" onSubmit={handleLoginFormSubmit}>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mulish"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mulish"
                      />
                      <select
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={role} onChange={(e) => setRoleValue(e.target.value)} required>
                            <option value="" className="font-mulish">Select Role</option>
                            <option value="site-manager" className="font-mulish">Site Manager</option>
                            <option value="hr-admin" className="font-mulish">HR Admin</option>
                            <option value="supervisor" className="font-mulish">Supervisor</option>

                            
                      </select>

                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-800 transition font-mulish"                       
                      >
                      Login
                      </button>
                  </form>
            </div>
      </div>
    </div>
        </>
    )
}
export default LoginForm
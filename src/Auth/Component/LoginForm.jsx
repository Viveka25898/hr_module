/* eslint-disable react/prop-types */
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
    dispatch(login({username,role}))

    //Routing on the basis of Role.
    if(role === "site-manager") navigate("/dashboard/site-manager")

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
                <h2 className="text-2xl font-semibold mb-6">{props.heading}</h2>
                  <form className="space-y-4" onSubmit={handleLoginFormSubmit}>
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select value={role} onChange={(e) => setRoleValue(e.target.value)} required>
                            <option value="">Select Role</option>
                            <option value="site-manager">Site Manager</option>
                            <option value="hr-admin">HR Admin</option>
                      </select>

                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"                       
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
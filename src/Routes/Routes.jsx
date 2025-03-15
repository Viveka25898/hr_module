/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {createBrowserRouter, Outlet} from "react-router-dom"
import AuthLayout from "../Auth/AuthLayout"
import Login from "../Auth/Pages/Login"
import Home from "../Roles/Site-Manager/Components/Home"
import ManpowerRequestForm from "../Features/Requisition-Manpower/Components/ManPowerRequestForm"
import SiteManagerDashboard from "../Roles/Site-Manager/Pages/SiteManagerDashboard"
import ProtectedRoute from "./ProtectedRoutes"


// **************************Supervisor*****************************
import SupervisorDashboard from "../Roles/Supervisor/Pages/SupervisorDashboard"
import SuervisorHome from "../Roles/Supervisor/Components/SupervisorHome"
import { useEffect } from "react"
import { login } from "../Auth/authSlice"
import { useDispatch } from "react-redux"
import SupervisorRequests from "../Roles/Supervisor/Components/SupervisorsRequest"
import MyRequests from "../Features/Requisition-Manpower/Components/MyRequests"
import DashBoardLayout from "../Roles/Site-Manager/Components/DashBoardLayout"
import BenchStaffAvalability from "../Features/Requisition-Manpower/Components/BenchStaffAvalability"
import MyStaff from "../Features/Requisition-Manpower/Components/MyStaff"
import Requests from "../Features/Requisition-Manpower/Components/Requests"



// const SiteManagerLayout = () => (
//     <SiteManagerDashboard>
//       <Outlet /> {/* This will render nested routes */}
//     </SiteManagerDashboard>
//   );


//   const SupervisorLayout=()=>{
//   <SupervisorDashboard>
//         <Outlet/>
//   </SupervisorDashboard>
// }

  
  export const router = createBrowserRouter([
    
    {
      path: "/login",
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      ),
     errorElement: <h1>Page Not Found!</h1>, // Graceful error handling
    },
    {
      path: "/dashboard/site-manager",
      element: (
        <ProtectedRoute allowedRoles={["site-manager"]}>
          <DashBoardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> }, // Default Page
        { path: "manpower-request", element: <ManpowerRequestForm /> },
        { path: "my-staff", element: <MyStaff /> },
        { path: "requests", element: <Requests /> },
        { path: "my-requests", element: <MyRequests /> },
        {path:"bench-staff/:siteName", element:<BenchStaffAvalability/>},
      ],
      
      errorElement: <h1>Dashboard Not Found!</h1>, // Error handling for dashboard routes
    },
    {
      path:"/dashboard/supervisor",
      element:(
        <ProtectedRoute allowedRoles={["supervisor"]}>
          <SupervisorDashboard />
        </ProtectedRoute>
      ),
      children:[
        {
          index: true, // Default route when "/dashboard/supervisor" is visited
          element: <SuervisorHome />,
        },
        {
          path:"requests",
          element:<SupervisorRequests/>
        }
      ]
    }
  ]);
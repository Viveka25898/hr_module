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



const SiteManagerLayout = () => (
    <SiteManagerDashboard>
      <Outlet /> {/* This will render nested routes */}
    </SiteManagerDashboard>
  );


  const SupervisorLayout=()=>{
  <SupervisorDashboard>
        <Outlet/>
  </SupervisorDashboard>
}
  
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
          <SiteManagerDashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true, // Default route when "/dashboard/site-manager" is visited
          element: <Home />,
        },
        {
          path: "manpower-request", // Nested properly
          element: <ManpowerRequestForm />,
        },
      ],
      
      errorElement: <h1>Dashboard Not Found!</h1>, // Error handling for dashboard routes
    },
    {
      path:"/dashboard/supervisor",
      element:(
        <ProtectedRoute allowedRoles={["supervisor"]}>
          <SupervisorDashboard />
        </ProtectedRoute>
      )
    }
  ]);
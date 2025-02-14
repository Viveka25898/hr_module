import {createBrowserRouter, Outlet} from "react-router-dom"
import AuthLayout from "../Auth/AuthLayout"
import Login from "../Auth/Pages/Login"
import Home from "../Roles/Site-Manager/Components/Home"
import ManpowerRequestForm from "../Features/Requisition-Manpower/Components/ManPowerRequestForm"
import SiteManagerDashboard from "../Roles/Site-Manager/Pages/SiteManagerDashboard"
import ProtectedRoute from "./ProtectedRoutes"

const SiteManagerLayout = () => (
    <SiteManagerDashboard>
      <Outlet /> {/* This will render nested routes */}
    </SiteManagerDashboard>
  );
  
  export const router = createBrowserRouter([
    {
      path: "/",
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
          <SiteManagerLayout />
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
  ]);
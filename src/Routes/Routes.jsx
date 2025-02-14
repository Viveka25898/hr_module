import {createBrowserRouter} from "react-router-dom"
import AuthLayout from "../Auth/AuthLayout"
import SiteManagerLogin from "../Auth/Pages/SiteManagerLogin"
import Home from "../Roles/Site-Manager/Components/Home"
import ManpowerRequestForm from "../Features/Requisition-Manpower/Components/ManPowerRequestForm"
import SiteManagerDashboard from "../Roles/Site-Manager/Pages/SiteManagerDashboard"
export const router=createBrowserRouter([
    {
        path:"/",
        element:<AuthLayout><SiteManagerLogin/></AuthLayout>
    },
    {
        path:"/dashboard/site-manager",
        element:<SiteManagerDashboard/>,
        children:[
            {
                path:"",
                 element:<Home/>,
            },
            {
                path:"manpower-request",
                element:<ManpowerRequestForm/>
            }
        ]
    }
])
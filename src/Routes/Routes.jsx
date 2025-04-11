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
import BenchStaffDashboard from "../Roles/Bench-Staff/Pages/BenchStaffDashboard"
import BenchStaffHome from "../Roles/Bench-Staff/Components/BenchStaffHome"
import BenchStaffClaim from "../Roles/Bench-Staff/Components/BenchStaffClaim"
import ConveyanceRequests from "../Features/Requisition-Manpower/Components/ConveyanceRequests"
import HrDashboard from "../Roles/HR/Pages/HrDashboard"
import HrHome from "../Roles/HR/Components/HrHome"
import StepperForm from "../Features/In Office Data Upload/Components/StepperForm"
import SearchBlacklists from "../Features/Blacklisting Staff/SearchBlacklists"
import AdminDashboard from "../Roles/Admin/Pages/AdminDashboard"
import AdminHome from "../Roles/Admin/Components/AdminHome"
import BlacklistForm from "../Features/Blacklisting Staff/BlacklistEntryForm"
import HrHeadDashboard from "../Roles/HR Head/Pages/HrHeadDashboard"
import HrHeadHome from "../Roles/HR Head/Components/HrHeadHome"
import BlacklistApproval from "../Features/Blacklisting Staff/BlacklistApproval"
import UndoRequests from "../Features/Blacklisting Staff/UndoRequests"
import MyBlacklistedStaff from "../Features/Blacklisting Staff/MyBlacklistedStaff"
import CandidateDashboard from "../Roles/Candidate/Pages/CandidateDashboard"
import CandidateHome from "../Roles/Candidate/Components/CandidateHome"
import CandidateRegistration from "../Features/Direct Application By Staff/CandidatRegistration"
import CandidateVerification from "../Features/Direct Application By Staff/CandidateVerification"
import DocumentsUpload from "../Features/Direct Application By Staff/DocumentsUpload"
import JobRequirement from "../Features/Direct Application By Staff/JobRequirement"
import EmailAndAadharVerification from "../Features/Direct Application By Staff/EmailAndAadharVerification"
import UINGeneration from "../Features/Direct Application By Staff/UINGeneration"
import VendorDashboard from "../Roles/Vendor/Pages/VendorDashboard"
import VendorHome from "../Roles/Vendor/Components/VendorHome"
import VendorRegistration from "../Features/Direct Application By Staff/VendorRegistration"
import EmployeeSearch from "../Features/Direct Application By Staff/EmployeeSearch"
import TADashboard from "../Roles/TA/Pages/TADashboard"
import TAHome from "../Roles/TA/Components/TAHome"
import CandidateSelection from "../Features/Interview Process/CandidateSelection"
import SelectedCandidate from "../Features/Interview Process/SelectedCandidate"
import InterviewFormModal from "../Features/Interview Process/InterviewFormModal"
import InterviewSetup from "../Features/Interview Process/InterviewSetup"
import InterviewTable from "../Features/Interview Process/InterviewTable"
import AssignPanelist from "../Features/Interview Process/AssignedPanalist"
import TodayInterviews from "../Features/Interview Process/TodayInterview"
import InterviewProgress from "../Features/Interview Process/IntreviewProgress"
import FormSelector from "../Features/Interview Process/Components/InterviewForms/FormSelector"
import CandidateReviewPage from "../Features/Interview Process/ReviewCandidate"
import OfferLetterPage from "../Features/Interview Process/OfferLetterPage"
import DeemedSupervisorDashboard from "../Roles/Deemed Supervisor/Pages/DeemedSupervisorDashboard"
import DeemedSupervisorHome from "../Roles/Deemed Supervisor/Components/DeemedSupervisorHome"
import DeemedSupervisorApprovalPage from "../Features/Interview Process/DeemedSupervisorApprovalPage"
import HODDashboard from "../Roles/HOD/Pages/HODDashboard"
import HODHome from "../Roles/HOD/Components/HODHome"
import HODApprovalPage from "../Features/Interview Process/HODApprovalPage"
import HRHeadApprovalPage from "../Features/Interview Process/HRHeadApprovalPage"
import TAOfferManagementPage from "../Features/Interview Process/TAOfferManagement"
import SendOfferPage from "../Features/Interview Process/SendOfferPage"
import CandidateOfferView from "../Features/Interview Process/CandidateOfferView"




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
        {path:"conveyance-requests",element:<ConveyanceRequests/>},
        {path:"blacklist-staff",element:<BlacklistForm/>}
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
    },



    // ********************Bench Staff************************************
    {
      path:"/dashboard/bench-staff",
      element:(
        <ProtectedRoute allowedRoles={["benchstaff"]}>
          <BenchStaffDashboard />
        </ProtectedRoute>
      ),
      children:[
        {
          index: true, // Default route when "/dashboard/supervisor" is visited
          element: <BenchStaffHome />,
        },
        {
          path:"conveyance-claim",
          element:<BenchStaffClaim/>
        }
      ]
    },

    // ***************************************HR***************************************************
    {
      path:"/dashboard/hr",
      element:(
        <ProtectedRoute allowedRoles={["hr"]}>
          <HrDashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<HrHome/>
        },
        {
          path:"staff-form",
          element:<StepperForm/>
        },
        {
          path:"search-blacklisted",
          element:<SearchBlacklists/>
        }
      ]
    },
    // ******************************************Admin*************************************
    {
      path:"/dashboard/admin",
      element:(
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<AdminHome/>
        },
        {
          path:"blacklist-staff",
          element:<BlacklistForm/>
        },
        {
          path:"my-blacklisted-staff",
          element:<MyBlacklistedStaff/>
        },
        {
          path:"undo-requests",
          element:<UndoRequests/>
        }
      ]
    },
    // ***************************HR-Head*****************************
    {
      path:"/dashboard/hr-head",
      element:(
        <ProtectedRoute allowedRoles={["hr-head"]}>
          <HrHeadDashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<HrHeadHome/>
        },
        {
          path:"blacklist-approval",
          element:<BlacklistApproval/>
        },
        {
          path:"approval-from-hod",
          element:<HRHeadApprovalPage/>
        }
      ]
    },
    // ***************************************Candidate********************************************
    {
      path:"/dashboard/candidate",
      element:(
        <ProtectedRoute allowedRoles={["candidate"]}>
          <CandidateDashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<CandidateHome/>
        },
        {
          path:"registration",
          element:<CandidateRegistration/>
        },
        {
          path:"candidate-verification",
          element:<CandidateVerification/>
        },
        {
          path:"document-upload",
          element:<DocumentsUpload/>
        },
        {
          path:"job-requirement",
          element:<JobRequirement/>
        },
        {
          path:"email-aadhar-verification",
          element:<EmailAndAadharVerification/>
        },
        {
          path:"uin",
          element:<UINGeneration/>
        },
        {
          path:"view-offer",
          element:<CandidateOfferView/>
        }
      ]
    },

    // ************************************************************Vendor*********************************************************
    {
      path:"/dashboard/vendor",
      element:(
        <ProtectedRoute allowedRoles={["vendor"]}>
          <VendorDashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<VendorHome/>
        },
        {
          path:"register",
          element:<VendorRegistration/>
        },
        {
          path:"employee-search",
          element:<EmployeeSearch/>
        }
      ]
    },
    // ******************************************************TA*******************************************************************
    {
      path:"/dashboard/TA",
      element:(
        <ProtectedRoute allowedRoles={["TA"]}>
          <TADashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<TAHome/>
        },
        {
          path:"select-candidate",
          element:<CandidateSelection/>
        },
        {
          path:"selected-candidate",
          element:<SelectedCandidate/>
        },
        {
          path:"interview-setup",
          element:<InterviewSetup/>
        },
        {
          path:"interviews-table",
          element:<InterviewTable/>
        },
        {
          path:"assign-panelist",
          element:<AssignPanelist/>
        },
        {
          path:"todays-interview",
          element:<TodayInterviews/>
        },
        {
          path:"interview-progress",
          element:<InterviewProgress/>
        },
        {
          path:"form-selector",
          element:<FormSelector/>
        },
        {
          path:"review-candidate",
          element:<CandidateReviewPage/>
        },
        {
          path:"offer-letter",
          element:<OfferLetterPage/>
        },
        {
          path:"offer-management",
          element:<TAOfferManagementPage/>
        },
        {
          path:"send-offer",
          element:<SendOfferPage/>
        }
      ]
    },
    // ***************************************Deemed Supervisor****************************************************
    {
      path:"/dashboard/deemedsupervisor",
      element:(
        <ProtectedRoute allowedRoles={["deemedsupervisor"]}>
          <DeemedSupervisorDashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<DeemedSupervisorHome/>
        },
        {
          path:"deemed-approval",
          element:<DeemedSupervisorApprovalPage/>
        }
      ]
    },
    // ********************************************HOD********************************************************
    {
      path:"/dashboard/hod",
      element:(
        <ProtectedRoute allowedRoles={["hod"]}>
          <HODDashboard/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<HODHome/>
        },
        {
          path:"approval-from-deemed",
          element:<HODApprovalPage/>
        }
      ]
    },

  ]);
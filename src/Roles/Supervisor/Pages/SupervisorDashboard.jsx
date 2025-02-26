/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import SupervisorDashboardLayout from "../Components/SupervisorDashboardLayout";

const SupervisorDashboard = () => {
  // const user = useSelector((state) => state.auth.user);
  // const role=useSelector((state)=>state.auth.role)
  // console.log("Console from Supervisor", user,role);
  return (
    <>
    <SupervisorDashboardLayout/>
    </>
  )
}

export default SupervisorDashboard
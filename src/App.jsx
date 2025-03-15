/* eslint-disable no-unused-vars */
import {RouterProvider} from "react-router-dom"
import {router} from "./Routes/Routes.jsx" 
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./Auth/authSlice.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore login session on refresh
    localStorage.setItem(
      "siteManagers",
      JSON.stringify({
        managerA: ["Site A", "Site B","Site C","Site D"],
        managerB: ["Site E", "Site F","Site G","Site H"],
      })
    );
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(login(storedUser)); // Fix: Rehydrate user state in Redux
    }
  }, [dispatch]);
  
  return <>
  <ToastContainer/>
 <RouterProvider router={router}/>  
  </>;
}

export default App;

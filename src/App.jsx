/* eslint-disable no-unused-vars */
import {RouterProvider} from "react-router-dom"
import {router} from "./Routes/Routes.jsx" 
import { ToastContainer } from "react-toastify";
function App() {
  

  return <>
  <ToastContainer/>
 <RouterProvider router={router}/>  
  </>;
}

export default App;

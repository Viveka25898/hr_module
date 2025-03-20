/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
// import manpowerReducer from "./Features/Requisition-Manpower/Components/manpowerSlice"
import siteReducer from "./Features/Requisition-Manpower/Components/siteSlice";
 import benchStaffReducer from "./Features/Requisition-Manpower/Components/benchStaffSlice"
 import conveyanceReducer from "./Features/Requisition-Manpower/Components/conveyanceSlice.jsx"

const store = configureStore({
  reducer: {
    auth: authReducer,
    // manpower:manpowerReducer
    site: siteReducer,
    benchStaff: benchStaffReducer,
    conveyance:conveyanceReducer,
  },
});

export default store;

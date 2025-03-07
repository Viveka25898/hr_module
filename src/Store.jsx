/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
// import manpowerReducer from "./Features/Requisition-Manpower/Components/manpowerSlice"
import siteReducer from "./Features/Requisition-Manpower/Components/siteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // manpower:manpowerReducer
    site: siteReducer
  },
});

export default store;

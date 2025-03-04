/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import manpowerReducer from "./Features/Requisition-Manpower/Components/manpowerSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    manpower:manpowerReducer
  },
});

export default store;

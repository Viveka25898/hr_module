// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
//   assignedSites: JSON.parse(localStorage.getItem("loggedInUser"))?.assignedSites || [],
//   selectedSite: "",
// };

// const siteManagerSlice = createSlice({
//   name: "siteManager",
//   initialState,
//   reducers: {
//     loginManager: (state, action) => {
//       state.loggedInUser = action.payload;
//       state.assignedSites = action.payload.assignedSites;
//       state.selectedSite = state.assignedSites[0] || "";
//       localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
//     },
//     logoutManager: (state) => {
//       state.loggedInUser = null;
//       state.assignedSites = [];
//       state.selectedSite = "";
//       localStorage.removeItem("loggedInUser");
//     },
//     setSelectedSite: (state, action) => {
//       state.selectedSite = action.payload;
//     },
//   },
// });

// export const { loginManager, logoutManager, setSelectedSite } = siteManagerSlice.actions;
// export default siteManagerSlice.reducer;

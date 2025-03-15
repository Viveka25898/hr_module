import { createSlice } from "@reduxjs/toolkit";
const userData=JSON.parse(localStorage.getItem("userData")) || {}

const initialState = {
  assignedSites: userData.assignedSites || [],  // Load assigned sites from localStorage
  selectedSite: localStorage.getItem("selectedSite") || "", // Load from localStorage if available
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setSelectedSite: (state, action) => {
      state.selectedSite = action.payload;
      localStorage.setItem("selectedSite", action.payload); // Save to localStorage
    },
    setAssignedSites:(state,action)=>{
      state.assignedSites=action.payload
      localStorage.setItem("assignedSites", JSON.stringify(action.payload)); // Persist assigned sites
    }
  },
});

export const { setSelectedSite, setAssignedSites } = siteSlice.actions;
export default siteSlice.reducer;

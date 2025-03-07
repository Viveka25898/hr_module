import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { setSelectedSite } = siteSlice.actions;
export default siteSlice.reducer;

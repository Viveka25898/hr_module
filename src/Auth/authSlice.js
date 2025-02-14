import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: null, // Stores the user's role after login
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.role = null;
    },
  },
});

export const { setRole, logout } = authSlice.actions;
export default authSlice.reducer;

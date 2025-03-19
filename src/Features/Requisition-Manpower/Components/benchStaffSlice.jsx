import { createSlice } from "@reduxjs/toolkit";

// Load from Local Storage initially
const loadFromLocalStorage = (key, defaultValue = []) => {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
};

// Initial State
const initialState = {
  benchStaff: loadFromLocalStorage("benchStaff"), // All Bench Staff Data
  requests: loadFromLocalStorage("benchStaffRequests"), // All Requests
};

const benchStaffSlice = createSlice({
  name: "benchStaff",
  initialState,
  reducers: {
    // ✅ Load Bench Staff from Local Storage (Used when logging in)
    loadBenchStaff: (state) => {
      state.benchStaff = loadFromLocalStorage("benchStaff");
    },

    // ✅ Load Requests from Local Storage (Used when logging in)
    loadRequests: (state) => {
      state.requests = loadFromLocalStorage("benchStaffRequests");
    },

    // ✅ Send Request for Bench Staff
    sendRequest: (state, action) => {
      const newRequest = action.payload;
      state.requests.push(newRequest);
      localStorage.setItem("benchStaffRequests", JSON.stringify(state.requests));
    },

    // ✅ Accept Request (Move staff from one manager to another)
    acceptRequest: (state, action) => {
      const { requestId } = action.payload;
      const request = state.requests.find((req) => req.id === requestId);

      if (request) {
        // Move staff to new manager
        const staffIndex = state.benchStaff.findIndex((s) => s.name === request.requestedStaff);
        if (staffIndex !== -1) {
          state.benchStaff[staffIndex].manager = request.requestedBy;
        }

        // Update request status
        request.status = "Accepted";

        // Save to Local Storage
        localStorage.setItem("benchStaff", JSON.stringify(state.benchStaff));
        localStorage.setItem("benchStaffRequests", JSON.stringify(state.requests));
      }
    },

    // ✅ Reject Request (Update status only)
    rejectRequest: (state, action) => {
      const { requestId } = action.payload;
      const request = state.requests.find((req) => req.id === requestId);

      if (request) {
        request.status = "Rejected";
        localStorage.setItem("benchStaffRequests", JSON.stringify(state.requests));
      }
    },
  },
});

// Export Actions
export const { loadBenchStaff, loadRequests, sendRequest, acceptRequest, rejectRequest } =
  benchStaffSlice.actions;

// Export Reducer
export default benchStaffSlice.reducer;

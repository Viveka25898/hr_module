import { createSlice } from "@reduxjs/toolkit";

// ✅ Function to Load Data from Local Storage
const loadFromLocalStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`❌ Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// ✅ Initial State
const initialState = {
  claims: loadFromLocalStorage("conveyanceClaims"),
};

const conveyanceSlice = createSlice({
  name: "conveyance",
  initialState,
  reducers: {
    // ✅ Load Claims from Local Storage
    loadClaims: (state) => {
      state.claims = loadFromLocalStorage("conveyanceClaims");
      console.log("🔍 Loaded Claims:", state.claims);
    },

    // ✅ Submit Claim
    submitClaim: (state, action) => {
      const newClaim = action.payload;
      state.claims.push(newClaim);
      localStorage.setItem("conveyanceClaims", JSON.stringify(state.claims));
    },

    // ✅ Approve Claim
    approveClaim: (state, action) => {
      const claimId = action.payload;

      // ✅ Ensure claims array exists
      if (!Array.isArray(state.claims)) {
        console.error("❌ claims is not an array:", state.claims);
        state.claims = [];
      }

      const index = state.claims.findIndex((claim) => claim.id === claimId);
      if (index !== -1) {
        state.claims[index].status = "Approved";
        localStorage.setItem("conveyanceClaims", JSON.stringify([...state.claims]));
      } else {
        console.warn(`⚠️ Claim with ID ${claimId} not found.`);
      }
    },

    // ✅ Reject Claim
    rejectClaim: (state, action) => {
      const claimId = action.payload;

      // ✅ Ensure claims array exists
      if (!Array.isArray(state.claims)) {
        console.error("❌ claims is not an array:", state.claims);
        state.claims = [];
      }

      const index = state.claims.findIndex((claim) => claim.id === claimId);
      if (index !== -1) {
        state.claims[index].status = "Rejected";
        localStorage.setItem("conveyanceClaims", JSON.stringify([...state.claims]));
      } else {
        console.warn(`⚠️ Claim with ID ${claimId} not found.`);
      }
    },
  },
});

export const { loadClaims, submitClaim, approveClaim, rejectClaim } = conveyanceSlice.actions;
export default conveyanceSlice.reducer;

// /* eslint-disable no-unused-vars */
// import {createSlice} from "@reduxjs/toolkit"


// const initialState={
//     benchStaff: JSON.parse(localStorage.getItem("benchStaff")) || [],  //This is Staff under Managers
//     benchStaffRequests: JSON.parse(localStorage.getItem("benchStaffRequests")) || []  //Requests
// }   

// const benchStaffSlice=createSlice({
//     name:"benchStaff",
//     initialState,
//     reducers:{
//                 //Set Bench Staff Reducer
//                 setBenchStaff:(state,action)=>{
//                     state.benchStaff=action.payload
//                     localStorage.setItem("benchStaff",JSON.stringify(action.payload))
//                 },

//                 //Add Bench Staff request
//                 addBenchStaffRequest:(state,action)=>{
//                     state.benchStaffRequests.push(action.payload)
//                     localStorage.setItem("benchStaffRequests", JSON.stringify(state.benchStaffRequests));
//                 },
//                 //Accept the Bench Staff Request
//                 acceptBenchStaffRequest:(state,action)=>{
//                     const {requestId,newManager}=action.payload
//                     const requestIndex = state.benchStaffRequests.findIndex(req => req.id === requestId);
//                     if(requestIndex !== -1){
//                         const transferredStaff=state.benchStaffRequests[requestIndex].staff
//                         state.benchStaff = state.benchStaff.map(staff =>
//                             staff.name === transferredStaff.name ? { ...staff, assignedManager: newManager } : staff
//                           );
//                           state.benchStaffRequests.splice(requestIndex, 1);
//                             localStorage.setItem("benchStaff", JSON.stringify(state.benchStaff));
//                             localStorage.setItem("benchStaffRequests", JSON.stringify(state.benchStaffRequests));
//                     }

//                 },
//                 //Delete The request
//                 deleteBenchStaffRequest:(state,action)=>{
//                     state.benchStaffRequests = state.benchStaffRequests.filter(req => req.id !== action.payload);
//                     localStorage.setItem("benchStaffRequests", JSON.stringify(state.benchStaffRequests));

//                 }
//              }
// })

// export const { setBenchStaff, addBenchStaffRequest, acceptBenchStaffRequest, deleteBenchStaffRequest } = benchStaffSlice.actions;
// export default benchStaffSlice.reducer;
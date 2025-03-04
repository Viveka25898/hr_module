import {createSlice} from "@reduxjs/toolkit"
const initialState={
    requests:[]
};
const manpowerSlice=createSlice({
    name:"manpower",
    initialState,
    reducers:{
        submitRequest:(state,action)=>{
            state.requests.push(action.payload)
        }
    }

})
export const {submitRequest}=manpowerSlice.actions
export default manpowerSlice.reducer
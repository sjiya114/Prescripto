import { createSlice } from "@reduxjs/toolkit";
const initialState={
    doctors:[],
}
export const DoctorSlice=createSlice({
    name:'doctors',
     initialState,
    reducers:
    {
     getDoctors:(state,action)=>
     {
        state.doctors=action.payload;
     }
    }
})
export default DoctorSlice.reducer;
export const {getDoctors}=DoctorSlice.actions;















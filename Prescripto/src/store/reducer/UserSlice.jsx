import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:localStorage.getItem("user"),
    token:localStorage.getItem("token"),
    appointments:[]
}
export const UserSlice=createSlice({
    name:'users',
     initialState,
    reducers:
    {
     login:(state,action)=>
     {
        state.user=action.payload.user;
        localStorage.setItem("token",action.payload.token);
        localStorage.setItem("user",action.payload.user);
        state.token=action.payload.token;
     },
     signup:(state,action)=>
     {
        state.user=action.payload.user;
        state.token=action.payload.token;
     },
     auth:(state,action)=>
     {
       state.user=action.payload.user;
       localStorage.setItem("user",action.payload.user);
     },
     updateProfile:(state,action)=>
     {
      state.user=action.payload;
     },
     getAppointments:(state,action)=>
     {
       state.appointments=action.payload;
     },
     bookAppointments:(state,action)=>
     {
      state.appointments.push(action.payload);
     },
     getUserProfile:(state,action)=>
     {
      state.user=action.payload.user;
      state.token=action.payload.token;
     },
     cancelAppointment:(state,action)=>
     {
      state.appointments=action.payload;
     },
     logout:(state,action)=>
     {
        state.user=null;
        state.token=null;
         localStorage.clear("tokend");
        localStorage.clear("doctor");
     }
    }
})
export default UserSlice.reducer;
export const {login,signup,auth,logout,updateProfile,getAppointments,bookAppointments,cancelAppointment,getUserProfile}=UserSlice.actions;


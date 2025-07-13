import { createSlice } from "@reduxjs/toolkit";
const initialState={
    tokena:localStorage.getItem("tokena"),
}
export const AdminAuthSlice=createSlice({
    name:'adminAuth',
     initialState,
    reducers:
    {
     login:(state,action)=>
     {
        state.tokena=action.payload.token;
        localStorage.setItem("tokena",action.payload.token);
     },
      logout:(state,action)=>
     {
        state.admin=null;
        state.tokena=null;
        localStorage.clear("tokena");
        localStorage.clear("admin");
     }
    }
})
export default AdminAuthSlice.reducer;
export const {login,logout}=AdminAuthSlice.actions;



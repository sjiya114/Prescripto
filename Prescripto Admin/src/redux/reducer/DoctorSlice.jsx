import { createSlice } from "@reduxjs/toolkit";
const initialState={
    tokend:localStorage.getItem("tokend"),
    appointmentsd:[],
    docId:null,
    doc:{},
     dashdata:{}
}

export const DoctorSlice=createSlice({
    name:'doctor',
     initialState,
    reducers:
    {
     login:(state,action)=>
     {
        state.tokend=action.payload.token;
        localStorage.setItem("tokend",action.payload.token);
        state.docId=action.payload.docId;
        state.doc=action.payload.doctor;

     },
    getDoctorAppointments:(state,action)=>
    {
        state.appointmentsd=action.payload.appointments;
    },
    editDoctor:(state,action)=>
    {
      state.doc=action.payload;
    },
      logout:(state,action)=>
     {
        state.doctor=null;
        state.tokend=null;
        localStorage.clear("tokend");
        localStorage.clear("doctor");
     },
      authDoctor:(state,action)=>
          {
            state.doc=action.payload;
            localStorage.setItem("doc",action.payload);
          },
      doctorDash:(state,action)=>
      {
       state.dashdata=action.payload;
      }
    }
})

export default DoctorSlice.reducer;
export const {getDoctorAppointments,logout,login,editDoctor,authDoctor,doctorDash}=DoctorSlice.actions;




    
    


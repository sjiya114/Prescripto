import { createSlice } from "@reduxjs/toolkit";
const initialState={
    doctors:[],
    users:[],
    appointments:[],
    role:""
}
export const AdminSlice=createSlice({
    name:'admin',
     initialState,
    reducers:
    {
     getDoctors:(state,action)=>
     {
        state.doctors=action.payload;
     },
     getUsers:(state,action)=>
     {
        state.users=action.payload;
     },
     addDoctors:(state,action)=>
     {
        state.doctors.push(action.payload);
     },
     getAppointments:(state,action)=>
     {
      state.appointments=action.payload;
     },
     changeRole:(state,action)=>
     {
       state.role=action.payload;
     },
     changeAvailability:(state,action)=>
     {

     }
    }
})
export default AdminSlice.reducer;
export const {getDoctors,getUsers,addDoctors,getAppointments,changeAvailability,changeRole}=AdminSlice.actions;


















//this slice folder will contain different functionalities in different files
// for creating createSlice
//for creating  asynchronous api calls
// const tokenFromStorage=localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null;
// const userFromStorage=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;

// const initialState={
//  token:tokenFromStorage,
//  user:userFromStorage
// }

// export const loginAdmin=createAsyncThunk("/auth/admin/login",async(admindata,{rejectWithValue})=>
// {
//     try {
//         const res=await axios.post("http://localhost:3000/doctor/login",admindata);
//         localStorage.setItem("token",res.data.token);
//         localStorage.setItem("user",res.data.user);
//         return res.data.user;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// })
// export const loginDoctor=createAsyncThunk("/auth/doctor/login",async(doctordata,{rejectWithValue})=>
// {
//     try {
//         const res=await axios.post("http://localhost:3000/doctor/login",doctordata);
//         localStorage.setItem("token",res.data.token);
//         localStorage.setItem("user",res.data.user);
//         return res.data.user;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// })
// const authSlice=createSlice({
//     name:'auth',
//     initialState,
//     reducers:{
//         logout:(state)=>
//         {
//             state.user=null;
//             state.token=null;
//             localStorage.clear("token");
//             localStorage.clear("user");
//         }
//     },
//     //handle extrareducers for our async thunks
//     extraReducers:(builder)=>
//     {
        
//     }
// })


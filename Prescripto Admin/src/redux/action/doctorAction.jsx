import axios from 'axios';
import { addDoctors, changeAvailability, changeRole, getAppointments, getDoctors } from '../reducer/AdminSlice';
import { authDoctor, doctorDash, editDoctor, getDoctorAppointments } from '../reducer/DoctorSlice';
import { login } from '../reducer/DoctorSlice';
import toast from 'react-hot-toast';
import { logout } from '../reducer/DoctorSlice';
import { useNavigate } from 'react-router-dom';
// const nav=useNavigate();
axios.defaults.baseURL="http://localhost:5500";
//redux says if you want to make async funtion then you have to use high order function
export const asyncgetDoctors=()=>async(dispatch,getState)=>
    {
      const res=await axios.get("/doctor/getAll",{
  headers: {
    token: localStorage.getItem("tokena"),
  },
});
      if(res.data.success)
      {
        dispatch(getDoctors(res.data.doctorList));
      }
    }
export const asyncgetUsers=()=>async(dispatch,getState)=>
{
      const res=await axios.get("/doctor/getAll");
      if(res.data.success)
      {
        dispatch(getUsers(res.data.doctorList));
      }
}
export const asyncAddDoctor=(formData)=>async(dispatch,getState)=>
{
   const res=await axios.post("/doctor/addDoctor",formData,{
  headers: {
    token: localStorage.getItem("tokena"),
  },
});
   if(res.data.success)
   {
    dispatch(addDoctors(res.data.doctors));
    console.log(res.data.message);
    toast.success(res.data.message);
   }
   else
   {
    toast.error("error while adding doctor");
   }
}
export const asyncEditDoctor=(formData)=>async(dispatch,getState)=>
{
   const res=await axios.post("/doctor/editDoctor",formData,{
  headers: {
    token: localStorage.getItem("tokend"),
  },
});
console.log(res.data);
   if(res.data.success)
   {
    dispatch(editDoctor(res.data.doctor));
    console.log(res.data.message);
    toast.success(res.data.message);
   }
   else
   {
    toast.error("error while adding doctor");
   }
}
export const asyncGetAllAppointments=()=>async(dispatch,getState)=>
{
  console.log(localStorage.getItem("tokena"));
  const res=await axios.get("/admin/allappointments",{
  headers: {
    token: localStorage.getItem("tokena"),
  },
});
   if(res.data.success)
   {
    dispatch(getAppointments(res.data.appointments));
   }
   else
   {
    toast.error("error while fetching appointments");
   }
}
export const asyncChangeAvailability=(id)=>async(dispatch,getState)=>
{
  const res=await axios.post("/doctor/changeAvailability",{id:id},{
  headers: {
    token: localStorage.getItem("tokena"),
  },
});
   if(res.data.success)
   {
    dispatch(changeAvailability());
    dispatch(asyncgetDoctors());
    toast.success(res.data.message);
   }
   else
   {
    toast.error("error while changing availability");
   }
}
export const asyncgetDoctorAppointments=(doctorId)=>async(dispatch,getState)=>
    {
      console.log(doctorId);
      const res=await axios.get(`/doctor/appointmentsd/${doctorId}`,{
  headers: {
    token: localStorage.getItem("tokend"),
  },
});
      if(res.data.success)
      {
        dispatch(getDoctorAppointments(res.data));
      }
      else
      {
        toast.error("error while fetching doctors");
      }
    }

  
export const asyncLoginDoctor=(data,navigate)=>async(dispatch,getState)=>
{
try {
    const res=await axios.post("/doctor/login",data);
    console.log(res.data);
    if(res.data.success)
   {
      toast.success(res.data.message);
       dispatch(login(res.data));
       dispatch(changeRole("doctor"));
       navigate("/home/doctor/dashboard");
   }
   else
   {
    toast.error(res.data.error);
   }
    
} catch (error) {
    toast.error("error while logging doctor");
}
}
export const asyncAuthDoctor=(navigate)=>async(dispatch,getState)=>
{
    try {
    const res=await axios.get("/doctor/auth",{
  headers: {
    token: localStorage.getItem("tokend"),
  },
});
    console.log(res.data);
      if(res.data.success)
   {
          dispatch(authDoctor(res.data.doctor));
   }
   else
   {
       dispatch(logout());
      toast.error(res.data.error);
      navigate("/");
   }
} catch (error) {
    dispatch(logout());
    toast.error("error while authenticating user");
    navigate("/");
}
}
export const asyncDoctorDashBoard=(docId)=>async(dispatch,getState)=>
{
try {
  const res=await axios.get(`/doctor/dashdata/${docId}`,{
  headers: {
    token: localStorage.getItem("tokend"),
  },
});
console.log(res.data);
  if(res.data.success)
  {
    dispatch(doctorDash(res.data.dashData));
  }
} catch (error) {
  toast.error("error while fetching dashboard data");
}
}
import axios from 'axios';
import { changeRole } from '../reducer/AdminSlice';
import { adminDash, login } from '../reducer/AdminAuthSlice'
import { logout } from '../reducer/AdminAuthSlice';
axios.defaults.baseURL="https://prescripto-roan-nine.vercel.app";
import toast from 'react-hot-toast';
export const asyncLoginAdmin=(data,navigate)=>async(dispatch,getState)=>
{
try {
    const res=await axios.post("/admin/login",data);
    if(res.data.success)
   {
       dispatch(login(res.data));
       dispatch(changeRole("admin"));
       toast.success(res.data.message);
       navigate("/home/admin");
   }
   else
   {
    toast.error(res.data.error);
   }
    
} catch (error) {
    toast.error("error while logging user");
}
}
export const asyncAuthAdmin=(navigate)=>async(dispatch,getState)=>
{
    try {
    const res=await axios.get("/admin/auth",{
  headers: {
    token: localStorage.getItem("tokena"),
  },
});
      if(res.data.success)
   {
        toast.success("authenticated successfully");
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
export const asyncAdminDashBoard=()=>async(dispatch,getState)=>
{
try {
    console.log("hello ad");
  const res=await axios.get("/admin/dashdata",{
  headers: {
    token: localStorage.getItem("tokena"),
  },
});
console.log(res.data);
if(res.data.success)
  {
    dispatch(adminDash(res.data.dashData));
  }
} catch (error) {
  toast.error("error while fetching dashboard data");
}
}
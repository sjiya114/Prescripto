import axios from "axios";
import toast from "react-hot-toast";
import {useSelector} from 'react-redux';
import { login,signup,auth, updateProfile, getUserProfile, logout } from "../reducer/UserSlice";
axios.defaults.baseURL="http://localhost:5500";
export const asyncLoginUser=(data)=>async(dispatch,getState)=>
{
try {
    const res=await axios.post("/user/login",data);
    if(res.data.success)
   {
       console.log(res.data);
       dispatch(login(res.data));
       toast.success(res.data.message);
   }
   else
   {
    toast.error(res.data.error);
   }
    
} catch (error) {
    toast.error("error while logging user");
}
}
export const asyncSignupUser=(data)=>async(dispatch,getState)=>
{
try {
      
      const res=await axios.post("/user/signup",data);
       if(res.data.success)
   {
          dispatch(signup(res.data));
         toast.success(res.data.message);
   }
   else
   {
      toast.error(res.data.error);
   }
} catch (error) {
    toast.error("error while registering user");
}
}
export const asyncAuthUser=(navigate)=>async(dispatch,getState)=>
{
    try {
    const res=await axios.get("/user/auth",{
  headers: {
    token: localStorage.getItem("token"),
  },
});
      if(res.data.success)
   {
          dispatch(auth(res.data));
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
export const asyncUpdateProfile=(data)=>async(dispatch,getState)=>
{
    try {
        const res=await axios.post("/user/updateProfile",data,{
  headers: {
    token: localStorage.getItem("token"),
  },
});
        console.log(res.data);
        if(res.data.success)
        {
            dispatch(updateProfile(res.data.user));
            toast.success(res.data.message);
        }
        else
        {
            toast.error("error while 1 updating user data");
        }
    } catch (error) {
        toast.error("error while updating user profile");
    }
}
export const asyncResetOtp=(data,navigate)=>async(dispatch,getState)=>
{
    try {
        const d={email:data};
        const res=await axios.post("/user/resetotp",d);
        console.log(res.data);
        if(res.data.success)
        {
            toast.success(res.data.message);
            navigate("/resetPassword");
        }
        else
        {
            toast.error("error while sending otp");
        }
    } catch (error) {
        toast.error("error while sending otp");
    }
}

export const asyncResetPassword=(data,navigate)=>async(dispatch,getState)=>
{
    try {
        const res=await axios.post("/user/resetpassword",data);
        console.log(res.data);
        if(res.data.success)
        {
            toast.success(res.data.message);
            navigate("/");
        }
        else
        {
            toast.error("error while resetting user password");
        }
    } catch (error) {
        toast.error("error while resetting user password");
    }
}

export const asyncGetUserProfile=()=>async(dispatch,getState)=>
{
     try {
        const res=await axios.get("/user/auth",{
  headers: {
    token: localStorage.getItem("token"),
  },
});
        if(res.data.success)
        {
            dispatch(getUserProfile(res.data.user),);
        }
        else
        {
            toast.error("error while resetting user password");
        }
    } catch (error) {
         toast.error("error while authenticating user");
    }
}
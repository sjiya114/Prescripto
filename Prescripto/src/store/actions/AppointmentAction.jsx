import axios from 'axios';
import toast from 'react-hot-toast';
import { bookAppointments, cancelAppointment, getAppointments } from '../reducer/UserSlice';
axios.defaults.baseURL="https://prescripto-zdtq.vercel.app";
export const asyncGetAppointments=(id)=>async(dispatch,getState)=>
{
try {
        console.log(id);
        const res=await axios.get(`/user/getappointments/${id}`,{
  headers: {
    token: localStorage.getItem("token"),
  },
});
        console.log(res.data);
        if(res.data.success)
        {   
            dispatch(getAppointments(res.data.appointments));
            toast.success(res.data.message);
        }
        else
        {
            toast.error("error while 1 updating user data");
        }
} catch (error) {
    toast.error("error while fetching appointments");
}
}
export const asyncBookAppointments=(data)=>async(dispatch,getState)=>
{
try {
    const res=await axios.post("/user/bookappointments",data,{
  headers: {
    token: localStorage.getItem("token"),
  },
});
        console.log(res.data);
        if(res.data.success)
        {   
            dispatch(bookAppointments(res.data.appointments));
            toast.success(res.data.message);
        }
        else
        {
            toast.error(res.data.error);
        } 
} catch (error) {
    toast.error("error while booking appointments");
}
}
export const asyncCancelAppointments=(data)=>async(dispatch,getState)=>
{
try {
    const res=await axios.post("/user/cancelappointment",data,{
  headers: {
    token: localStorage.getItem("token"),
  },
});
        console.log(res.data);
        if(res.data.success)
        {   
            dispatch(cancelAppointment(res.data.appointments));
            toast.success(res.data.message);
        }
        else
        {
            toast.error(res.data.error);
        } 
} catch (error) {
    toast.error("error while booking appointments");
}
}
export const asyncMakePayment=(data)=>async(dispatch,getState)=>
{
try {
    const res=await axios.post("/user/makepayment",data,{
  headers: {
    token: localStorage.getItem("token"),
  },
});
        console.log(res.data);
        if(res.data.success)
        {   
            window.location.href=res.data.session;
            toast.success(res.data.message);
        }
        else
        {
            toast.error(res.data.error);
        } 
} catch (error) {
    toast.error("error while making payment");
}
}


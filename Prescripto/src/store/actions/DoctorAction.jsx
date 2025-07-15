import axios from 'axios';
import toast from 'react-hot-toast';
import { getDoctors } from '../reducer/DoctorSlice';
//redux says if you want to make async funtion then you have to use high order function
export const asyncgetDoctors=()=>async(dispatch,getState)=>
    {
      const res=await axios.get("https://backend-anbw.onrender.com/doctor/getAll");
      if(res.data.success)
      {
        dispatch(getDoctors(res.data.doctorList));
      }
      else
      {
        toast.error("error while fetching doctors");
      }
    }
  
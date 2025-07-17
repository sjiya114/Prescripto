import axios from 'axios';
import toast from 'react-hot-toast';
import { getDoctors } from '../reducer/DoctorSlice';
//redux says if you want to make async funtion then you have to use high order function
export const asyncgetDoctors=()=>async(dispatch,getState)=>
    {
      const res=await axios.get("https://prescripto-zdtq-17wag4361-jiya-sharmas-projects-9f5b8682.vercel.app/doctor/getAll");
      if(res.data.success)
      {
        dispatch(getDoctors(res.data.doctorList));
      }
      else
      {
        toast.error("error while fetching doctors");
      }
    }
  
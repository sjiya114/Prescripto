import React, { useState } from 'react'
import {doctors as doctor} from '../../../../Prescripto/src/assets/assets_frontend/assets';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncChangeAvailability, asyncgetDoctors } from '../../redux/action/doctorAction';
import { useNavigate } from 'react-router-dom';
import { asyncAuthAdmin } from '../../redux/action/adminAction';
function AllDoctor() {
  const navigate=useNavigate();
  const adminState = useSelector((state) => state.admin); // ✅ Get doctors slice safely
  const doctors = adminState && Array.isArray(adminState.doctors)
    ? adminState.doctors
    : [];
    const dispatch=useDispatch();
     useEffect(()=>
          {
           dispatch(asyncAuthAdmin(navigate));
          },[]);
    useEffect(()=>
    {
     dispatch(asyncgetDoctors());
    },[dispatch]);
    // const getDoctors=async()=>
    // {
    //   const res=await axios.get("http://localhost:3000/doctor/getAll");
    //   if(res.data.success)
    //   {
    //     setDoctors(res.data.doctorList);
    //   }
    // }
    // useEffect(()=>{
    //  getDoctors();
    // },[]);
  return (
     <div className='mt-40'>
          <div className='flex flex-row flex-wrap space-x-6 space-y-10  mt-10  items-center justify-center rounded-lg'> 
         {doctors.map((doctor,index)=>(
            <div key={index} onClick={()=>{navigate(`/doctor/${doctor._id}`)}} className='flex flex-col transition-transform animate-[wiggle_1s_ease-in-out_infinite]  rounded-lg border-4 shadow-2xl hover:scale-110 shadow-blue-950  border-gray-200'>
            <div>
              <img src={doctor.image} className='w-68 h-68 bg-gray-500 rounded-lg' alt="" />
            </div>
            <div className='flex flex-col space-y-1 px-2 py-2'> 
              <div className='flex flex-row space-x-2'>
                 <p className='text-green-600'>Available</p>
                <input type="checkbox" onClick={()=>dispatch(asyncChangeAvailability(doctor._id))}   checked={doctor.available}  />
              </div>
              <h1 className='font-bold'>{doctor.name}</h1>
              <p>{doctor.speciality}</p>
            </div>
         </div>
         ))}
         </div>
        
    </div>
  )
}

export default AllDoctor

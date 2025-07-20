import React from 'react'
import { doctors } from '../assets/assets_frontend/assets'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { asyncgetDoctors } from '../store/actions/DoctorAction';
function TopDoctors() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const doctorState =useSelector((state)=>state.doctors);
  useEffect(()=>
  { 
     dispatch(asyncgetDoctors());
  },[dispatch])
  return (
    <div className='mt-20 mx-20 max-md:mx-10'>
        <Title title="Top Doctors to Book" description="Simply browse through our extensive list of trusted doctors" />
          <div className='flex flex-row flex-wrap space-x-6 space-y-10  mt-10  items-center justify-center rounded-lg'> 
         {doctorState.doctors.map((doctor)=>(
            <div onClick={()=>{navigate(`/appointments/${doctor._id}`),scroll(0,0,0)}} className='flex flex-col transition-transform animate-[wiggle_1s_ease-in-out_infinite]  rounded-lg border-4 shadow-2xl hover:scale-110 shadow-blue-950  border-gray-200'>
            <div>
              <img src={doctor.image} className='w-68 h-68 bg-gray-500 rounded-lg' alt="" />
            </div>
            <div className='flex flex-col space-y-1 px-2 py-2'> 
              <p className='text-green-600'>Available</p>
              <h1 className='font-bold'>{doctor.name}</h1>
              <p>{doctor.speciality}</p>
            </div>
         </div>
         ))}
         </div>
        
    </div>
  )
}

export default TopDoctors

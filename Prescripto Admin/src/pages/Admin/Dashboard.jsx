import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useNavigate } from 'react-router-dom';
import { asyncAuthAdmin } from '../../redux/action/adminAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Dashboard() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
   useEffect(()=>
        {
         dispatch(asyncAuthAdmin(navigate));
        },[]);
  return (
    <>
    <div className='mt-30 mx-10  flex flex-row max-md:flex-col max-md:space-y-4  w-full justify-between max-md:justify-start'>
      <button className='px-10 py-6 space-x-6 rounded-md bg-white flex flex-row'>
        <img src={assets.doctor_icon} alt="" />
        <h1>14 Doctors</h1>
      </button>
      <button className='px-10 py-6 space-x-6 rounded-md bg-white flex flex-row'>
         <img src={assets.appointments_icon} alt="" />
         <h2>2 Appointments</h2>
     </button>
     <button className='px-10 py-6 space-x-6 rounded-md bg-white flex flex-row'>
        <img src={assets.patients_icon} alt="" />
        <h2>6 Patients</h2>
     </button>
    </div>
    <br />
      <div className='flex bg-white flex-col border-gray-500 border-2 rounded-lg space-y-4 ml-10'>
        <div className='flex flex-row space-x-4 px-4 border-b-2 border-gray-400 py-4'>
            <img src={assets.list_icon} alt="" />
            <h1 className='text-black font-bold text-lg'> Latest Appointments</h1>
        </div>
        <div className='flex flex-row px-4 py-2 w-full justify-between'>
            <div className='flex flex-row space-x-4'>
                <div>
                   <img src={assets.doctor_icon} alt="" />
                </div>
           
            <div className='flex flex-col'>
             <p className='text-black font-bold'>Dr.Richard James</p>
            <p className='text-gray-700 font-semibold'>Booking on 24 July 2024</p>
            </div>
            </div>
            <div>
                <button><img src={assets.cancel_icon} alt="" /></button>
            </div>
           
        </div>
      </div>
    </>
  )
}

export default Dashboard

import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useNavigate } from 'react-router-dom'
import { asyncAuthDoctor, asyncDoctorDashBoard } from '../../redux/action/doctorAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
function DashBoard() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {dashdata,docId}=useSelector((state)=>state.doctor);
   useEffect(()=>
        {
         dispatch(asyncAuthDoctor(navigate));
        },[]);
         useEffect(()=>
              {
              if(docId && Object.keys(dashdata).length === 0){
              dispatch(asyncDoctorDashBoard(docId));
              }
              },[dispatch,dashdata])
  return (
    <>
    {dashdata && <> <div className='mt-30 mx-10  flex flex-row max-md:flex-col max-md:space-y-4  w-full justify-between max-md:justify-start'>
      <button className='px-10 py-6 space-x-6 rounded-md bg-white flex flex-row'>
        <img src={assets.doctor_icon} alt="" />
        <h1>{dashdata.earning} Earning</h1>
      </button>
      <button className='px-10 py-6 space-x-6 rounded-md bg-white flex flex-row'>
         <img src={assets.appointments_icon} alt="" />
         <h2>{dashdata.appointments} Appointments</h2>
     </button>
     <button className='px-10 py-6 space-x-6 rounded-md bg-white flex flex-row'>
        <img src={assets.patients_icon} alt="" />
        <h2>{dashdata.patients} Patients</h2>
     </button>
    </div>
    <br />
      <div className='flex bg-white flex-col border-gray-500 border-2 rounded-lg space-y-4 ml-10'>
        <div className='flex flex-row space-x-4 px-4 border-b-2 border-gray-400 py-4'>
            <img src={assets.list_icon} alt="" />
            <h1 className='text-black font-bold text-lg'> Latest Appointments</h1>
        </div>
       <div className='flex flex-col'>
       
                 {Array.isArray(dashdata.latestAppointments) && dashdata.latestAppointments.map((data)=>(<div className='flex flex-row px-4 py-2 w-full justify-between'>
                   <div className='flex flex-row space-x-4'>
                       <div>
                          <img src={data.userId.image} alt="" />
                       </div>
                  
                   <div className='flex flex-col'>
                    <p className='text-black font-bold'>{data.userId.name}</p>
                   <p className='text-gray-700 font-semibold'>Booking on {data.slotDate}</p>
                   </div>
                   </div>
                   <div>
                       <button><img src={assets.cancel_icon} alt="" /></button>
                   </div>
                  
               </div>))}
       
               </div>
      </div></>}
    </>
  )
}

export default DashBoard

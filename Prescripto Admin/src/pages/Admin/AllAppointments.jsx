import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetAllAppointments } from '../../redux/action/doctorAction';
import { useNavigate } from 'react-router-dom';
import { asyncAuthAdmin } from '../../redux/action/adminAction';

function AllAppointments() {
  const {appointments}=useSelector((state)=>state.admin);
  const dispatch=useDispatch();
  const navigate=useNavigate();
   useEffect(()=>
      {
       dispatch(asyncAuthAdmin(navigate));
      },[]);
  useEffect(()=>
  {
  if(!appointments || appointments.length===0){
  dispatch(asyncGetAllAppointments());
  }
  },[dispatch,appointments])
  return appointments.length>0?(
     <div className='mt-30 mx-4'>
       <h1 className='font-serif my-2 font-semibold text-2xl'>Appointments</h1>
       <table className='border-2 border-gray-400 bg-white'>
        <thead>
            <tr className=' border-b-2 border-gray-500 max-md:grid-cols-3  grid grid-cols-7'>
                <td className='px-16 py-2 font-bold'>#</td>
                <td className='px-16 py-2 font-bold'>Patient</td>
                <td className='px-16 py-2 font-bold'>Age</td>
                <td className='px-16 py-2 font-bold'>Date & Time</td>
                <td className='px-16 py-2 font-bold'>Doctor</td>
                <td className='px-16 py-2 font-bold'>Fees</td>
                <td className='px-16 py-2 font-bold'>Actions</td>
            </tr>
        </thead>
       {appointments.map((appoint,index)=>( <tbody key={index+"k"} >
          <tr className='max-md:grid-cols-3  grid grid-cols-7'>
               <td className='px-16 py-2'>{index}</td>
                <td className='px-16 py-2'>{appoint?.userId?.name}</td>
                <td className='px-16 py-2'>{appoint?.userId?.age}</td>
                <td className='px-16 py-2'>{appoint?.date}</td>
                <td className='px-16 py-2'>{appoint?.doctorId?.name}</td>
                <td className='px-16 py-2'>{appoint?.amount}</td>
                <td className='px-16 py-2'>{appoint?.payment?"Paid":"Unpaid"}</td> 
            </tr>
        </tbody>))}
       </table>
    </div>
  ):
  (
     <h1>Error while loading data</h1>
  )
}

export default AllAppointments

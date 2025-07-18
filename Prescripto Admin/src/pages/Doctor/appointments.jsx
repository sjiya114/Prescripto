import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { asyncAuthDoctor, asyncgetDoctorAppointments } from '../../redux/action/doctorAction';
import { useNavigate } from 'react-router-dom';

function Appointments() {
  const {appointmentsd,docId}=useSelector((state)=>state.doctor);
  const dispatch=useDispatch();
  const navigate=useNavigate();
   useEffect(()=>
        {
         dispatch(asyncAuthDoctor(navigate));
        },[]);
  useEffect(()=>
  {
  console.log("hello"+docId);
  dispatch(asyncgetDoctorAppointments(docId));
  },[dispatch])
  return (
    <div className='mt-30 mx-4'>
       <h1 className='font-serif my-2 font-semibold text-2xl'>Appointments</h1>
       <table className=' border-2 border-gray-400 bg-white  '>
        <thead>
            <tr className=' border-b-2 border-gray-500  max-md:grid-cols-3  grid grid-cols-7 '>
                <td className='px-16 py-2 font-bold'>#</td>
                <td className='px-16 py-2 font-bold'>Patient</td>
                <td className='px-16 py-2 font-bold'>Age</td>
                <td className='px-16 py-2 font-bold'>Date & Time</td>
                <td className='px-16 py-2 font-bold'>Doctor</td>
                <td className='px-16 py-2 font-bold'>Fees</td>
                <td className='px-16 py-2 font-bold'>Actions</td>
            </tr>
        </thead>
       {appointmentsd.map((appoint,index)=>( <tbody >
          <tr className=' grid grid-cols-7 max-md:grid-cols-3   '>
                <td className='px-16 py-2'>{index+1}</td>
                <td className='px-16 py-2'>{appoint.userId.name}</td>
                <td className='px-16 py-2'>{appoint.userId.age}</td>
                <td className='px-16 py-2'>{appoint.date}</td>
                <td className='px-16 py-2'>{appoint.doctorId.name}</td>
                <td className='px-16 py-2'>{appoint.amount}</td>
                <td className='px-16 py-2'>{appoint.payment?"Paid":"Unpaid"}</td> 
            </tr>
        </tbody>))}
       </table>
    </div>
  )
}

export default Appointments

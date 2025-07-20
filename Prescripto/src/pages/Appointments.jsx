import React, { useState } from 'react'
import { assets,doctors } from '../assets/assets_frontend/assets'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncAuthUser } from '../store/actions/UserAction.jsx';
import { asyncCancelAppointments, asyncGetAppointments, asyncMakePayment } from '../store/actions/AppointmentAction.jsx';
import { useNavigate } from 'react-router-dom';
function Appointments() {
  const { appointments,user }=useSelector((state)=>state.users);
  const dispatch=useDispatch();
  const navigate=useNavigate();
      useEffect(()=>
      {
       dispatch(asyncAuthUser(navigate));
      },[]);
    useEffect(()=>
    {
      if(user && user._id){
      dispatch(asyncGetAppointments(user._id));
      }
      console.log(appointments);
    },[dispatch,user._id]);
    const cancelAppointment=(id)=>
    {
      dispatch(asyncCancelAppointments({userId:user._id,appointmentId:id}));
    }
    const makePayment=(id)=>
    {
      dispatch(asyncMakePayment({userId:user._id,appointmentId:id},navigate));
    }
  return (
   <>
  {appointments && appointments.length > 0 ? (
    <div className="mt-40 mx-20 flex flex-col space-y-10">
      <div>
        <h1 className="text-center font-black text-2xl font-sans">My Appointments</h1>
      </div>

      <hr className="bg-gray-400 w-full h-0.5" />

      <div className="flex flex-col space-y-8">
        {appointments.map((doc, index) => (
          <div key={"ab" + index}>
            <div className="flex flex-row justify-evenly max-md:flex-col max-md:space-y-3 mt-2">
              
              {/* Doctor Image */}
              <div>
                <img src={doc.doctorId.image} alt="Doctor" />
              </div>

              {/* Doctor Details */}
              <div className="space-y-2">
                <div className="text-2xl font-semibold">
                  {doc.doctorId.name}
                </div>

                <div className="text-gray-700 text-lg font-medium">
                  {doc.doctorId.speciality}
                </div>

                <div className="text-lg">
                  <span>Address: </span>
                  <b>
                    {doc.doctorId.address?.line1 + " " + doc.doctorId.address?.line2}
                  </b>
                </div>

                <div className="text-gray-700 font-medium text-lg">
                  <span>Date: </span>
                  <b className="text-black">{doc.slotDate}</b>
                </div>

                <div className="text-gray-700 font-medium text-lg">
                  <span>Time: </span>
                  <b className="text-black">{doc.slotTime}</b>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-6">
               {!doc.cancelled && <button onClick={()=>{!doc.payment && makePayment(doc._id)}}   className="border-gray-700 border-2 cursor-pointer rounded-md bg-blue-950 hover:bg-blue-600 text-white px-2 py-2">
                  {doc.payment?"Paid":"Pay Here"}
                </button>}
              {!doc.cancelled && <button  onClick={()=>{navigate("/slip",{state:{userEmail:doc.userId.email,slotDate:doc.slotDate,slotTime:doc.slotTime,amount:doc.amount,rid:doc._id,pname:doc.userId.name,dname:doc.doctorId.name,age:doc.userId.age,gender:doc.userId.gender}}),scroll(0,0,0)}} className="border-gray-700 border-2 cursor-pointer rounded-md bg-blue-950 hover:bg-blue-600 text-white px-2 py-2">Go to Reciept</button>}
                {!doc.payment && <button  onClick={()=>{!doc.cancelled && cancelAppointment(doc._id)}}    className="border-gray-700 border-2 cursor-pointer rounded-md px-2 hover:bg-red-900 hover:text-white py-2">
                  {doc.cancelled?"Cancelled":"Cancel Appointment"}
                </button>}
              </div>
            </div>

            <hr className="bg-gray-400 w-full h-0.5 mt-6" />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="mt-40 text-center text-gray-500 text-lg">
      No appointments found.
    </div>
  )}
</>

  )
}

export default Appointments

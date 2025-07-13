import React, { useRef } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useLocation, useNavigate } from 'react-router-dom'
import 'html2canvas';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { asyncAuthUser } from '../store/actions/UserAction';
function BookingSlip() {
    const location=useLocation();
    const printRef=useRef(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
     useEffect(()=>
          {
           dispatch(asyncAuthUser(navigate));
          },[]);
    const {userEmail,slotDate,slotTime,amount,rid,pname,dname,age,gender}=location.state;
    //html2canvas:It allows to take screenshot of page by converting htmlcomponent into image
const handleDownload = async () => {
  const element = printRef.current;
  if (!element) return;

  // Use high scale and full element height
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    scrollY: -window.scrollY, // important to capture scrolled content
    width: element.scrollWidth,
    height: element.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("bookingslip.pdf");
};

  return (
    <>
    <div ref={printRef}  style={{ minWidth:"60vw",minHeight:"100vh" }}  className='mt-40 pt-10 px-40 max-md:px-20 flex flex-col space-y-4 '>
        <div className=' flex w-full'>
          <img  src={assets.logo} alt="Logo"   />
        </div>
       
       <div className='flex flex-row space-x-2  space-y-1 max-md:flex-col   w-full' >
         <div className='flex flex-row space-x-2' >
       <img className='w-6 h-6' src={assets.email} alt="" />
       <p>sharma24@gmail.com</p>
     </div>
     <div className='flex flex-row space-x-2' >
       <img className='w-6 h-6' src={assets.address} alt="" />
       <p>54709 New Street,Raisen</p>
     </div>
      <div className='flex flex-row space-x-2' >
        <img className='w-6 h-6' src={assets.phone} alt="" />
        <p>9856875645</p>
      </div>
       </div>
       <div className='flex flex-col'>
         <h1 className='text-xl font-bold my-2'>Patient Details</h1>
        <p className=' font-bold'>Booked By: <span className='font-normal ' >{userEmail}</span></p>
       <p className=' font-bold'>Patient Name: <span className='font-normal  '>{pname}</span> </p>
        <p className=' font-bold'>Gender: <span className='font-normal  '>{gender}</span> </p>
       <h1 className=' font-bold text-xl my-2'>Appointment Details</h1>
       <p className=' font-bold'>SlotDate:<span className='font-normal  '>{slotDate}</span>  </p>
       <p className=' font-bold'>SlotTime: <span className='font-normal  '>{slotTime}</span> </p>
       <p className=' font-bold'>Doctor name: <span className='font-normal  '>{dname}</span> </p>
       <p className=' font-bold'>Amount: <span className='font-normal  '>{amount}</span> </p>
       <p className=' font-bold'>Reciept Date: <span className='font-normal  '>{Date.now}</span> </p>
       <p className=' font-bold'>Reciept Id: <span className='font-normal  '>{rid}</span> </p>
       </div>
        
    </div>
     <div className='mx-40 my-10'>
      <button onClick={()=>{handleDownload()}} className="border-gray-700 border-2 cursor-pointer rounded-md bg-blue-950 hover:bg-blue-600 text-white px-2 py-2">Download Reciept</button>
     </div>
     </>
  )
}

export default BookingSlip

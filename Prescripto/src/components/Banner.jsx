import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {
  const navigate=useNavigate();
  return (
    <>
    <div className='mt-20 max-md:pt-10 mx-20 max-md:mx-10 bg-indigo-800 shadow-2xl shadow-blue-950  hover:opacity-80 space-y-4 rounded-lg flex flex-row items-center justify-center max-md:flex-col'>
       <div className='flex flex-col space-y-4 pl-10 max-md:pl-1 w-1/2'>
       {/* left */}
        <h1 className='text-6xl max-lg:text-5xl max-md:text-3xl max-sm:text-2xl font-serif text-shadow-2xs text-shadow-black text-white'>Book Appointment With 100+ Trusted Doctors</h1>
        <button onClick={()=>{navigate("/signup")}}  className='text-blue-950 bg-white text-center px-2 py-2 w-fit rounded-lg '>Create Account</button>
     </div>
     <div className='w-1/2'>
        {/* right */}
        <img src={assets.appointment_img} className='w-100 h-110 max-lg:w-auto max-lg:h-auto' alt="" />
     </div>
    </div>
    </>
  )
}

export default Banner

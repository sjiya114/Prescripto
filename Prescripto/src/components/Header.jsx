import React from 'react'
import {assets} from '../assets/assets_frontend/assets.js';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate=useNavigate();
  return (
    <div className='flex mt-40 flex-row mx-10   min-sm:mx-20 bg-blue-950/90  hover:opacity-60  hover:bg-cyan-950/60 max-md:flex-col pt-40 max-lg:pt-10   text-white rounded-lg'>
       <div className='flex  flex-col w-1/2 max-md:w-full max-md:pl-5  max-md:pr-6 max-md:space-y-5  space-y-10 justify-center pl-20 max-xl:pl-18 max-lg:pl-15'>
         {/* left */}
         <p className='text-6xl max-xl:text-4xl max-lg:text-3xl font-serif text-shadow-white text-shadow-2xs'>Book Appointment With Trusted Doctors</p>
         <div className='flex flex-row flex-wrap space-x-2'>
          <img src={assets.group_profiles} className='w-30 h-15' alt="group-profiles" />
          <p className='font-sans'>Simply browse through extensive list of trusted doctors,schedule your appointment hassle-free</p>
         </div>
          <div className='bg-white text-blue-950 mb-10 max-md:mb-2 rounded-2xl w-fit flex flex-row space-x-2 px-2 py-2'>
            <p onClick={()=>{navigate("/appointments")}} >Book appointment</p>
            <img src={assets.arrow_icon} className='w-6 h-6' alt="" />
          </div>
       </div>
       <div className='w-1/2 max-md:w-full relative'>
        {/* right */}
        <img src={assets.header_img} className='bottom-0 md:absolute' alt="" />
       </div>
    </div>
  )
}

export default Header

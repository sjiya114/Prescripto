import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <>
    <div className='mx-20 mt-4 flex flex-row max-xl:flex-col justify-between space-x-60 max-xl:space-y-5  max-xl:space-x-0 items-center '>
      <div className='flex flex-col w-[40%] max-xl:w-full '>
        {/* left */}
        <img src={assets.logo} className='w-40 h-40' alt="logo" />
        <p className='text-sm font-sans text-blue-950'>A user-friendly platform that allows patients to easily find doctors,
           view their availability, and book appointments online. The website streamlines
            healthcare access by offering features like doctor profiles, specialty filters,
             appointment reminders, and secure patient data management.</p>
      </div>
      <div className='flex flex-col w-[30%]  max-xl:w-full'> 
        <p className='font-bold'>COMPANY</p>
        <ul className='flex flex-col mt-4'>
          <li className='text-sm text-blue-950 font-sans'>Home</li>
          <li className='text-sm text-blue-950 font-sans'>About Us</li>
          <li className='text-sm text-blue-950 font-sans'>Contact Us</li>
          <li className='text-sm text-blue-950 font-sans'>Privacy Policy</li>
        </ul>
       {/* center */}
      </div>
      <div className='flex flex-col w-[30%]  max-xl:w-full'>
         {/* right */}
         <p className='font-bold' >GET IN TOUCH</p>
         <ul className='flex flex-col mt-4'>
          <li className='text-sm font-sans text-blue-950'>sjiya04072004@gmail.com</li>
          <li className='text-sm font-sans text-blue-950'>+918103110070</li>
         </ul>
      </div> 
    </div>
    <div className='mx-20 mt-10'>
      <hr className='bg-gray-400 w-full h-0.5'/>
    </div>
     <div className='mx-20 mt-5'>
       <p className='text-blue-950 text-sm text-center'>CopyRight 2025@Prescripto All right reserved</p>
     </div>
     
     </>
  )
}

export default Footer

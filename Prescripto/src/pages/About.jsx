import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function About() {
  return (
    <div className='flex flex-col mx-20 mt-40 space-y-10 '>
      <div>
        <h1 className='text-4xl font-bold text-gray-700 font-serif text-center '>ABOUT US</h1>
      </div>
      <div className='flex flex-row space-x-10 max-md:flex-col space-y-10'>
        <div className='w-1/4 max-md:w-full'>
          <img src={assets.about_image} className='border-2 border-gray-600 rounded-lg' alt="" />
        </div>
        <div className='w-3/4 max-md:w-full px-5'>
          <p className='text-lg text-gray-700 '>
            Welcome to Prescipto, your modern gateway to convenient, 
            reliable, and stress-free healthcare. In today’s fast-paced 
            world, we believe that access to quality medical care should 
            be as simple and seamless as ordering your morning coffee—and
             that’s exactly what we deliver.
            Prescripto was born out of the need to eliminate the 
            traditional struggles patients face when trying to book a 
            doctor’s appointment. Long waiting times, countless phone calls,
             unavailable slots, and uncertain availability are now things 
             of the past. Our platform connects patients directly with verified
              and trusted healthcare professionals—general physicians, specialists,
               diagnostic centers, and more—with just a few clicks.
            Our mission is to empower individuals and families to take control
             of their health through a smarter digital solution. Whether you're booking a routine consultation, following up on a diagnosis, or seeking a second opinion, MediQuick ensures you find the right medical expert, at the right time, without any of the usual hassle.
            <h1 className='text-black font-bold'> What We Offer:</h1>
            <ul className='list-disc'>
              <li> Instant Online Appointments: No more calling clinics or waiting on hold. Book your doctor instantly, 24/7.</li>
              <li> Verified Healthcare Providers: Browse profiles, read reviews, check specializations, and make informed choices.</li>
              <li> Smart Scheduling: View real-time availability and choose a time that works best for you.</li>
               <li> Secure Patient Portal: Manage your medical records, prescriptions, and history—all in one place.</li>
            </ul>
          </p>
        </div>
      </div>
      <div>
        <h1 className='text-2xl font-bold text-gray-700 font-serif '>WHY CHOOSE US</h1>
      </div>
      <div className='flex flex-row max-md:flex-col border-3 shadow-2xl shadow-black border-gray-500 '>
        <div className='px-2 py-8 space-y-2 min-lg:border-r-2 max-md:border-b-2 border-gray-500'>
          <h1 className='text-xl font-bold text-gray-900 '>EFFICIENCY</h1>
          <p className='text-lg text-gray-700 '> Streamlined Appointment and Scheduling that fits in your busy lifestyle.</p>
        </div>
        <div  className=' px-2 py-8 space-y-2 min-lg:border-r-2 max-md:border-b-2 border-gray-500'>
          <h1 className='text-xl font-bold text-gray-900 '>CONVENIENCE</h1>
          <p className='text-lg text-gray-700 '>Access To Network Of Trusted HealthCare professionals in your area.</p>
        </div>
        <div  className=' py-8 space-y-2 px-2 min-lg:border-r-2 border-gray-500'>
          <h1 className='text-xl font-bold text-gray-900 '>PERSONALIZATION</h1>
          <p className='text-lg text-gray-700 '>Tailored recommendation and reminder to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
function Sidebar({hidden,setHidden}) {
    const {role}=useSelector((state)=>state.admin);
    return (
        <>
            {role==="admin" ? !hidden && <div   className='pt-30 px-18 max-lg:px-14 max-md:absolute h-screen  mt-26 shadow-xl shadow-blue-950 bg-white'>
                <ul className='flex flex-col items- w-full  space-y-4 '>
                    <Link to="/home/admin" ><div className='flex w-full flex-row items-center justify-center  py-2 space-x-4 px-3 cursor-pointer rounded-lg hover:text-white  hover:bg-gray-500'>
                        <img src={assets.home_icon} alt="" />
                        <p className='font-serif  text-lg'>Dashboard</p>
                    </div>
                    </Link>
                    <Link to="/home/admin/appointment">
                    <div className='flex w-full  flex-row  items-center py-2 px-3  space-x-4 cursor-pointer rounded-lg justify-center  hover:text-white  hover:bg-gray-500'>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='font-serif text-lg'>Appointment</p>
                    </div>
                    </Link>
                    <Link to="/home/admin/add">
                    <div className='flex w-full flex-row  items-center  py-2 px-3  space-x-4 cursor-pointer rounded-lg justify-center  hover:text-white  hover:bg-gray-500'>
                        <img src={assets.add_icon} alt="" />
                        <p className='font-serif text-lg'>Add Doctor</p>
                    </div>
                    </Link>
                    <Link to="/home/admin/alldoctor"> 
                    <div className='flex w-full  flex-row  items-center py-2 px-3  space-x-4 cursor-pointer rounded-lg justify-center  hover:text-white hover:bg-gray-500'>
                        <img src={assets.list_icon} alt="" />
                        <p className='font-serif text-lg'> Doctor List</p>
                    </div>
                    </Link>

                </ul>
            </div> :
            !hidden && <div   className='pt-30 px-18 max-lg:px-14 max-md:absolute h-screen  mt-26 shadow-xl shadow-blue-950 bg-white'>
                <ul className='flex flex-col items- w-full  space-y-4 '>
                    <Link to="/home/doctor/dashboard" ><div className='flex w-full flex-row items-center justify-center  py-2 space-x-4 px-3 cursor-pointer rounded-lg hover:text-white  hover:bg-gray-500'>
                        <img src={assets.home_icon} alt="" />
                        <p className='font-serif  text-lg'>Dashboard</p>
                    </div>
                    </Link>
                    <Link to="/home/doctor/appointments">
                    <div className='flex w-full  flex-row  items-center py-2 px-3  space-x-4 cursor-pointer rounded-lg justify-center  hover:text-white  hover:bg-gray-500'>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='font-serif text-lg'>Appointment</p>
                    </div>
                    </Link>
                    <Link to="/home/doctor/profile">
                    <div className='flex w-full flex-row  items-center  py-2 px-3  space-x-4 cursor-pointer rounded-lg justify-center  hover:text-white  hover:bg-gray-500'>
                        <img src={assets.add_icon} alt="" />
                        <p className='font-serif text-lg'>Profile</p>
                    </div>
                    </Link>
                </ul>
            </div>}
        </>
    )
}

export default Sidebar

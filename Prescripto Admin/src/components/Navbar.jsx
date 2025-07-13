import React from 'react'
import {assets} from '../assets/assets_admin/assets';
import { useState } from 'react';
import { logout } from '../redux/reducer/AdminAuthSlice';
import { logout as logou } from '../redux/reducer/DoctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Navbar({hidden,setHidden}) {
  const {role}=useSelector((state)=>state.admin);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  return (
     <>
    <div className='flex items-center justify-between bg-white rounded-lg px-4 hover:border-indigo-900 hover:text-white  right-0 left-0 top-0 mb-5 py-6 max-md:py-2 fixed  border-b-2  border-b-gray-400   '>
        <div  className='flex flex-row space-y-2 max-md:flex-col space-x-4'>
          <img onClick={()=>{setHidden(!hidden)}} src={assets.admin_logo} className='cursor-pointer' alt="" />
          <p className='border-1 w-fit h-fit border-blue-900 rounded-2xl text-blue-900  text-sm font-bold px-2 py-2'>{role}</p>
        </div>
           <button onClick={()=>{ role==="admin"?dispatch(logout()):dispatch(logou());navigate("/")}}  className='border-2 border-blue-900 rounded-xl bg-blue-800 text-sm font-bold  text-white px-4 py-2 cursor-pointer'>LogOut</button>
          {/* mobile */}
        </div>
   </>
  )
}

export default Navbar

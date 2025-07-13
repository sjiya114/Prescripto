import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncResetPassword } from '../store/actions/UserAction';
function ResetPassword() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [data,setData]=useState({
        email:"",
        otp:"",
        newPassword:""
    })
     const onChangeHandler=(e)=>
  {
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value});
  }
    const handleSubmit=async(e)=>
    {
        e.preventDefault();
       dispatch(asyncResetPassword(data,navigate));
    }
  return (
       <div className='bg-black/70 w-full top-0 bottom-0 left-0 right-0 z-100 fixed'>
            <div className='fixed py-10 mt-40 shadow-2xl bg-white shadow-gray-200  px-10 max-md:mx-[12vw] max-md:px-2 mx-[37vw] max-lg:mx-[28vw]   rounded-lg'>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-1' action="">
              <div className='flex flex-row justify-between'>
               <h1 className='text-black font-bold'  >Reset Password</h1>
               <img src={assets.cross_icon} onClick={()=>{navigate("/")}} className='w-6 h-6' alt="" />
              </div>
              <label htmlFor="">Email</label>
              <input className='border-1 border-gray-700 rounded-lg py-1 px-1' onChange={onChangeHandler} name='email' value={data.email} type="text" />
              <label htmlFor="">New Password</label> 
              <input className='border-1 border-gray-700 rounded-lg py-1 px-1' onChange={onChangeHandler} name='newPassword' value={data.newPassword} type="password" />
              <label htmlFor="">OTP</label>
              <input type="text" className='border-1 border-gray-700 rounded-lg py-1 px-1'  onChange={onChangeHandler} name='otp' value={data.otp}  />
              <button className='bg-indigo-950 mt-2 rounded-md px-2 py-2  text-white'>Reset Password</button>
            </form>
          </div>
          </div>
    )
}

export default ResetPassword

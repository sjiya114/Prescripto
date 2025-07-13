import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { assets } from '../assets/assets_frontend/assets';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { asyncLoginUser } from '../store/actions/UserAction';
function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userState=useSelector((state)=>state.users);
  const [data,setData]=useState({email:"",
    password:""
  })
  const onChangeHandler=(e)=>
  {
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>
  {
   e.preventDefault();
   dispatch(asyncLoginUser(data)).then(()=>
  {
    setData({
    email:"",
    password:""
    });
    navigate("/");
  })
}

  //  const res=await axios.post("",data);
  //  if(res.data.success)
  //  {
  //   toast.success(res.data.message);
  //   setData({
  //   email:"",
  //   password:""
  //   });
  //  }
  //  else
  //  {
  //   toast.error(res.data.error);
  //  }
  
  return (
     <div className='bg-black/70 w-full top-0 bottom-0 left-0 right-0 z-100 fixed'>
          <div className='fixed py-10 mt-40 shadow-2xl bg-white shadow-gray-200  px-10 max-md:mx-[12vw] max-md:px-2 mx-[37vw] max-lg:mx-[28vw]   rounded-lg'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-1' action="">
            <div className='flex flex-row justify-between'>
             <h1 className='text-black font-bold'  >Login</h1>
             <img src={assets.cross_icon} onClick={()=>{navigate("/")}} className='w-6 h-6' alt="" />
            </div>
            <p className='text-gray-500 '>Please login to book appointment</p>
            <label htmlFor="">Email</label>
            <input className='border-1 border-gray-700 rounded-lg py-1 px-1' onChange={onChangeHandler} name='email' value={data.email} type="text" />
            <label htmlFor="">Password</label> 
            <input className='border-1 border-gray-700 rounded-lg py-1 px-1' onChange={onChangeHandler} name='password' value={data.password} type="password" />
            <button className='bg-indigo-950 mt-2 rounded-md px-2 py-2  text-white'>Login</button>
            <p>Dont't have an account?<b onClick={()=>{navigate("/signup")}} className='cursor-pointer' >Signup here</b></p>
            <p onClick={()=>{navigate("/resetotp")}}  >Forget Password</p>
          </form>
        </div>
        </div>
  )
}

export default Login

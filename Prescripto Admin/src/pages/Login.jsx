import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { asyncLoginAdmin } from '../redux/action/adminAction';
import { asyncLoginDoctor } from '../redux/action/doctorAction';
function Login() {
    const [state,setState]=useState("admin");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [data,setData]=useState({
      email:"",
      password:""
    })
    const onChangeHandler=async(e)=>
    {
      e.preventDefault();
      setData({...data,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>
    {
      e.preventDefault();
      if(state==="admin")
      {
          dispatch(asyncLoginAdmin(data,navigate));
      }
      else
      {
         dispatch(asyncLoginDoctor(data,navigate));
      }
    }
  return (
          <div className='fixed py-10 mt-40  bg-white  max-md:mx-[20%] px-10 shadow-xl shadow-black max-md:px-6  mx-[40%]  rounded-lg'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-1' action="">
             <h1 className='text-blue-800 font-bold text-center text-2xl py-2 pb-4'  >{state} Login</h1>
            <label htmlFor="">Email</label>
            <input className='border-1 border-gray-700 rounded-lg py-1 px-4' onChange={onChangeHandler} name="email" type="text" />
            <label htmlFor="">Password</label> 
            <input className='border-1 border-gray-700 rounded-lg py-1 px-4'onChange={onChangeHandler}  name="password" type="password" />
            <button className='bg-indigo-950 mt-2 rounded-md px-4 py-2  text-white'>Login</button>
            <p>{state==="admin"?'Doctor Login':'Admin Login'}?<b onClick={()=>{state==='admin'?setState('doctor'):setState('admin')}} className='cursor-pointer' >Click here</b></p>
          </form>
        </div>
  );

}

export default Login

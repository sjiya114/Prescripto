import React from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useRef } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctors } from '../../redux/reducer/AdminSlice';
import { asyncAddDoctor } from '../../redux/action/doctorAction';
import { useNavigate } from 'react-router-dom';
import { asyncAuthAdmin } from '../../redux/action/adminAction';
import { useEffect } from 'react';

function AddDoctor() {
  const adminState=useSelector((state)=>state.admin);
  const navigate=useNavigate();
   const [data,setData]=useState({
       image:null,
       name:"",
       speciality:"General Physician",
       email:"",
       education:"",
       password:"",
       line1:"",
       line2:"",
       experience:"",
       about:"",
       fees:""
   });
   const dispatch=useDispatch();
   const specialists = ["General physician", "Gynecologist", "Dermatologist", "Pediatricians",
    "Neurologist", "Gastroenterologist"];
     useEffect(()=>
      {
       dispatch(asyncAuthAdmin(navigate));
      },[]);
   const onChangeHandler=(e)=>
   {
    e.preventDefault();
    if(e.target.name==="image")
      setData({...data,[e.target.name]:e.target.files[0]});
    else
    setData({...data,[e.target.name]:e.target.value});
   }
   const fileInput=useRef(null);
   const handleSubmit=async(e)=>
   {
     e.preventDefault();
     console.log(data.speciality);
     let formData=new FormData();
     formData.append("image",data.image);
     formData.append("name",data.name);
     formData.append("speciality",data.speciality);
     formData.append("email",data.email);
     formData.append("degree",data.education);
     formData.append("password",data.password);
     formData.append("line1",data.line1);
     formData.append("line2",data.line2);
     formData.append("experience",data.experience);
     formData.append("description",data.about);
     formData.append("fees",data.fees);
     dispatch(asyncAddDoctor(formData)).then(()=>
    {
     setData({
         image:"",
       name:"",
       speciality:"",
       email:"",
       education:"",
       password:"",
       line1:"",
       line2:"",
       experience:"",
       about:"",
       fees:""
      });
      fileInput.current=null;
    })
      
   }

  return (
    <div className='mt-30 mx-8 max-md:ml-4 max-md:mr-6 w-full h-screen'>
        <h1 className='text-black font-bold font-serif text-4xl'>Add Doctor</h1>
       <form id="form" onSubmit={handleSubmit}   className='flex flex-col space-y-1 py-4  bg-white border-gray-400 px-8 rounded-md w-full border-2 '   action="">
          <div className='flex flex-row max-md:flex-col max-md:space-y-2 space-x-4'>
        <img src={assets.upload_area} className='w-40 h-40' alt="" />
         <input type="file" ref={fileInput} onChange={onChangeHandler}   name='image' id='image' hidden />
         <label htmlFor="image" className='px-4 py-8'>Upload Doctor Picture</label>
          </div>
         <div className='flex flex-row max-md:flex-col max-md:space-y-2 space-x-4'>
            <div className='flex flex-col  space-y-2'>
            <label htmlFor="">Name</label>
         <input className='border-1 w-80 px-2 py-1 border-gray-600 rounded-md'  type="text" onChange={onChangeHandler} value={data.name} name="name" id="" />
            </div>
           <div className='flex flex-col  space-y-2' >
             <label htmlFor="">Speciality</label>
          <select className='border-1 w-80 px-2 py-1 border-gray-600 rounded-md' value={data.speciality} onChange={onChangeHandler}  name="speciality" id="">
            {
              specialists.map((speciality,index)=>(
              <option key={index}  value={speciality} >{speciality}</option>
              ))
            }
          </select>
           </div>
         </div>
           <div className='flex flex-row max-md:flex-col max-md:space-y-2 space-x-4'>
            <div className='flex flex-col  space-y-2'>
        <label htmlFor="">Your Email</label>
          <input onChange={onChangeHandler} value={data.email} name='email'  className='border-1 w-80 py-1 border-gray-600 rounded-md' type="text" />
            </div>
             <div className='flex flex-col  space-y-2'>
               <label htmlFor="">Education</label>
          <input onChange={onChangeHandler} value={data.education} name='education' className='border-1  w-80 px-2 py-1 border-gray-600 rounded-md' type="text" />
             </div>
           </div>
          <div className='flex flex-row max-md:flex-col max-md:space-y-2 space-x-4' >
            <div className='flex flex-col space-y-2'>
               <label htmlFor="">Your Password</label>
          <input onChange={onChangeHandler} value={data.password} name='password' className='border-1 w-80 px-2 py-1 border-gray-600 rounded-md' type="password" />
            </div>
          <div className='flex flex-col space-y-2'>
            <label htmlFor="">Address</label>
          <input onChange={onChangeHandler} value={data.line1} name='line1' className='border-1 w-80 px-2 py-1 border-gray-600 rounded-md' type="text" />
           <input onChange={onChangeHandler} value={data.line2} name='line2' className='border-1 w-80 px-2 py-1 border-gray-600 rounded-md' type="text" />
          </div>
          </div>
           <div className='flex flex-col  space-y-2'>
             <label htmlFor="">Experience</label>
             <input onChange={onChangeHandler} value={data.experience} name='experience' className='border-1 px-2 py-1 border-gray-600 rounded-md' type="text" />
           </div>
             <div className='flex flex-col  space-y-2'>
            <label htmlFor="">Fees</label>
            <input onChange={onChangeHandler} value={data.fees} name='fees' className='border-1 px-2 py-1 border-gray-600 rounded-md' type="text" />
             </div>
             <div className='flex flex-col  space-y-2'>
            <label htmlFor="">About Me</label>
               <textarea onChange={onChangeHandler} value={data.about} name='about' className='border-1 px-2 py-1 border-gray-600 rounded-md' placeholder='write about yourself...'  row={5} cols={6} id=""></textarea>
             </div>
            <button className='text-white w-fit px-8 py-2 bg-blue-950 rounded-2xl text-sm'>Add Doctor</button>
       </form>
    </div>
  )
}

export default AddDoctor

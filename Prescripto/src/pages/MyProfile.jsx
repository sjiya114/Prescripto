import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpdateProfile } from '../store/actions/UserAction';
import { asyncAuthUser } from '../store/actions/UserAction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
  const fileInput=useRef(null);
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.users);
  const navigate=useNavigate();

  const [data,setData]=useState({
    id:user._id,
    name:user.name,
    phone:user.phone,
    image:user.image || null,
    address:user.address,
    gender:user.gender,
    dob:user.dob
  });
   useEffect(()=>
        {
         dispatch(asyncAuthUser(navigate));
        },[]);
  const onChangeHandler=(e)=>
  {
     e.preventDefault();
    if(e.target.name==="image")
    {
      setData({...data,[e.target.name]:e.target.files[0]});
    }
    else{
    setData({...data,[e.target.name]:e.target.value});
    }
  }
  const [edit,setEdit]=useState(false);

  const handleSubmit=async(e)=>
  {
   e.preventDefault();
   const formData=new FormData();
   formData.append("id",data.id);
   formData.append("name",data.name);
   formData.append("phone",data.phone);
   formData.append("image",data.image)
   formData.append("address",data.address);
   formData.append("gender",data.gender);
   formData.append("dob",data.dob);  
   
  //  const res=await axios.post("",formData);
  //  if(res.data.success)
  //  {
  //     toast.success(res.data.message);
     dispatch(asyncUpdateProfile(formData)).then(()=>
    {
  setData({
    id:user._id,
    name:user.name,
    phone:user.phone,
    image:user.image,
    address:user.address,
    gender:user.gender,
    dob:user.dob
  })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className='mx-20 mt-40'>
     <label htmlFor="image">
        <img src={user.image || assets.upload_area }  alt="Profile" />
      </label>
        {edit?<input type="file" onChange={onChangeHandler}  name='image' id='image'  hidden />:<></>}
       <div className='w-1/2 max-md:w-full'>
         { edit? <input className='text-2xl font-bold  text-gray-700 py-2' onChange={onChangeHandler} value={data.name} type="text" name="name" id="name" />
         :<h1 className='text-2xl font-bold  text-gray-700 py-2'>{data.name}</h1> }
         <hr className='bg-gray-300 h-1' />
         <h1 className='text-gray-500 underline text-lg'>CONTACT INFORMATION</h1>
         <p className='flex flex-row  max-md:flex-col justify-between'><span>Email Id:</span> <span>{user.email}</span></p>
         {
          edit?<>
            <p className='flex flex-row max-md:flex-col  justify-between'><span>Phone:</span> <input type='text' onChange={onChangeHandler} value={data.phone} className='border-1 border-gray-600 px-2 py-1 rounded-lg'  name='phone'   /></p>
          </>:
          <>
           <p className='flex flex-row  max-md:flex-col justify-between'><span>Phone:</span> <span>{data.phone}</span></p>
          </>
         }
         {
          edit?<>
             <p className='flex flex-row   max-md:flex-col justify-between'><span>Address:</span> <input type='text' onChange={onChangeHandler} value={data.address} className='border-1 border-gray-600 px-2 py-1 rounded-lg'  name='address' /></p>
          </>:
          <>
           <p className='flex flex-row  max-md:flex-col justify-between'><span>Address:</span> <span>{data.address}</span></p>
          </>
         }
         <br />
         <h1 className='text-gray-500 underline text-lg'>BASIC INFORMATION</h1>
          {
          edit?<>
            <p className='flex flex-row  max-md:flex-col justify-between'><span>Gender:</span> <input type='text' onChange={onChangeHandler} value={data.gender} className='border-1 border-gray-600 px-2 py-1 rounded-lg'  name='gender'  /> </p>
          </>:
          <>
           <p className='flex flex-row  max-md:flex-col justify-between'><span>Gender:</span> <span>{data.gender}</span></p>
          </>
         }
          {
          edit?<>
            <p className='flex flex-row  max-md:flex-col justify-between'><span>Birthday:</span> <input type='date' onChange={onChangeHandler} value={data.dob} className='border-1 border-gray-600 px-2 py-1 rounded-lg'  name='dob' /></p>
          </>:
          <>
           <p className='flex flex-row  max-md:flex-col justify-between'><span>Birthday:</span> <span>{data.dob}</span></p>
          </>
         }
         <br />
         <div className='flex flex-row justify-between'>
          <button type="button" onClick={()=>{setEdit(true)}} className={`px-6 py-1  ${edit?'disabled':'enabled'}   rounded-2xl border-gray-600 border-1`}>Edit</button>
          <button type='submit' onClick={()=>{setEdit(false)}}   className={`px-2 py-1 ${!edit?'disabled':'enabled'}  rounded-2xl border-gray-600 border-1`}>Save Information</button>
         </div>
         
       </div>
      
    </div>
    </form>
  )
}

export default MyProfile

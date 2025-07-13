import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducer/UserSlice';
function Navbar({sign,setSign}) {
  const {token,user}=useSelector((state)=>state.users);
  const [hidden,setHidden]=useState(true);
  // const [token,setToken]=useState(true);
  const [menu,setMenu]=useState(false);
  const [open,setOpen]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  return (
    <>
    <div className='flex max-md:hidden min-lg:visible    items-center max-md:px-10 max-md:right-10 bg-white rounded-lg mt-4 px-4 hover:border-indigo-900 hover:text-white max-md:left-10 max-sm:flex-col  max-sm:space-y-4 justify-between mb-5 py-4 fixed top-0 right-20 left-20 border-b-2  shadow-2xl shadow-black/60 border-b-gray-400   '>
        <div  className='flex flex-row justify-between'>
          <img onClick={()=>{navigate("/")}} src={assets.logo} className='cursor-pointer' alt="" />
        </div>
      < ul className='flex flex-col min-md:flex-row max-sm:space-y-4 space-x-6 text-blue-900 font-bold text-xl'>
      <NavLink to="/">
        <li >Home</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
      <NavLink to='/doctor'>
        <li>Doctors</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
      <NavLink to="/about">
        <li>About</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
      <NavLink to="/contact">
        <li>Contact</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
     
      </ul>
           <>
            {token?
            <div className='flex flex-row space-x-2'>
            <img src={user.image} className='rounded-full w-20 h-20' alt="" />
            <img src={assets.dropdown_icon} onClick={()=>{setMenu(!menu)}} alt="" />
             {menu && <div className='flex flex-col bg-white text-black  absolute mt-20 px-1 py-1 rounded-md border-2 border-gray-200'>
                <ul>
                  <li className='hover:bg-gray-400 cursor-pointer'><Link to="/profile">My Profile</Link></li>
                  <li className='hover:bg-gray-400 cursor-pointer'><Link to="/myappointments" onClick={(e)=>{setMenu(false)}}  >My Appointments</Link></li>
                  <li className='hover:bg-gray-400 cursor-pointer'><Link onClick={ ()=>{dispatch(logout())}}  >LogOut</Link></li>
                </ul>
             </div>}
            </div>:
           <button onClick={()=>{navigate("/signup")}}  className='border-2 border-blue-900 rounded-xl bg-blue-800 text-sm font-bold  text-white px-2 py-2 cursor-pointer'>Create Account</button>
             }
           </>
          </div>
          {/* mobile */}
     <div className='flex flex-col   md:hidden  rounded-lg mt-4 px-4 hover:border-indigo-900 hover:text-white justify-between mb-5 py-4 fixed top-0 right-10 left-10 bg-white border-b-2  shadow-2xl shadow-black/60 border-b-gray-400   '>
        <div className='flex  flex-row justify-between'>
          <img onClick={()=>{navigate("/")}} src={assets.logo} className='cursor-pointer' alt="" />
          <img onClick={()=>{setHidden(!hidden)}}  src={`${hidden?assets.menu_icon:assets.cross_icon}`} className='w-8 h-8 mt-2' alt=""/>
        </div>
        {!hidden  && < ul className='flex flex-col bg-white  items-center space-y-4  text-blue-900 font-bold text-xl'>
      <NavLink to="/">
        <li >Home</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
      <NavLink to='/doctor'>
        <li>Doctors</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
      <NavLink to="/about">
        <li>About</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
      <NavLink to="/contact">
        <li>Contact</li>
        <hr className='w-0.8 h-0.5 bg-black' />
      </NavLink>
       { token ? !hidden && 
            <div className='flex flex-row space-x-2'>
            <img src={user.image} className='rounded-full w-20 h-20' alt="" />
            <img src={assets.dropdown_icon} onClick={()=>{setMenu(!menu)}} alt="" />
             {menu && <div className='flex flex-col bg-white text-black  absolute mt-20 px-1 py-1 rounded-md border-2 border-gray-200'>
                <ul>
                  <li className='hover:bg-gray-400 cursor-pointer'><Link to="/profile">My Profile</Link></li>
                  <li className='hover:bg-gray-400 cursor-pointer'><Link to="/myappointments" onClick={(e)=>{setMenu(false)}}  >My Appointments</Link></li>
                  <li className='hover:bg-gray-400 cursor-pointer'><Link onClick={ ()=>{dispatch(logout())}   }>LogOut</Link></li>
                </ul>
             </div>}
            </div>:!hidden && 
           <button onClick={()=>{navigate("/signup")}}  className='border-2 border-blue-900 rounded-xl bg-blue-800 text-sm font-bold  text-white px-2 py-2 cursor-pointer'>Create Account</button>
        
           }
      </ul> 
}
            
             </div> 
           </>
  )
}

export default Navbar

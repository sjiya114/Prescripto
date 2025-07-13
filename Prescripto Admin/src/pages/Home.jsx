import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
function Home() {
    const [hidden,setHidden]=useState(false);
  return (
    <>
    <Navbar hidden={hidden} setHidden={setHidden}/>
    <div className='flex '>
     <Sidebar hidden={hidden} setHidden={setHidden} />
       <div>
        <Outlet/>
       </div>
    </div>
     
    </>
  )
}

export default Home

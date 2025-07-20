import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets.js'
import Title from './Title.jsx'
import { useNavigate } from 'react-router-dom'
function Speciality() { const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center  space-y-4 justify-center mt-10 mx-20 max-md:mx-15 '>
       <Title title="Find By Speciality" description="Simply browse through our extensive list of trusted doctors,schedule your appointment hassle free."  />
       <div className='flex flex-row flex-wrap  space-y-2 items-center justify-center space-x-8'>
         {specialityData.map((element,index)=>
        (
            <div onClick={()=>{navigate("/doctor",{state:{speciality:element.speciality}}),scroll(0,0,0)}}   className='flex flex-col space-y-2'>
                <img src={element.image} className='w-30 h-30  hover:-translate-y-6 ' alt="" />
                <p>{element.speciality}</p>
            </div>
            
        ))}
       </div>
    </div>
  )
}

export default Speciality

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { asyncgetDoctors } from '../store/actions/DoctorAction';
function Doctor() {
  const [category, setCategory] = useState("all");
  const specialists = ["General Physician", "Gynecologist", "Dermatologist", "Pediatricians",
    "Neurologist", "Gastroenterologist"];
    const navigate=useNavigate();
     const dispatch=useDispatch();
      const doctorState =useSelector((state)=>state.doctors);
        const [doctors,setDoctors]=useState(doctorState.doctors);
      const [filteredOne,setFilteredOne]=useState(doctors);
        useEffect(()=>
      { 
         dispatch(asyncgetDoctors());
      },[dispatch])
    
  const updateOne = () => {
    if(category==="all")
    {
      setFilteredOne(doctors);
    }
    else{
    const filtered = doctors.filter((doctor) =>{
       return doctor.speciality.includes(category);
    }
    );
    setFilteredOne(filtered);
  }
  }
  useEffect(()=>
  {
    updateOne();
  },[category]);

  return (
    <>
      <div className='mt-40 mx-20  max-sm:mx-10 '>
        <p>Browse through the doctors specialists.</p>
      </div>
      <div className='mx-20  max-sm:mx-10  flex flex-row space-x-20 max-md:flex-col'>
        <div>
          <div className='flex flex-col max-md:flex-row items-center justify-center flex-wrap space-x-4 space-y-2 mt-6 text-gray-700 text-shadow-2xs text-shadow-black'>
            {specialists.map((type, index) => (
              <button  onClick={()=>{setCategory(type)}}  className={`border-2 w-40 mx-2 cursor-pointer ${category===type?'bg-blue-600 text-white':''} hover:bg-gray-200 border-gray-500 rounded-lg px-2 py-2`}>{type}</button>
            ))}
          </div>
        </div>
        <div className='flex flex-row flex-wrap space-x-6 space-y-10  mt-10  items-center justify-center rounded-lg'>
          {filteredOne.map((doctor) => (
            <div onClick={() => { navigate(`/appointments/${doctor._id}`) }} className='flex flex-col cursor-pointer transition-transform animate-[wiggle_1s_ease-in-out_infinite]  rounded-lg border-4 shadow-2xl hover:scale-110 shadow-gray-400  border-gray-200'>
              <div>
                <img src={doctor.image} className='w-68 h-68 bg-gray-500 rounded-lg' alt="" />
              </div>
              <div className='flex flex-col space-y-1 px-2 py-2'>
                <p className='text-green-600'>Available</p>
                <h1 className='font-bold'>{doctor.name}</h1>
                <p>{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Doctor

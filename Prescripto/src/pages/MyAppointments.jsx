import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, doctors } from '../assets/assets_frontend/assets';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Title from '../components/Title';
import { asyncgetDoctors } from '../store/actions/DoctorAction';
import { asyncBookAppointments } from '../store/actions/AppointmentAction';

function MyAppointments() {
  const { id } = useParams();
  // const [doctor, setDoctor] = useState(doctors);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  let dayOfWeek=["SUN","MON","TUE","WED","THU","FRI","SAT","SUN"]
  const {doctors}=useSelector((state)=>(state.doctors));
  const {user}=useSelector((state)=>state.users);
  const [doc, setDoc] = useState({});
   const [slotTime,setSlotTime]=useState(10);
   const [slotIndex,setSlotIndex]=useState(0);
   const [docSlots,setDocSlots]=useState([]);
    const [similar, setSimilar] = useState([]);
  const fetchDoctorInfo = () => {
    const docinfo = doctors.find((doct) => doct._id === id);
    setDoc(docinfo);
    const docs = doctors.filter((doct) => {
      return doct.speciality === docinfo.speciality;
    });
    setSimilar(docs);
  }
  useEffect(() => {
    dispatch(asyncgetDoctors());
    fetchDoctorInfo();
  }, [])

   const getAvailableSlots = async () => {
  setDocSlots([]);
  let today = new Date();
  let now = new Date(); // Added to get current time

  for (let i = 0; i < 7; i++) {
    let currDate = new Date(today);
    currDate.setDate(today.getDate() + i);

    let endTime = new Date(currDate);
    endTime.setHours(21, 0, 0, 0); // Set end time to 9:00 PM

    // Set start time
    if (today.getDate() === currDate.getDate()) {
      // For today, use current time rounded to next slot
      currDate.setHours(now.getHours());
      currDate.setMinutes(now.getMinutes());

      if (currDate.getMinutes() > 30) {
        currDate.setHours(currDate.getHours() + 1);
        currDate.setMinutes(0);
      } else if (currDate.getMinutes() > 0) {
        currDate.setMinutes(30);
      }

      // Ensure it doesn't start before 10:00 AM
      if (currDate.getHours() < 10) {
        currDate.setHours(10, 0, 0, 0);
      }
    } else {
      // For future days, start at 10:00 AM
      currDate.setHours(10, 0, 0, 0);
    }

    let timeSlots = [];
    while (currDate < endTime) {
      let formattedTime = currDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      timeSlots.push({
        dateTime: new Date(currDate),
        time: formattedTime
      });
      currDate.setMinutes(currDate.getMinutes() + 30);
    }

    setDocSlots((prev) => [...prev, timeSlots]);
  }
};

    // useEffect(()=>
    // {
    //  console.log(docSlots);
    // },[docSlots])
    useEffect(()=>
    {
     getAvailableSlots();
    },[doc])

    const handleSubmit=async(e)=>
    {
      e.preventDefault();
      const date=docSlots[slotIndex][0].dateTime;
      let day=date.getDate();
      let month=date.getMonth()+1;
      let year=date.getFullYear();
      const slotDate=day+"_"+month+"_"+year;
      const data= {userId:user._id,doctorId:id,slotDate:slotDate,slotTime:slotTime}
      dispatch(asyncBookAppointments(data));
    }

 
  return (
    <div className='mt-40 mx-20 max-md:mx-10 flex flex-col space-y-6'>
      <div className='flex flex-row max-md:flex-col space-x-4 space-y-6'>
        <div>
          <img src={doc.image} className='bg-indigo-200 hover:scale-120  rounded-lg border-blue-950 border-4' alt="image" />
        </div>
        <div className=' border-4 w-full shadow-2xl border-gray-400 rounded-lg px-4 py-4 '>
          <h1 className='text-2xl flex flex-row space-x-2'><b>{doc.name}</b><img src={assets.verified_icon} alt="" /></h1>
          <p></p>
          <p className=' text-gray-700 text-lg font-medium flex flex-row space-x-2'><span>{doc.degree}-{doc.speciality}</span> <span className='px-0.5 py-0.5 border-1 w-fit rounded-lg text-gray-700 border-gray-600'>{doc.experience}</span></p>
          <p className='text-lg flex flex-row space-x-2'><b>About</b> <img src={assets.info_icon} alt="" />  </p>
          <p className='text-lg text-gray-700 w-3/4'>{doc.description}</p>
          <p className='text-gray-700 font-medium text-lg'>Appointment Fee:<b className='text-black'>${doc.fees}</b></p>
        </div>
      </div>
      <form onSubmit={handleSubmit} >
      <div className='flex flex-col space-y-4'>
        <h1 className='text-2xl font-bold text-gray-700'>
          Booking Slots
        </h1>
        <div className='flex flex-row flex-wrap space-y-2 space-x-2 '>
          {docSlots.length && docSlots.map((item,index)=>
          (
            <div onClick={()=>{setSlotIndex(index)}}  className={`flex ${slotIndex===index?'bg-blue-700 text-white':''}  cursor-pointer flex-col border-2 border-gray-600 rounded-2xl px-3 py-3`} key={index}>
               <p>{item[0] && dayOfWeek[item[0].dateTime.getDay()] }</p>
               <p>{item[0] && item[0].dateTime.getDate()  }</p>
            </div>
          ))
          }
        </div>
        <div className='flex  flex-row flex-wrap gap-6 rounded-l-2xl '>
          {
            docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>{setSlotTime(item.time)}}   key={index} className={`text-blue-950 border-2 rounded-lg   ${slotTime===item.time?'bg-blue-700 text-white':''} border-blue-950 cursor-pointer px-2 py-2 `}  > {item.time.toLowerCase()} </p>
            ))
          }
        </div>
        <div>
         <button type='submit' onClick={()=>{!localStorage.getItem("token") && navigate("/login") }}   className='bg-blue-950 text-white px-2 py-2 rounded-2xl'  >{localStorage.getItem("token")?'Book An Appointment':'Login to book apppointment'}</button>
        </div>
      </div>
      </form>
      <div>
         <Title title="Related Doctors" description="Simply browse through extensive list of doctors." />
           <div className='flex flex-row flex-wrap space-x-6 space-y-10  mt-10 max-md:flex-col    items-center justify-center rounded-lg'>
          {similar.map((doctor) => (
            <Link to={`/appointments/${doctor._id}`}>
            <div  className='flex flex-col cursor-pointer transition-transform animate-[wiggle_1s_ease-in-out_infinite]  rounded-lg border-4 shadow-2xl hover:scale-110 shadow-gray-400  border-gray-200'>
              <div>
                <img src={doctor.image} className='w-68 h-68 bg-gray-500 rounded-lg' alt="" />
              </div>
              <div className='flex flex-col space-y-1 px-2 py-2'>
                <p className='text-green-600'>Available</p>
                <h1 className='font-bold'>{doctor.name}</h1>
                <p>{doctor.speciality}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}

export default MyAppointments

import React, { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Doctor from './pages/Doctor'
import MyAppointments from './pages/MyAppointments'
import Signup from './pages/Signup'
import MyProfile from './pages/MyProfile'
import Contact from './pages/Contact'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointments from './pages/Appointments'
import {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import ResetOtp from './pages/ResetOtp'
import ResetPassword from './pages/ResetPassword'
import { asyncAuthUser } from './store/actions/UserAction'
import BookingSlip from './pages/BookingSlip'

function App() {
  // const [sign,setSign]=useState(false);
  // const [log,setLog]=useState(false);
  const {token}=useSelector((state)=>state.users);
  return (
    <>
     {/* {!sign && <Navbar sign={sign} setSign={setSign}  />} */}
      {/* {sign && <Signup sign={sign} setSign={setSign} setLog={setLog}  />}
      {log && <Login log={log} setLog={setLog} setSign={setSign} /> } */}
        <Toaster/>
        <Navbar  />
     <Routes>
     <Route path='/' element={<Home/>}  />
     <Route path='/login' element={<Login/>}/>
     <Route path='/doctor' element={<Doctor/>}  />
     <Route path='/appointments/:id' element={<MyAppointments/>} />
     <Route path='/signup' element={<Signup/>} />
     <Route path='/about' element={<About/>}   />
     {token && <Route path='/profile' element={<MyProfile/>} />}
     <Route path='/contact' element={<Contact/>} />
     <Route path='/login' element={<Login/>} />
     {token && <Route path='/myappointments' element={<Appointments/>} />}
      <Route path='/resetotp' element={<ResetOtp/>}></Route>
      <Route path='/resetPassword' element={<ResetPassword/>}></Route>
      <Route path='/slip' element={<BookingSlip/>}  ></Route>
     </Routes>
    
     <Footer/>
    </>
  )
}

export default App

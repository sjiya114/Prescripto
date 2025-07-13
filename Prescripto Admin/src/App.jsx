import React from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import AddDoctor from './pages/Admin/AddDoctor'
import Home from './pages/Home'
import AllAppointments from './pages/Admin/AllAppointments'
import Dashboard from './pages/Admin/Dashboard'
import AllDoctor from './pages/Admin/AllDoctor'
import {Toaster} from 'react-hot-toast';
import Appointments from './pages/Doctor/appointments'
import Profile from './pages/Doctor/profile'
import DashBoard from './pages/Doctor/dashboard'
import EditProfile from './pages/Doctor/EditProfile'

function App() {
  return (
    <div>
      <Toaster/>
       <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}>
           <Route path='/home/admin/add' element={<AddDoctor/>}></Route>
           <Route path='/home/admin/appointment' element={<AllAppointments/>}></Route>
           <Route path='/home/admin' element={<Dashboard/>}></Route>
           <Route path='/home/admin/alldoctor' element={<AllDoctor/>}></Route>
           <Route path='/home/doctor/appointments' element={<Appointments/>}  ></Route>
           <Route path='/home/doctor/profile' element={<EditProfile/>} ></Route>
           <Route path='/home/doctor/dashboard' element={ <DashBoard/> }  ></Route>
        </Route>
       </Routes>
    </div>
  )
}

export default App

import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Speciality from '../components/Speciality'
import Title from '../components/Title'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
     <Header/>
     <Speciality/>
     <TopDoctors/>
     <Banner/>
     </>
    
  )
}

export default Home

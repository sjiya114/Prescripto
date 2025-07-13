import {configureStore} from '@reduxjs/toolkit'
import AdminSlice from './reducer/AdminSlice'
import DoctorSlice from './reducer/DoctorSlice'
import AdminAuthSlice from './reducer/AdminAuthSlice'
export const store=configureStore({
    reducer:{
        admin:AdminSlice,
        doctor:DoctorSlice,
        adminAuth:AdminAuthSlice
    }
})
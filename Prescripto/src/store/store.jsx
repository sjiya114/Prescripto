import {configureStore} from '@reduxjs/toolkit'
import doctorReducer from './reducer/DoctorSlice';
import userReducer from './reducer/UserSlice';
export const store=configureStore({
    reducer:{
        doctors:doctorReducer,
        users:userReducer
    }
})
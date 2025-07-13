require('dotenv').config();
const db=require('./config/db');
const cors=require('cors');
const express=require('express');
const connectCloudinary = require('./config/cloudinary');
const app=express();
const doctor=require('./routes/doctor');
connectCloudinary();
const doctorschema=require('./model/doctor');
const admin=require('./routes/admin');
const user=require('./routes/user');
const { stripeWebhooks } = require('./controller/stripeWebhooks');
app.use(express.json());
app.use(cors());
//API to listen to stripe webhook
app.post("/api/stripe",express.raw({type:"application/json"}),stripeWebhooks);
app.use("/doctor",doctor);
app.use("/admin",admin);
app.use("/user",user);
app.get("/",(req,res)=>
{
    res.send("API is working");
})
const port=process.env.PORT || 5000;
app.listen(port,()=>
{
    console.log("app start running on port "+port);
})
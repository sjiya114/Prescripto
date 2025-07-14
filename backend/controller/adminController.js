const {v2}=require('cloudinary');
const doctorModel=require('../model/doctor.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const validator=require('validator');
const user = require('../model/user.js');
const appointment = require('../model/appointment.js');

// API for adding doctor
module.exports.addDoctor=async(req,res)=>
{
    try {
       
        const {name,email,password,speciality,degree,experience,line1,line2,description,fees}=req.body;
        const image=req.file;
        if(!name || !email || !password || !speciality || !degree || !experience || !description || !fees || !line1 || !line2 || !image)
        {
            return res.json({success:false,message:"please enter all details"});
        }
       
        const upload=(await v2.uploader.upload(req.file.path)).secure_url;
        await Promise.all(upload);
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
      
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"please enter a valid email"});
        }
      const doctor=new doctorModel({
            name:name,email:email,password:hashedPassword,speciality:speciality,
            degree:degree,experience:experience,description:description,
            fees:fees,address:{line1:line1,line2:line2},image:upload,
            date:Date.now
        });
        await doctor.save();
        res.json({success:true,message:"Doctor added successfully",doctors:doctor});

    } catch (error) {
         res.json({success:false,error:error.message});
    }
 
}
//API for admin login
module.exports.adminLogin=async(req,res)=>
{
    try {
       
        const {email,password}=req.body; 
       
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
        {
            const token=jwt.sign({email:email,password:password},process.env.JWT_SECRET);
            res.json({success:true,message:"Admin logged in successfully",token:token});
        }
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
// API to get all doctors list for admin panel
module.exports.getAll=async(req,res)=>
{
    try {
        const list=await doctorModel.find({});
        res.json({success:true,doctorList:list});
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
module.exports.authAdmin=(req,res)=>
{
    try {
       res.json({success:true}); 
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
module.exports.adminDashboard=async(req,res)=>
{
    try {
        const doctors=await doctorModel.find({});
        const users=await user.find({});
        const appointments=await appointment.find({}).populate("userId").populate("doctorId");
        const dashData={
           doctors:doctors.length,
           users:users.length,
           appointments:appointments.length,
           latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData:dashData});
    } catch (error) {
        return res.json({success:false,error:error.message});
    }
}
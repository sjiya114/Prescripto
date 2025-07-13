const jwt=require('jsonwebtoken');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const userModel=require('../model/user');
// import {v2 as cloudinary} from 'cloudinary';
const {v2} =require('cloudinary');
const { transporter } = require('../config/nodemailer');
const generateToken=async function(email,id)
{
   return await jwt.sign({email,id},process.env.JWT_SECRET);
}

//API for user registration
module.exports.register=async(req,res)=>
{
    try {
       const {name,email,password}=req.body; 
       if(!validator.isEmail(email))
        return res.json({success:false,message:"please enter a valid email"});
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt); 
       const user=new userModel({
        name:name,
        email:email,
        password:hashedPassword
       });
       await user.save();
        const token=generateToken(email,user._id);
       res.json({success:true,message:"user created successfully",user:user,token:token});
    } catch (error) {
        res.json({success:false,error:error.message});
    } 
}
//API for user login
module.exports.login=async(req,res)=>
{
      try {
            const {email,password}=req.body;  
            if(!validator.isEmail(email))
                 return res.json({success:false,message:"please enter a valid email"});
            const decodeduser=await userModel.findOne({email:email});
            if(!decodeduser)
                {
                    return res.json({success:false,message:"matching user or password not found"}); 
                } 
            const match=await bcrypt.compare(password,decodeduser.password);
            if(!match)
                 return res.json({success:false,message:"matching user or password not found"}); 
            const token=await generateToken(email,decodeduser._id);
            console.log("tt: "+token);
            res.json({success:true,message:"logged in successfully",user:decodeduser,token:token});
        } catch (error) {
            res.json({success:false,error:error.message});
        }
}

//API for getting user profile
module.exports.getProfile=(req,res)=>
{
    try {
       res.json({success:true,user:req.user,token:req.token}); 
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}


//API to update user profile
module.exports.updateProfile=async(req,res)=>
{
    try {
        
        
        const { name,address, gender, dob,phone,id}=req.body;
        
        if(!name || !phone || !gender || !address)
        {
            return res.json({success:false,message:"data is missing"});
        }
        
        const image=req.file;
        let user=await userModel.findByIdAndUpdate({_id:id},{name:name,phone:phone,gender:gender,dob:dob,address:address
            ,age:new Date(Date.now()).getFullYear()-new Date(dob).getFullYear()
        });
        
       if(image){
        const upload=(await v2.uploader.upload(req.file.path)).secure_url;
        await Promise.all(upload);
         user= await userModel.findByIdAndUpdate({_id:id},{image:upload},{new:true});
       }
     
       res.json({success:true,message:"profile updated successully",user:user});

    } catch (error) {
        return res.json({success:false,error:error.message});
    }
}

//Send password reset OTP
module.exports.sendResetOtp=async(req,res)=>
{
    const {email}=req.body;
   
    if(!email)
    {
        res.json({success:false,message:"email is required for otp reset"});
    }
    try {
         
        const user=await userModel.findOne({email:email});
        const otp=Math.floor((100000+Math.random()*900000));
        user.resetOtp=otp;
        user.resetOtpExpireAt=Date.now()+15*60*1000;
        await user.save();
         
        const mailOption={
            from:process.env.SENDER_MAIL,
            to:user.email,
            subject:"Password Reset OTP",
            text:`Your OTP for resetting password is ${otp}.Use this otp to proceed for resetting password`
        }
        await transporter.sendMail(mailOption);
        
        return res.json({success:true,message:"Otp send to your email"});
        
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
//user reset password
module.exports.resetPassword=async(req,res)=>
{
    const {email,otp,newPassword}=req.body;
    if(!email || !otp || !newPassword)
    {
        res.json({success:false,message:"email,otp and password all are required"});
    }
    try {
        const user=await userModel.findOne({email:email});
        if(!user)
            return res.json({success:false,message:"user is not registered"});
        if(user.resetOtp==="" || user.resetOtp!==user.resetOtp  )
             return res.json({success:false,message:"invalid otp"});
        if(user.resetOtpExpireAt<Date.now())
            return res.json({success:false,message:"Otp expired"});
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt); 
        user.password=hashedPassword;
        user.resetOtp='';
        user.resetOtpExpireAt=0;
        await user.save();
       res.json({success:true,message:"password reset successfully"});
        
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}


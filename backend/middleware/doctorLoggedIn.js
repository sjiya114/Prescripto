const jwt=require('jsonwebtoken');
const doctorModel=require('../model/doctor');
//middleware for checking if user is logged in or not
module.exports.doctorIsLoggedIn=async(req,res,next)=>
{
    try {
        const token = req.headers.token;
        if(!token)
        {
            return res.json({success:false,message:"error while accessing token"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded || !decoded.id)
        return res.json({success:false,message:"error while verifying token"});
        const doctor=await doctorModel.findOne({id:decoded._id});
        req.doctor=doctor;
        next();
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
const jwt=require('jsonwebtoken');
const userModel=require('../model/user');
//middleware for checking if user is logged in or not
module.exports.userIsLoggedIn=async(req,res,next)=>
{
    try {
       const token = req.headers.token;
        if(!token)
        {

            return res.json({success:false,message:"error while accessing token"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
         console.log("step1");
        if(!decoded || !decoded.id) 
        return res.json({success:false,message:"error while verifying token"});
        const user=await userModel.findOne({_id:decoded.id});
        console.log("step2");
        req.user=user;
         console.log("step3");
        next();
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
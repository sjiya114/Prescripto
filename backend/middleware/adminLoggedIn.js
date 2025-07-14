const jwt=require('jsonwebtoken');
//middleware for checking if admin is already logged in or not
module.exports.adminIsLoggedIn=async(req,res,next)=>
{
    try {
        const token = req.headers.token;
        if(!token)
        {

            return res.json({success:false,message:"error while accessing token"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
         console.log("step2");
        if(decoded.email!==process.env.ADMIN_EMAIL || decoded.password!==process.env.ADMIN_PASSWORD)
        {
               return res.json({success:false,message:"error while logging admin"});
        }
        next();
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
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
        const tkn=jwt.sign(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD,process.env.JWT_SECRET);
        const match=jwt.verify(token,tkn);
        if(match!=(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD))
            return res.json({success:false,message:"error while logging admin"});
        next();
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
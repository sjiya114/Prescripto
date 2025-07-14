const doctorModel = require('../model/doctor')
const jwt=require('jsonwebtoken');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const appointment = require('../model/appointment');
const { default: mongoose } = require('mongoose');
const generateToken=async function(email,id)
{
   return jwt.sign({email,id},process.env.JWT_SECRET);
}

module.exports.changeAvailability = async (req, res) => {
    try {
        const { id } = req.body;
         const doc=await doctorModel.findOne({_id:id});
        const doctor = await doctorModel.findOneAndUpdate({ _id: id }, { available:!doc.available }, { new: true });
        if (doctor)
            return res.json({ success: true, message: "availability updated successfully" });
        res.json({ success: false, message: "error while changing availability" });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}
//API for doctor login
module.exports.login=async(req,res)=>
{
      try {
            const {email,password}=req.body; 
            
            if(!validator.isEmail(email))
                 return res.json({success:false,message:"please enter a valid email"});
            const decodeduser=await doctorModel.findOne({email:email});
            if(!decodeduser)
                {
                    return res.json({success:false,message:"matching user or password not found"}); 
                } 
              
            const match=await bcrypt.compare(password,decodeduser.password);
            if(!match)
                 return res.json({success:false,message:"matching user or password not found"}); 
            const token=await generateToken(email,decodeduser._id);
           
            res.json({success:true,message:"logged in successfully",token:token,docId:decodeduser._id,doctor:decodeduser});
        } catch (error) {
            res.json({success:false,error:error.message});
        }
}
//API for doctor auth
module.exports.authDoctor=(req,res)=>
{
    try {
       res.json({success:true,doctor:req.doctor}); 
    } catch (error) {
        res.json({success:false,error:error.message});
    }
}
module.exports.editDoctor=async(req,res)=>
{
          try{
           
            const {name,email,speciality,degree,experience,line1,line2,description,fees}=req.body;
            
            const image=req.file;
            let doc=await doctorModel.findOneAndUpdate({email:email},{ name:name,speciality:speciality,
            degree:degree,experience:experience,description:description,
            fees:fees,address:{line1:line1,line2:line2},
            });
            
           if(image){
            const upload=(await v2.uploader.upload(req.file.path)).secure_url;
            await Promise.all(upload);
             doc= await doctorModel.findByIdAndUpdate({_id:id},{image:upload},{new:true});
           }
           
           res.json({success:true,message:"profile updated successully",doctor:doc});
    
        } catch (error) {
            return res.json({success:false,error:error.message});
        }
    }
module.exports.doctorDashboard=async(req,res)=>
{
  try {
    const {docId}=req.params;
    const appointments=await appointment.find({doctorId:new mongoose.Types.ObjectId(docId)}).populate("userId").populate("doctorId");
    let earning=0;
    appointments.map((appoint)=>
    {
        if(appoint.isCompleted || appoint.payment)
            earning+=appoint.amount;
    })
    let patients=[];
    appointments.map((item)=>
    {
      if(!patients.includes(item.userId))
        patients.push(item.userId);
    });
    const dashData={
        earning:earning,
        appointments:appointments.length,
        patients:patients.length,
        latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData:dashData});

  } catch (error) {
    return res.json({success:false,error:error.message});
  }  
}
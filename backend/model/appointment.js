const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.ObjectId,ref:'users'},
   doctorId:{type:mongoose.Schema.ObjectId,ref:'doctors'},
   slotDate:{type:String,required:true},
   slotTime:{type:String,required:true},
   amount:{type:Number,required:true},
   date:{type:String,required:true},
   cancelled:{type:Boolean,default:false},
   payment:{type:Boolean,default:false},
   isCompleted:{type:Boolean,default:false}
}, { timestamps: true});
appointmentSchema.index = { name: "text", speciality: "text" };
module.exports = mongoose.model("appointments", appointmentSchema);
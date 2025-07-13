const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
         type: String,required: true
        },
    email:{  
         type: String,required: true,
        unique: true
    },
    password:
    {
        type: String,required: true
    },
    image: {
        type: String, default:""
    },
    address: {
         type:String,
    },
    gender:{
        type:String,
    },
    dob:
    {
         type:String
    },
    age:
    {
        type:String
    },
    phone:
    {
        type:String
    },
    resetOtp:
    {
       type:String,
       default:''
    },
    resetOtpExpireAt:
    {
      type:Number,
      default:0
    }
}, { timestamps: true });
userSchema.index = { name: "text", gender: "text" };
module.exports = mongoose.model("users", userSchema);
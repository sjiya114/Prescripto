const mongoose=require('mongoose');
const db=mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("connected to db successfully"));
module.exports=db;
const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    speciality:
    {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience:
    {
        type: Number,
        required: true,
        default: 0
    },
    description:
    {
        type: String,
        required: true
    },
    fees:
    {
        type: Number,
        required: true
    },
    address: {
        line1: { type: String },
        line2: { type: String }
    },
    available: {
        type: Boolean,
        required: true,
        default:true
    },
    slots_booked: {
        type: Object, default: {}
    },
    date:
    {
        type:String
    }
}, { timestamps: true, minimize: false });
doctorSchema.index = { name: "text", speciality: "text" };
module.exports = mongoose.model("doctors", doctorSchema);
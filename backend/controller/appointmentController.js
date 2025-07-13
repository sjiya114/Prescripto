const appointment = require('../model/appointment');
const doctorModel = require('../model/doctor');
const userModel = require('../model/user');
const mongoose = require('mongoose');
const stripe = require('stripe');
//API to book appointment
module.exports.book = async (req, res) => {
    try {
        const { userId, doctorId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findOne({ _id: doctorId }).select("-password");
        if (!docData.available)
            return res.json({ success: false, message: "doctor is not available" });
        let bookedslots = docData.slots_booked;
        //checking for slot avilability
        if (bookedslots[slotDate]) {
            if (bookedslots[slotDate].includes(slotTime))
                return res.json({ success: false, message: "slot is already booked" });
            else
                bookedslots[slotDate].push(slotTime);
        }
        else {
            bookedslots[slotDate] = [];
            bookedslots[slotDate].push(slotTime);
        }
        const newAppointment = new appointment({
            userId: userId,
            doctorId: doctorId,
            slotDate: slotDate,
            slotTime: slotTime,
            amount: docData.fees,
            date: slotDate,
        })
        await newAppointment.save();
        await doctorModel.findByIdAndUpdate({ _id: doctorId }, { slots_booked: bookedslots });
        res.json({ success: true, message: "appointment booked successfully", appointments: newAppointment });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

//API to get list of appointments of specific user
module.exports.getAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
      
        const appointments = await appointment.find({ userId: new mongoose.Types.ObjectId(userId) }).populate("userId").populate("doctorId");
      
        res.json({ success: true, appointments: appointments });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}
//API to get appointments of specific doctor
module.exports.getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const appointments = await appointment.find({ doctorId: new mongoose.Types.ObjectId(doctorId) }).populate("userId").populate("doctorId");
        res.json({ success: true, appointments: appointments });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

//API to get list of all appointments
module.exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointment.find({}).populate("userId").populate("doctorId");
        res.json({ success: true, appointments: appointments });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}
//API to get list of all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, users: users });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

//API to cancel user appointment
module.exports.cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointment.findOne({ _id: appointmentId });
       
        if (appointmentData.userId.toString() !== userId)
            return res.json({ success: false, message: "unauthorized action" });
        const appoint = await appointment.findByIdAndUpdate({ _id: appointmentId }, { cancelled: true });
        //we have to release the booked slot
        const { doctorId, slotDate, slotTime } = appoint;
       
        const docData = await doctorModel.findOne({ _id: doctorId });
        // let slots_booked = docData.slots_booked;
        // const updated = slots_booked[slotDate].filter(e => e !== slotTime);

          let slots_booked = docData.slots_booked || {};

        if (!Array.isArray(slots_booked[slotDate])) {
            return res.json({ success: false, message: `No booked slots for date: ${slotDate}` });
        }

        const updatedSlotArray = slots_booked[slotDate].filter(e => e !== slotTime);
        slots_booked[slotDate] = updatedSlotArray;
       
        await doctorModel.updateOne({ _id: doctorId }, { slots_booked: updatedSlotArray });
         const updatedAppointments = await appointment.find({ userId:new mongoose.Types.ObjectId(userId)  }).populate("userId").populate("doctorId");
        res.json({ success: true, message: "appointment cancelled successfully",appointments:updatedAppointments });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}
// API to make payment using stripe
module.exports.stripePayment = async (req, res) => {
    try {
        const { appointmentId, userId } = req.body;
        const appointments = await appointment.findOne({ _id: appointmentId });
        if (appointments.userId.toString() !== userId)
            return res.json({ success: false, message: "unauthorized action" });
        const totalPrice = appointments.amount;
        //from this we will get frontend url
        const { origin } = req.headers;
        //create stripe instance
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        //now we will create line items for the stripe payment it will contain currency,amount etc.
        const line_items = [
            {
                price_data: {
                    currency: 'sgd',
                    product_data: {
                        name: 'Doctor Appointment',  // visible in Stripe Checkout
                        description: `Booking for user: ${userId}`, // optional
                    },
                unit_amount: totalPrice * 100
            },
            quantity: 1
            },
           
        ]
    //create checkout session
    const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/myappointments`,
        cancel_url: `${origin}/myappointments`,
        metadata:
        {
            appointmentId: appointmentId
        }
    })
    res.json({ success: true, session: session.url, message: "Payment done successfully" });


} catch (error) {
    res.json({ success: false, message: "Payment failed", error: error.message });
}
}

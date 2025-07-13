const mongoose=require('mongoose');
const appointmentModel=require('../model/appointment');

const stripe=require('stripe');
module.exports.stripeWebhooks=async(req,res)=>
{
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
    const sig=req.headers['stripe-signature'];
    let event;
    try {
        event=stripeInstance.webhooks.constructEvent(req.body,sig,process.env.STRIPE_SIGNING_SECRET);
    } catch (error) {
        res.json({success:false,error:error.message});
    }
    if(event.type==="payment_intent.succeeded")
    {
        const paymentIntent=event.data.object;
        const paymentIntentId=paymentIntent.id;
        const session=await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId
        });
        const {appointmentId}=session.data[0].metadata;
        await appointmentModel.findByIdAndUpdate({_id:appointmentId},{payment:true})
    }
    else
    {
        console.log("unhandles event typr:",event.type);
    }
    res.json({recieved:true});
}
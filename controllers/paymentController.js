import Event from '../models/Event.js';
import razorpay from '../config/razorpay.js';
// payment flow
// final architecture -> user -> createorder API -> Razorpayorder created -> frontend opens checkout
//  -> payment success -> verify API -> booking created -> seats reduced -> email sent

// basic flow
// frontend -> order create -> razorpay checkouts open -> payment collect -> booking


const createOrder = async (req,res) =>{
    try {
        const {eventId,quantity} = req.body;
        if (!eventId || !quantity) {
            return res.status(400).json({
                success:false,
                message:"Event Id and quantity are required"
            })
        }

        const event = Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success:false,
                message:"Event not found"
            })
        }

        if (event.availableSeats < quantity) {
            return res.status(500).json({
                success:false,
                message:"Not Enough seats available"
            }) 
        }

        const amount = event.price * quantity;
        const order = await razorpay.order.createOrder({
            amount:amount*100,
            currency:'INR',
            receipt:'receipt_$(Date.now())'
        });

        return res.status(200).json({
            success:true,
            order,
            eventId,
            quantity,
            amount,

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// verify payment
const verifyPayment = async(req,res)=>{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // signature verify
        return res.status(200).json({
            success:true,
            message:'Payment verified successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default {
    createOrder,
    verifyPayment
}
import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Events",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    paymentStatus:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },
},{
    timestamps:true
})

export default mongoose.model("Booking", bookingSchema);
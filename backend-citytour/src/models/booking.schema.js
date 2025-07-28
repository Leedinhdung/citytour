import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    tour:{type:mongoose.Schema.Types.ObjectId, ref:"Tour", required: true},
    numAdults:{type:Number,required:true},
    numChildren:{type:Number,required:true},
    totalPrice:{type:Number},
    status:{type:String,enum:["pending","confirmed","canceled"],default:"pending"},
    note:{type:String},
})
export default mongoose.model("Booking", BookingSchema);
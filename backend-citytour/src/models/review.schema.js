import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    tour:{type: mongoose.Schema.Types.ObjectId, ref: 'Tour',required: true},
    rating:{type:Number,min:1,max:5},
    comment:{type:String,max:255},
},{ timestamps: true });
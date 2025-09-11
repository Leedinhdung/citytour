import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
	{
		date: { type: Date, required: true },
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		note: { type: String },

		adults: { type: Number, default: 1 },
		children: { type: Number, default: 0 },

		rooms: [
			{
				room: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Room",
					required: true,
				},
				quantity: { type: Number, default: 1 },
				price: { type: Number, required: true },
				total: { type: Number, required: true },
			},
		],

		totalPrice: { type: Number, required: true },

		cruise: { type: mongoose.Schema.Types.ObjectId, ref: "Cruise", required: true },

		status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled"],
			default: "pending",
		},
	},
	{ timestamps: true }
);
export default mongoose.model("Booking", BookingSchema);

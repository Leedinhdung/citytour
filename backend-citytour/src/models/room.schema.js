import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
	cruise_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Cruise",
		required: true,
	},
	name: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
	price: { type: Number, required: true },
	area: { type: Number, required: true },
	features: { type: [String], required: true },
	max_guests: { type: Number, required: true },
	image: { type: String, required: true },
	thumbnail: [{ type: String, required: true }],
	status: {
		type: String,
		enum: ["available", "booked", "maintenance"],
		default: "available",
	},
	isDeleted: { type: Date, default: null },
});
export default mongoose.model("Room", RoomSchema);

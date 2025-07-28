import mongoose from "mongoose";

const CruiseSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		operator: { type: String, required: true },
		trip: { type: String, required: true },
		stars: { type: Number, required: true, min: 1, max: 5 },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		base_price: { type: Number, required: true },
		launch_year: { type: Number, required: true },
		cabin_count: { type: Number, required: true },
		description: { type: String, required: true },
		introduction: { type: String, required: true },
		location: { type: String, required: true },
		features: { type: [String], required: true },
		thumbnail: { type: String, required: true },
		gallery: [{ type: String, required: true }],
		status: {
			type: String,
			enum: ["available", "full", "closed"],
			default: "available",
		},
		isDeleted: { type: Date, default: null },
	},
	{ timestamps: true }
);
export default mongoose.model("Cruise", CruiseSchema);

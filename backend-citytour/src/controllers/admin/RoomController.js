import cruisesSchema from "../../models/cruises.schema.js";
import roomSchema from "../../models/room.schema.js";

const handleError = (error, res, message) => {
	console.error(message, error);
	res.status(500).send({
		message,
		error: error instanceof Error ? error.message : "Lỗi không xác định",
	});
};
export const getListRoom = async (req, res) => {
	try {
		const rooms = await roomSchema.find().sort({ createdAt: -1 });
		if (!rooms || rooms.length === 0) {
			return res.status(404).send({
				message: "Không tìm thấy phòng nào",
			});
		}
		res.status(200).send({
			message: "Danh sách phòng",
			data: rooms,
		});
	} catch (error) {
		handleError(error, res, "Failed to fetch rooms");
	}
};
export const getRoomByCruiseSlug = async (req, res) => {
	const cruiseSlug = req.query.tab;
	try {
		const cruise = await cruisesSchema.findOne({ slug: cruiseSlug });
		console.log("cruise:", cruise);
		if (!cruise) {
			return res.status(404).send({ message: "Cruise not found" });
		}
		const rooms = await roomSchema
			.find({ cruise_id: cruise._id })
			.sort({ createdAt: -1 });
		if (!rooms || rooms.length === 0) {
			return res.status(404).send({
				message: "Không tìm thấy phòng nào cho du thuyền này",
			});
		}
		console.log("rooms:", rooms);
		res.status(200).send({
			message: "Danh sách phòng cho du thuyền",
			data: rooms,
		});
	} catch (error) {
		handleError(error, res, "Failed to fetch rooms by cruise slug");
	}
};

export const createRoom = async (req, res) => {
	try {
		const room = new roomSchema(req.body);
		const result = await room.save();
		res.status(201).send({
			message: "Room created successfully",
			data: result,
		});
	} catch (error) {
		handleError(error, res, "Failed to create room");
	}
};

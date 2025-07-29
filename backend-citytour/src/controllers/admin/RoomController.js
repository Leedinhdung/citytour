import cruisesSchema from "../../models/cruises.schema.js";
import roomSchema from "../../models/room.schema.js";
import roomValidate from "../../validations/roomValidate.js";

const handleError = (error, res, message) => {
	console.error(message, error);
	res.status(500).send({
		message,
		error: error instanceof Error ? error.message : "Lỗi không xác định",
	});
};

export const getListRoom = async (req, res) => {
	try {
		const rooms = await roomSchema
			.find({ isDeleted: null })
			.sort({ createdAt: -1 });
		if (!rooms || rooms.length === 0) {
			return res.status(200).send({
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

export const getListTrashRooms = async (req, res) => {
	try {
		const rooms = await roomSchema
			.find({ isDeleted: { $ne: null } })
			.sort({ createdAt: -1 });
		if (!rooms || rooms.length === 0) {
			return res.status(200).send({
				message: "Không tìm thấy  nào",
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
export const getRoomBySlug = async (req, res) => {
	try {
		const { slug } = req.params;
		const rooms = await roomSchema.findOne({ slug });
		if (!rooms) {
			return res.status(404).send({
				message: "Không tìm thấy phòng",
			});
		}
		res.status(200).send({
			message: "Thông tin phòng",
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
		const { error } = roomValidate.createRoomSchema.validate(req.body);
		if (error) {
			return res.status(400).send({
				message: error.details[0].message,
				data: [],
			});
		}
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
export const updateRoom = async (req, res) => {
	try {
		const { slug } = req.params;

		const { error } = roomValidate.updateRoomSchema.validate(req.body);
		if (error) {
			return res.status(400).send({
				message: error.details[0].message,
				data: [],
			});
		}
		const room = await roomSchema.findOneAndUpdate({ slug }, req.body, {
			new: true,
		});
		if (!room) {
			return res.status(404).send({ message: "Không tìm thấy phòng" });
		}
		return res.status(200).send({
			message: "Cập nhật thành công",
			data: room,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi cập nhật");
	}
};
export const softRemoveRoom = async (req, res) => {
	try {
		const { slug } = req.params;
		const room = await roomSchema.findOneAndUpdate(
			{ slug, isDeleted: null },
			{ isDeleted: new Date() },
			{ new: true }
		);
		if (!room) {
			return res.status(404).send({
				message: "Không tìm thấy phòng",
			});
		}

		return res.status(200).send({
			message: "Xóa mềm thành công",
			data: room,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi xóa mềm");
	}
};
export const restoreRoom = async (req, res) => {
	try {
		const { slug } = req.params;
		if (!slug) {
			return res.status(400).send({
				message: "Slug không hợp lệ",
			});
		}

		const room = await roomSchema.findOneAndUpdate(
			{
				slug,
				isDeleted: { $ne: null },
			},
			{ isDeleted: null },
			{ new: true }
		);

		if (!room) {
			return res.status(404).send({
				message: "Không tìm thấy phòng đã xóa mềm",
			});
		}

		return res.status(200).send({
			message: "Khôi phục phòng thành công",
			data: room,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi khôi phục phòng");
	}
};
export const removeRoom = async (req, res) => {
	try {
		const { slug } = req.params;
		if (!slug) {
			return res.status(400).send({
				message: "Slug không hợp lệ",
			});
		}
		const room = await roomSchema.findOneAndDelete({ slug });
		if (!room) {
			return res.status(404).send({
				message: "Không tìm thấy du thuyền",
			});
		}
		return res.status(200).send({
			message: "Xóa thành công",
			data: room,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi xóa phòng");
	}
};

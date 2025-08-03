import cruisesSchema from "../../models/cruises.schema.js";
import roomSchema from "../../models/room.schema.js";

const handleError = (error, res, message) => {
	console.error(message, error);
	res.status(500).send({
		message,
		error: error instanceof Error ? error.message : "Lỗi không xác định",
	});
};
export const getDetailCruise = async (req, res) => {
	try {
		const { slug } = req.params;
		const cruise = await cruisesSchema.findOne({ slug });
		if (!cruise) {
			return res.status(404).send("Không tìm thấy du thuyền");
		}
		const rooms = await roomSchema.find({
			cruise_id: cruise._id,
			isDeleted: null,
		});
		return res.status(200).send({
			message: "Thông tin du thuyền",
			data: {
				...cruise._doc,
				rooms,
			},
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi lấy chi tiết du thuyền");
	}
};

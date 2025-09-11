import bookingSchema from "../../models/booking.schema.js";
import cruisesSchema from "../../models/cruises.schema.js";
import roomSchema from "../../models/room.schema.js";

const handleError = (error, res, message) => {
	console.error(message, error);
	res.status(500).send({
		message,
		error: error instanceof Error ? error.message : "Lỗi không xác định",
	});
};
export const bookingCruise = async (req, res) => {
	try {
		const {
			cruiseId,
			date,
			name,
			phone,
			email,
			note,
			adults,
			children,
			rooms, // [{ roomId, quantity }]
		} = req.body;

		// Tìm cruise
		const cruise = await cruisesSchema.findById(cruiseId);
		if (!cruise) {
			return res.status(404).send("Không tìm thấy du thuyền");
		}

		// Lấy thông tin phòng + tính giá
		const roomDetail = await Promise.all(
			rooms.map(async (item) => {
				const room = await roomSchema.findById(item.roomId);
				if (!room) throw new Error("Không tìm thấy phòng");

				const price = room.price; // giá hiện tại
				const total = price * item.quantity;

				return {
					room: room._id,
					quantity: item.quantity,
					price,
					total,
				};
			})
		);

		// Tính tổng tiền
		const totalPrice = roomDetail.reduce((acc, cur) => acc + cur.total, 0);

		// Tạo booking
		const booking = await bookingSchema.create({
			date,
			name,
			phone,
			email,
			note,
			adults,
			children,
			rooms: roomDetail,
			totalPrice,
			cruise: cruise._id,
			status: "pending",
		});

		return res.status(201).json({
			message: "Đặt phòng thành công",
			data: booking,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi đặt phòng");
	}
};

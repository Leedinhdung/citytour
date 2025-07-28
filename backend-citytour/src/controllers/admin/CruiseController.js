import cruisesSchema from "../../models/cruises.schema.js";

const handleError = (error, res, message) => {
	console.error(message, error);
	res.status(500).send({
		message,
		error: error instanceof Error ? error.message : "Lỗi không xác định",
	});
};
export const getListCruises = async (req, res) => {
	try {
		const cruises = await cruisesSchema
			.find({ isDeleted: null })
			.sort({ createdAt: -1 });
		if (!cruises || cruises.length === 0) {
			return res.status(404).send({
				message: "Không tìm thấy du thuyền nào",
			});
		}
		res.status(200).send({
			message: "Danh sách du thuyền",
			data: cruises,
		});
	} catch (error) {
		handleError(error, res, "Failed to fetch cruises");
	}
};
export const getListTrashCruises = async (req, res) => {
	try {
		const cruises = await cruisesSchema
			.find({ isDeleted: { $ne: null } })
			.sort({ createdAt: -1 });
		if (!cruises || cruises.length === 0) {
			return res.status(404).send({
				message: "Không tìm thấy du thuyền nào",
			});
		}
		res.status(200).send({
			message: "Danh sách du thuyền",
			data: cruises,
		});
	} catch (error) {
		handleError(error, res, "Failed to fetch cruises");
	}
};
export const createCruise = async (req, res) => {
	try {
		const cruise = new cruisesSchema(req.body);
		const result = await cruise.save();
		res.status(201).send({
			message: "Cruise created successfully",
			data: result,
		});
	} catch (error) {
		handleError(error, res, "Failed to create cruise");
	}
};
export const getCruiseBySlug = async (req, res) => {
	try {
		const slug = req.params;
		const cruise = await cruisesSchema.findOne(slug);
		if (!cruise) {
			res.status(404).send({ message: "Không tìm thấy du thuyền" });
		}
		res.status(200).send({
			message: "Thông tin du thuyền",
			data: cruise,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi tìm thông tin du thuyền");
	}
};
export const updateCruiseBySlug = async (req, res) => {
	try {
		const slug = req.params;
		const cruise = await cruisesSchema.findOneAndUpdate(slug, req.body, {
			new: true,
		});
		if (!cruise) {
			res.status(404).send({ message: "Không tìm thấy du thuyền" });
		}
		res.status(200).send({
			message: "Cập nhật du thuyền thành công",
			data: cruise,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi cập nhật du thuyền");
	}
};
export const removeCruiseBySlug = async (req, res) => {
	try {
		const { slug } = req.params;
		if (!slug) {
			return res.status(400).send({
				message: "Slug không hợp lệ",
			});
		}
		const cruise = await cruisesSchema.findOneAndDelete({ slug });
		if (!cruise) {
			return res.status(404).send({
				message: "Không tìm thấy du thuyền",
			});
		}
		return res.status(200).send({
			message: "Xóa thành công",
			data: cruise,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi xóa du thuyền");
	}
};
export const softRemoveCruiseBySlug = async (req, res) => {
	try {
		const { slug } = req.params;
		if (!slug) {
			return res.status(400).send({
				message: "slug không hợp lệ",
			});
		}
		const cruise = await cruisesSchema.findOneAndUpdate(
			{
				slug,
				isDeleted: null,
			},
			{ isDeleted: new Date() },
			{ new: true }
		);
		if (!cruise) {
			return res.status(404).send({
				message: "Không tìm thấy du thuyền",
			});
		}

		return res.status(200).send({
			message: "Xóa mềm du thuyền thành công",
			data: cruise,
		});
	} catch (error) {
		handleError(error, res, "Xóa mềm không thành công");
	}
};

export const restoreCruiseBySlug = async (req, res) => {
	try {
		const { slug } = req.params;
		if (!slug) {
			return res.status(400).send({
				message: "Slug không hợp lệ",
			});
		}

		const cruise = await cruisesSchema.findOneAndUpdate(
			{
				slug,
				isDeleted: { $ne: null },
			},
			{ isDeleted: null },
			{ new: true }
		);

		if (!cruise) {
			return res.status(404).send({
				message: "Không tìm thấy du thuyền đã xóa mềm",
			});
		}

		return res.status(200).send({
			message: "Khôi phục du thuyền thành công",
			data: cruise,
		});
	} catch (error) {
		handleError(error, res, "Lỗi khi khôi phục du thuyền");
	}
};

import z from "zod";

export const roomSchema = z.object({
	_id: z.string(),
	name: z.string().min(1, "Tên phòng là bắt buộc"),
	slug: z.string().min(1),
	cruise_id: z.string().min(1, "Du thuyền là bắt buộc"),
	thumbnail: z
		.array(z.string().url("Thumbnail phải là URL hợp lệ"))
		.min(1, "Cần ít nhất 1 ảnh thumbnail"),
	image: z.string().url("Ảnh chính phải là URL hợp lệ"),
	area: z
		.number({ invalid_type_error: "Diện tích phải là số" })
		.min(1, "Diện tích phải lớn hơn 0"),
	price: z
		.number({ invalid_type_error: "Giá phải là số" })
		.min(1, "Giá phải lớn hơn 0"),
	max_guests: z
		.number({ invalid_type_error: "Số khách tối đa phải là số" })
		.min(1, "Phải có ít nhất 1 khách"),
	features: z.array(z.string()).min(1, "Tính năng không được để trống"),
	status: z.enum(["available", "booked", "maintenance"], {
		errorMap: () => ({ message: "Trạng thái không hợp lệ" }),
	}),
});

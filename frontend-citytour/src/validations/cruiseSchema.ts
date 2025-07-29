import { z } from "zod";
export const cruiseSchema = z.object({
	_id: z.string(),
	name: z.string().min(1, "Vui lòng nhập tên du thuyền"),
	slug: z.string().min(1),
	operator: z.string().min(1, "Vui lòng nhập nhà điều hành"),
	trip: z.string().min(1, "Vui lòng nhập hành trình"),
	stars: z.coerce
		.number()
		.min(1, "Số sao tối thiểu là 1")
		.max(5, "Số sao tối đa là 5"),
	startDate: z.string().min(1, "Vui lòng nhập ngày bắt đầu"),
	endDate: z.string().min(1, "Vui lòng nhập ngày kết thúc"),
	base_price: z.coerce.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
	launch_year: z.coerce.number().min(1900, "Năm hạ thủy không hợp lệ"),
	cabin_count: z.coerce.number().min(1, "Số lượng cabin phải lớn hơn 0"),
	description: z.string().min(1, "Mô tả là bắt buộc"),
	introduction: z.string().min(1, "Giới thiệu là bắt buộc"),
	location: z.string().min(1, "Vị trí là bắt buộc"),
	features: z.array(z.string()).min(1, "Tính năng không được để trống"),
	thumbnail: z.string().url("Thumbnail phải là URL hợp lệ"),
	gallery: z
		.array(z.string().url("Ảnh trong thư viện phải là URL hợp lệ"))
		.min(1, "Thư viện ảnh không được trống"),
	status: z.enum(["available", "full", "closed"]).optional(),
});

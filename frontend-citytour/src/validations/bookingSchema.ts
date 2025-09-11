import z from "zod";

export const bookingSchema = z.object({
	name: z.string().min(1, "Tên không được để trống"),
	email: z.string().email("Email không hợp lệ"),
	phone: z
		.string()
		.min(10, "Số điện thoại phải có ít nhất 10 số")
		.max(15, "Số điện thoại không được quá 15 số")
		.regex(/^\d+$/, "Số điện thoại chỉ được chứa số"),
	note: z.string().optional(),
	date: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), { message: "Ngày không hợp lệ" }),
	quantity: z
		.number({ invalid_type_error: "Số lượng phải là số" })
		.min(1, "Số lượng tối thiểu là 1"),
});
export type BookingFormData = z.infer<typeof bookingSchema>;

export function priceFormat(val: number) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
		minimumFractionDigits: 0,
	}).format(val);
}
export function formatDate(date?: string | Date): string {
	if (!date) return "";
	const d = new Date(date);
	if (isNaN(d.getTime())) return "";
	return d.toISOString().split("T")[0]; 
}

export interface IRoom {
	_id: string;
	name: string;
	slug: string;
	cruise_id: string;
	thumbnail: string[];
	image: string;
	area: number;
	price: number;
	max_guests: number;
	features: string[];
	status: "available" | "booked" | "maintenance";
}

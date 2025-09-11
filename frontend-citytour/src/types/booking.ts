export interface IBooking {
	cruiseId: string;
	date: string;
	name: string;
	phone: string;
	email: string;
	note?: string;
	adults: number;
	children: number;
	rooms: {
		roomId: string;
		quantity: number;
	}[];
	totalPrice?: number;
}

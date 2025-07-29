export interface ICruise {
	_id: string;
	name: string;
	slug: string;
	operator: string;
	thumbnail: string;
	stars: number;
	base_price: number;
	trip: string;
	launch_year: number;
	cabin_count: number;
	description: string;
	introduction: string;
	gallery: string[];
	features: string[];
	location: string;
	startDate: string;
	endDate: string;
}

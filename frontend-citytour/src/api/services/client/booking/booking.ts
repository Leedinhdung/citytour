import { bookingUri } from "@/api/uris/client/booking/booking";
import axiosClient from "@/configs/axiosClient";
import { IBooking } from "@/types/booking";

export const bookingApi = {
	creatBooking: async (bookingData: IBooking): Promise<IBooking> => {
		return axiosClient.post(bookingUri.BOOKING_CRUISE, bookingData);
	},
};

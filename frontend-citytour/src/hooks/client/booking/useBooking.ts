import { bookingApi } from "@/api/services/client/booking/booking";
import { IBooking } from "@/types/booking";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBooking = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (bookingData: IBooking) => {
			return bookingApi.creatBooking(bookingData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cruises"] });
		},
	});
};

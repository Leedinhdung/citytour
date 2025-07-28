import { roomApi } from "@/api/services/admin/room/room";
import { IRoom } from "@/types/room";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useAddRoom = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (roomData: IRoom) => {
			return roomApi.addRoom(roomData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});
};
export const useGetAllRooms = (
	options?: Omit<UseQueryOptions<IRoom[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IRoom[]>({
		...options,
		queryKey: ["rooms"],
		queryFn: roomApi.getAllRooms,
	});
};
export const useGetRoomCruiseSlug = (
	slug: string,
	options?: Omit<UseQueryOptions<IRoom[]>, "query" | "query">
) => {
	return useQuery<IRoom[]>({
		...options,
		queryKey: ["room_by_cruise", slug],
		queryFn: () => roomApi.getRoomByCruiseSlug(slug),
	});
};

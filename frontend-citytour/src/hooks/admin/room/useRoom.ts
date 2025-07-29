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

export const useGetListTrashRoom = (
	options?: Omit<UseQueryOptions<IRoom[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IRoom[]>({
		...options,
		queryKey: ["rooms-trash"],
		queryFn: roomApi.getListTrashRooms,
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

export const useGetRoomBySlug = (
	slug: string,
	options?: Omit<UseQueryOptions<IRoom>, "query" | "query">
) => {
	return useQuery<IRoom>({
		...options,
		queryKey: ["room_by_slug", slug],
		queryFn: () => roomApi.getRoomBySlug(slug),
	});
};

export const useUpdateRoom = () => {
	const queryClient = useQueryClient();
	return useMutation<IRoom, Error, [string, IRoom]>({
		mutationFn: async ([slug, data]) => {
			return roomApi.updateRoomBySlug(slug, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});
};

export const useSoftDeleteRoom = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return roomApi.softDeleteRoom(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rooms"] });
		},
	});
};

export const useDeleteRoom = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return roomApi.deleteRoom(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rooms-trash"] });
		},
	});
};

export const useRestoreRoom = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return roomApi.restoreRoom(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["rooms-trash"] });
		},
	});
};

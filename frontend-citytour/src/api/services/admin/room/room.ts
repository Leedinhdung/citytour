import { roomUri } from "@/api/uris/admin/room/room";
import axiosClient from "@/configs/axiosClient";
import { IRoom } from "@/types/room";

export const roomApi = {
	addRoom: async (roomData: IRoom): Promise<IRoom> => {
		return await axiosClient.post(roomUri.ADD_ROOM, roomData);
	},
	getAllRooms: async (): Promise<IRoom[]> => {
		return await axiosClient.get(roomUri.GET_ALL_ROOMS);
	},
	getRoomByCruiseSlug: async (slug: string): Promise<IRoom[]> => {
		return await axiosClient.get(roomUri.GET_ROOM_BY_CRUISE_SLUG(slug));
	},
	
};

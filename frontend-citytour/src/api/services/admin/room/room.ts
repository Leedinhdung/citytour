import { IRoom } from "@/types/room";
import { roomUri } from "@/api/uris/admin/room/room";
import axiosClient from "@/configs/axiosClient";

export const roomApi = {
	addRoom: async (roomData: IRoom): Promise<IRoom> => {
		return await axiosClient.post(roomUri.ADD_ROOM, roomData);
	},
	getAllRooms: async (): Promise<IRoom[]> => {
		return await axiosClient.get(roomUri.GET_ALL_ROOMS);
	},
	getListTrashRooms: async (): Promise<IRoom[]> => {
		return await axiosClient.get(roomUri.GET_LIST_TRASH_ROOMS);
	},
	getRoomByCruiseSlug: async (slug: string): Promise<IRoom[]> => {
		return await axiosClient.get(roomUri.GET_ROOM_BY_CRUISE_SLUG(slug));
	},
	getRoomBySlug: async (slug: string): Promise<IRoom> => {
		return await axiosClient.get(roomUri.GET_ROOM_BY_SLUG(slug));
	},
	updateRoomBySlug: async (slug: string, data: IRoom): Promise<IRoom> => {
		return await axiosClient.post(roomUri.UPDATE_ROOM(slug), data);
	},
	softDeleteRoom: async (slug: string): Promise<IRoom> => {
		return await axiosClient.delete(roomUri.SOFT_DELETE_ROOM(slug));
	},
	deleteRoom: async (slug: string): Promise<IRoom> => {
		return await axiosClient.delete(roomUri.DELETE_ROOM(slug));
	},
	restoreRoom: async (slug: string): Promise<IRoom> => {
		return await axiosClient.post(roomUri.RESTORE_ROOM(slug));
	},
};

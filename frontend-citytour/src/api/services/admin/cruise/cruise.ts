import { cruiseUri } from "@/api/uris/admin/cruise/cruise";
import axiosClient from "@/configs/axiosClient";
import { ICruise } from "@/types/cruise";

export const cruiseApi = {
	addCruise: async (cruiseData: ICruise): Promise<ICruise> => {
		return await axiosClient.post(cruiseUri.ADD_CRUISE, cruiseData);
	},
	getAllCruises: async (): Promise<ICruise[]> => {
		return await axiosClient.get(cruiseUri.GET_ALL_CRUISES);
	},
	getListTrashCruises: async (): Promise<ICruise[]> => {
		return await axiosClient.get(cruiseUri.GET_LIST_TRASH_CRUISES);
	},
	getCruiseBySlug: async (slug: string): Promise<ICruise> => {
		return await axiosClient.get(cruiseUri.GET_CRUISE_BY_SLUG(slug));
	},
	updateCruiseBySlug: async (slug: string, data: ICruise): Promise<ICruise> => {
		return await axiosClient.post(cruiseUri.UPDATE_CRUISE(slug), data);
	},
	softDeleteCruiseBySlug: async (slug: string): Promise<ICruise> => {
		return await axiosClient.delete(cruiseUri.SOFT_DELETE_CRUISE(slug));
	},
	DeleteCruiseBySlug: async (slug: string): Promise<ICruise> => {
		return await axiosClient.delete(cruiseUri.DELETE_CRUISE(slug));
	},
	restoreCruiseBySlug: async (slug: string): Promise<ICruise> => {
		return await axiosClient.post(cruiseUri.RESTORE_CRUISE(slug));
	},
};

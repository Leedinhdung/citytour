import { detailUri } from "@/api/uris/client/detail/detail";
import axiosClient from "@/configs/axiosClient";
import { ICruiseDetail } from "@/types/cruise";

export const detailApi = {
	getDetailCruise: async (slug: string): Promise<ICruiseDetail> => {
		return axiosClient.get(detailUri.DETAIL_CRUISE(slug));
	},
};

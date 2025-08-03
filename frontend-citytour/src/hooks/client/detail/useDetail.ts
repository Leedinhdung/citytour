import { detailApi } from "@/api/services/client/detail/detail";
import { ICruiseDetail } from "@/types/cruise";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetDetailCruise = (
	slug: string,
	options?: Omit<UseQueryOptions<ICruiseDetail>, "queryKey" | "queryFn">
) => {
	return useQuery<ICruiseDetail>({
		...options,
		queryKey: ["detail-cruise", slug],
		queryFn: () => detailApi.getDetailCruise(slug),
	});
};

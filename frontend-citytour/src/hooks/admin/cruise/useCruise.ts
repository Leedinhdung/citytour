import { cruiseApi } from "@/api/services/admin/cruise/cruise";
import { ICruise } from "@/types/cruise";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useAddCruise = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (cruiseData: ICruise) => {
			return cruiseApi.addCruise(cruiseData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cruises"] });
		},
	});
};
export const useGetAllCruises = (
	options?: Omit<UseQueryOptions<ICruise[]>, "queryKey" | "queryFn">
) => {
	return useQuery<ICruise[]>({
		...options,
		queryKey: ["cruises"],
		queryFn: cruiseApi.getAllCruises,
	});
};
export const useGetListTrashCruises = (
	options?: Omit<UseQueryOptions<ICruise[]>, "queryKey" | "queryFn">
) => {
	return useQuery<ICruise[]>({
		...options,
		queryKey: ["cruises-trash"],
		queryFn: cruiseApi.getListTrashCruises,
	});
};
export const useGetCruiseBySlug = (
	slug: string,
	options?: Omit<UseQueryOptions<ICruise>, "queryKey" | "queryFn">
) => {
	return useQuery<ICruise>({
		...options,
		queryKey: ["cruise-by-slug", slug],
		queryFn: () => cruiseApi.getCruiseBySlug(slug),
	});
};
export const useUpdateCruise = () => {
	const queryClient = useQueryClient();
	return useMutation<ICruise, Error, [string, ICruise]>({
		mutationFn: async ([slug, data]) => {
			return cruiseApi.updateCruiseBySlug(slug, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cruises"] });
		},
	});
};
export const useSoftDeleteCruise = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return cruiseApi.softDeleteCruiseBySlug(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cruises"] });
		},
	});
};
export const useDeleteCruise = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return cruiseApi.DeleteCruiseBySlug(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cruises-trash"] });
		},
	});
};
export const useRestoreCruise = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (slug: string) => {
			return cruiseApi.restoreCruiseBySlug(slug);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cruises-trash"] });
		},
	});
};

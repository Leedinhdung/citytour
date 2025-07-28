const ROOM_URL = "quan-tri/phong";
export const roomUri = {
	GET_ALL_ROOMS: `${ROOM_URL}`,
	ADD_ROOM: `${ROOM_URL}/them-moi`,
	GET_ROOM_BY_CRUISE_SLUG: (slug: string) => `${ROOM_URL}?tab=${slug}`,
	UPDATE_ROOM: (slug: string) => `${ROOM_URL}/${slug}/cap-nhat`,
	DELETE_ROOM: (id: string) => `${ROOM_URL}/${id}/xoa`,
};

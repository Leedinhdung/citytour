const ROOM_URL = "quan-tri/phong";
export const roomUri = {
	GET_ALL_ROOMS: `${ROOM_URL}`,
	GET_LIST_TRASH_ROOMS: `${ROOM_URL}/thung-rac`,
	ADD_ROOM: `${ROOM_URL}/them-moi`,
	GET_ROOM_BY_CRUISE_SLUG: (slug: string) => `${ROOM_URL}?tab=${slug}`,
	GET_ROOM_BY_SLUG: (slug: string) => `${ROOM_URL}/${slug}`,
	UPDATE_ROOM: (slug: string) => `${ROOM_URL}/${slug}/cap-nhat`,
	SOFT_DELETE_ROOM: (slug: string) => `${ROOM_URL}/${slug}/xoa`,
	DELETE_ROOM: (slug: string) => `${ROOM_URL}/${slug}/xoa-vinh-vien`,
	RESTORE_ROOM: (slug: string) => `${ROOM_URL}/${slug}/khoi-phuc`,
};

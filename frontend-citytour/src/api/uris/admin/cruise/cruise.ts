const CRUISE_URL = "quan-tri/du-thuyen";
export const cruiseUri = {
	GET_ALL_CRUISES: `${CRUISE_URL}`,
	GET_LIST_TRASH_CRUISES: `${CRUISE_URL}/thung-rac`,
	ADD_CRUISE: `${CRUISE_URL}/them-moi`,
	GET_CRUISE_BY_SLUG: (slug: string) => `${CRUISE_URL}/${slug}`,
	UPDATE_CRUISE: (slug: string) => `${CRUISE_URL}/${slug}/cap-nhat`,
	SOFT_DELETE_CRUISE: (slug: string) => `${CRUISE_URL}/${slug}/xoa`,
	DELETE_CRUISE: (slug: string) => `${CRUISE_URL}/${slug}/xoa-vinh-vien`,
	RESTORE_CRUISE: (slug: string) => `${CRUISE_URL}/${slug}/khoi-phuc`,
};

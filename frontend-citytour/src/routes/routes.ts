const routes = {
	//CLIENT
	home: "/",
	detaiCruise: "/chi-tiet/:slug",

	//ADMIN
	dashboard: "/quan-tri",
	//Cruise
	cruiseList: "/quan-tri/du-thuyen",
	addCruise: "/quan-tri/du-thuyen/them",
	editCruise: "/quan-tri/du-thuyen/sua/:slug",
	trashCruise: "/quan-tri/du-thuyen/thung-rac",

	//Room
	roomList: "/quan-tri/phong",
	addRoom: "/quan-tri/phong/them",
	editRoom: "/quan-tri/phong/sua/:slug",
	trashRoom: "/quan-tri/phong/thung-rac",
};
export default routes;

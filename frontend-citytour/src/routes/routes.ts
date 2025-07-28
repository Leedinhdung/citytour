const routes = {
	//CLIENT
	home: "/",
	detailTour: "/chi-tiet",

	//ADMIN
	dashboard: "/quan-tri",
	//Cruise
	cruiseList: "/quan-tri/du-thuyen",
	addCruise: "/quan-tri/du-thuyen/them",
	editCruise: "/quan-tri/du-thuyen/sua/:slug",
	restoreCruise: "/quan-tri/du-thuyen/khoi-phuc/:slug",
	trashCruise: "/quan-tri/du-thuyen/thung-rac",

	//Room
	roomList: "/quan-tri/phong",
	addRoom: "/quan-tri/phong/them",
	editRoom: "/quan-tri/phong/sua/:slug",
};
export default routes;

import {
	createCruise,
	getCruiseBySlug,
	getListCruises,
	getListTrashCruises,
	removeCruiseBySlug,
	restoreCruiseBySlug,
	softRemoveCruiseBySlug,
	updateCruiseBySlug,
} from "../../controllers/admin/CruiseController.js";
import express from "express";
const router = express.Router();
export default (router) => {
	router.get("/quan-tri/du-thuyen", getListCruises);
	router.get("/quan-tri/du-thuyen/thung-rac", getListTrashCruises);
	router.post("/quan-tri/du-thuyen/them-moi", createCruise);
	router.get("/quan-tri/du-thuyen/:slug", getCruiseBySlug);
	router.post("/quan-tri/du-thuyen/:slug/cap-nhat", updateCruiseBySlug);
	router.delete("/quan-tri/du-thuyen/:slug/xoa", softRemoveCruiseBySlug);
	router.delete("/quan-tri/du-thuyen/:slug/xoa-vinh-vien", removeCruiseBySlug);
	router.post("/quan-tri/du-thuyen/:slug/khoi-phuc", restoreCruiseBySlug);
};

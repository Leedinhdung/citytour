import express from "express";
import {
	createRoom,
	getListRoom,
	getListTrashRooms,
	getRoomByCruiseSlug,
	getRoomBySlug,
	removeRoom,
	restoreRoom,
	softRemoveRoom,
	updateRoom,
} from "../../controllers/admin/RoomController.js";
const router = express.Router();
export default (router) => {
	router.get("/quan-tri/phong", getListRoom);
	router.get("/quan-tri/phong/thung-rac", getListTrashRooms);
	router.get("/quan-tri/phong/:slug", getRoomBySlug);
	router.post("/quan-tri/phong/them-moi", createRoom);
	router.post("/quan-tri/phong/:slug/cap-nhat", updateRoom);
	router.get("/quan-tri/phong", getRoomByCruiseSlug);
	router.delete("/quan-tri/phong/:slug/xoa", softRemoveRoom);
	router.delete("/quan-tri/phong/:slug/xoa-vinh-vien", removeRoom);
	router.post("/quan-tri/phong/:slug/khoi-phuc", restoreRoom);
};

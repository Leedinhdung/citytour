import express from "express";
import {
	createRoom,
	getListRoom,
	getRoomByCruiseSlug,
} from "../../controllers/admin/RoomController.js";
const router = express.Router();
export default (router) => {
	router.get("/quan-tri/phong", getListRoom);
	router.post("/quan-tri/phong/them-moi", createRoom);
	router.get("/quan-tri/phong", getRoomByCruiseSlug);
};

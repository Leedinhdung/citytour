import express from "express";
import { bookingCruise } from "../../controllers/client/BookingController.js";
import { getDetailCruise } from "../../controllers/client/CruiseController.js";
const router = express.Router();
export default (router) => {
	router.get("/chi-tiet-du-thuyen/:slug", getDetailCruise);
	router.post("/dat-phong", bookingCruise);
};

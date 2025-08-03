import { getDetailCruise } from "../../controllers/client/CruiseController.js";

export default (router) => {
	router.get("/chi-tiet-du-thuyen/:slug", getDetailCruise);
};

import express from "express";
import cruiseRoutes from "./admin/cruiseRoutes.js";
import roomRoutes from "./admin/roomRoutes.js";

const router = express.Router();

cruiseRoutes(router);
roomRoutes(router);
export default router;

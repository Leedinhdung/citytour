import express from "express";
import cruiseRoutes from "./admin/cruiseRoutes.js";
import roomRoutes from "./admin/roomRoutes.js";
import clientRoutes from "./client/clientRoutes.js";

const router = express.Router();

cruiseRoutes(router);
roomRoutes(router);
//Client
clientRoutes(router);
export default router;

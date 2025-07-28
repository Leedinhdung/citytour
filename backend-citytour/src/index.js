import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./configs/db.js";
import http from "http";
import router from "./routes/index.js";

const app = express();
dotenv.config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/api",router)

await connectDatabase();
const server = http.createServer(app);
server.listen(8080, () => {
	console.log("Server is running on http://localhost:8080/");
});

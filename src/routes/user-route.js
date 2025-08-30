import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import {
  createQueueController,
  getQueueController,
} from "../controllers/users-controllers.js";
const userRoute = express.Router();

userRoute.use(authMiddleware);

userRoute.post("/queues/add", createQueueController);
userRoute.get("/queues", getQueueController);
export default userRoute;

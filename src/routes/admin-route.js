import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { roleMiddleware } from "../middleware/role-middleware.js";
import {
  deleteQueueController,
  getCountUsersAndQueue,
  getQueuesController,
  updateQueueStatus,
} from "../controllers/admin-controllers.js";
const adminRoute = express.Router();

adminRoute.use(authMiddleware);
adminRoute.use(roleMiddleware("admin"));

adminRoute.get("/dashboard", getCountUsersAndQueue);
adminRoute.get("/dashboard/queues", getQueuesController);
adminRoute.patch("/dashboard/queues/edit/:id", updateQueueStatus);
adminRoute.delete("/dashboard/queues/:id", deleteQueueController);

export default adminRoute;

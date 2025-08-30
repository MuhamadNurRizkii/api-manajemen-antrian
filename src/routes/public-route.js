import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/public-controller.js";

const publicRoute = express.Router();
publicRoute.post("/register", registerController);
publicRoute.post("/login", loginController);

export default publicRoute;

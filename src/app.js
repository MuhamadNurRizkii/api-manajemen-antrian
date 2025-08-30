import express from "express";
import adminRoute from "./routes/admin-route.js";
import userRoute from "./routes/user-route.js";
import publicRoute from "./routes/public-route.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// public route
app.use("/api/auth", publicRoute);
// admin route
app.use("/api/admin", adminRoute);
// pasien route
app.use("/api/patient", userRoute);

export default app;

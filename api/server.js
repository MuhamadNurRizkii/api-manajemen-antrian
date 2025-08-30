import dotenv from "dotenv";
dotenv.config();
import app from "../src/app.js";
import { connectDb } from "../src/models/database.js";
const port = 3000;

connectDb();

// menjalankan server express
app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
});

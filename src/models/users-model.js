import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["pasien", "admin"], default: "pasien" },
  },
  { timestamps: true }
);

const users = mongoose.model("users", usersSchema);
export default users;

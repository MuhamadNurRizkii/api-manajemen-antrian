import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    nama: { type: String, required: true },
    keluhan: { type: String, required: true },
    status: {
      type: String,
      enum: ["Antri", "Dipanggil", "Selesai", "Batal"],
      default: "Antri",
    },
    tanggalAntri: { type: String, required: true },
    nomorAntri: { type: Number, required: true },
  },
  { timestamps: true }
);

const queue = mongoose.model("queue", queueSchema);

export default queue;

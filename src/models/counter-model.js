import mongoose from "mongoose";

const counterModel = new mongoose.Schema({
  tanggal: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});

const counter = mongoose.model("counter", counterModel);

export default counter;

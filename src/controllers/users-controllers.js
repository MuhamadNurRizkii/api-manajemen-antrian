import counter from "../models/counter-model.js";
import queue from "../models/queue-model.js";

export const createQueueController = async (req, res) => {
  try {
    // ambil id user dari token
    const userId = req.user.userId;
    console.log(userId);
    // ambil input user dari requset body
    const { nama, keluhan, tanggalAntri } = req.body;

    // cek apakah semua field ada yang belum diisi
    if (!nama || !keluhan || !tanggalAntri) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // bikin antrian baru
    const newCounter = await counter.findOneAndUpdate(
      { tanggal: tanggalAntri },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    // masukkan daftar antrian ke database
    await queue.create({
      userId: userId,
      nama,
      keluhan,
      tanggalAntri,
      nomorAntri: newCounter.sequenceValue,
    });

    // kirim response success
    return res.json({ message: "Antrian berhasil dibuat" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getQueueController = async (req, res) => {
  try {
    // ambil id user dari token
    const userId = req.user.userId;

    // ambil data antrian user berdasarkan id user
    const userQueues = await queue.find(
      { userId: userId },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );

    // cek apakah antrian berhaasil diambil
    if (!userQueues) {
      return res.status(400).json({ message: "gagal mengambil data antrian" });
    }

    // kembalikan response success dan data antrian
    return res.json({
      message: "Data antrian berhasil diambil",
      data: userQueues,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

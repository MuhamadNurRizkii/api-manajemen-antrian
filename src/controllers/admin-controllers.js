import queue from "../models/queue-model.js";
import users from "../models/users-model.js";

export const getCountUsersAndQueue = async (req, res) => {
  try {
    // ambil data users dan queue berdasarkan hari ini
    const date = new Date().toISOString().split("T")[0];
    const totalUsers = await users.countDocuments({ role: "pasien" });
    const totalQueues = await queue.countDocuments({
      tanggalAntri: { $eq: date },
    });

    return res.json({
      message: "Berhasil mengambil data",
      data: {
        totalUsers,
        totalQueues,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getQueuesController = async (req, res) => {
  try {
    // bikin variable untuk menyimpan tanggal pada hari sekarang
    const today = new Date().toISOString().split("T")[0];

    // ambil semua data queues berdasarkan hari ini
    const queues = await queue
      .find({ tanggalAntri: today }, { createdAt: 0, updatedAt: 0, __v: 0 })
      .sort({ nomorAntri: 1 });

    return res.json({ message: "Data antrian berhasil diambil", data: queues });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateQueueStatus = async (req, res) => {
  try {
    // id antrian
    const { id } = req.params;
    // status baru
    const { status } = req.body;

    // validasi input
    const allowedStatus = ["Antri", "Dipanggil", "Selesai", "Batal"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status tidak valid." });
    }

    // update data antrian
    const updateQueue = await queue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updateQueue) {
      return res.status(404).json({ message: "Antrian tidak ditemukan" });
    }

    return res.json({
      message: "Status antrian berhasil diperbarui",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteQueueController = async (req, res) => {
  try {
    // ambil id dari req.params
    const { id } = req.params;

    // delete antrian berdasarkan id
    const deletedQueue = await queue.findByIdAndDelete(id);

    if (!deletedQueue) {
      return res.status(400).json({ message: "Gagal menghapus antrian" });
    }

    return res.json({ message: "Antrian berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

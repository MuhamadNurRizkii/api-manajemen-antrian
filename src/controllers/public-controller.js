import users from "../models/users-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register controller
export const registerController = async (req, res) => {
  try {
    // ambil input username, password dari request body
    const { name, username, password } = req.body;

    // validasi username dan passsword
    if (!name || !username || !password) {
      return res.status(400).json({ message: "semua field wajib diisi!" });
    }

    // ambil username dari database
    const existUser = await users.findOne({ username: username });

    // jika ada username yang sama, kembalikan error
    if (existUser) {
      return res.status(400).json({ message: "username sudah terpakai" });
    }

    // hash password sebelum masuk ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // buat user baru dan masuk ke database
    await users.create({ name, username, password: hashedPassword });

    // kirim response ke frontend
    return res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    // ambil input username dan password
    const { username, password } = req.body;

    // validasi input username dan password
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username atau password wajib diisi" });
    }

    // ambil data user berdasarkan username
    const user = await users.findOne({ username: username });

    // cek apakah username sama dengan username di database
    // kalau salah balikkan respon error
    if (!user) {
      return res.status(400).json({ message: "username atau password salah" });
    }

    // kalau bener, compare password dengan password di database
    const isPassword = await bcrypt.compare(password, user.password);

    // jika compare password salah kirim respon error
    if (!isPassword) {
      return res.status(400).json({ message: "username atau password salah" });
    }

    // generate token dan kirim ke frontend
    const generateToken = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.TOKEN,
      { expiresIn: "3d" }
    );

    return res.json({ message: "Login berhasil", token: generateToken });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

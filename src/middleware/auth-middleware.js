import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Ambil header authorization dari request
    const authHeader = req.headers["authorization"];

    // Validasi header: harus ada dan harus pakai prefix "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Akses ditolak. Token tidak ditemukan atau kadaluwarsa",
      });
    }

    // Ambil token dari header (pisahkan kata "Bearer" dan tokennya)
    const token = authHeader.split(" ")[1];
    console.log(token);

    // Verifikasi token dengan secret key dari .env
    const decoded = jwt.verify(token, process.env.TOKEN);
    console.log(decoded);

    // Simpan data hasil decode (payload token) ke req.user
    req.user = decoded;
    // Lanjut ke middleware/handler berikutnya
    next();
  } catch (error) {
    // Kalau verifikasi gagal (token salah, expired, dll.)
    return res
      .status(403)
      .json({
        message: "Token tidak valid atau sudah kadaluwarsa",
        error: error,
      });
  }
};

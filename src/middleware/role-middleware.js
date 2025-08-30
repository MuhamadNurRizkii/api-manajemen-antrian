export const roleMiddleware = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== role) {
      return res
        .status(403)
        .json({ message: "Akses ditolak, role tidak sesuai" });
    }
    next();
  };
};

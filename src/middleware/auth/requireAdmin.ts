export default function requireAdminMW(req, res, next) {
  if (req.session.userRole === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Access denied" });
  }
}

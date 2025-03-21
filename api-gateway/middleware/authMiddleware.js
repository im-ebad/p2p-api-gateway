const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = user;
    next();
  });
};

module.exports = verifyToken;


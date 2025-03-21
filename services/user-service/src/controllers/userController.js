const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, email, password, role, balance } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  User.createUser(username, email, hashedPassword, role, balance , (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.getUserByUsername(username, async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: "Invalid Credentials" });

    const user = results[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
};


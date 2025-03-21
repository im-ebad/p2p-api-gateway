const db = require("../database/db");

const createUser = (username, email, hashedPassword, role, balance, callback) => {
    const query = "INSERT INTO users (username, email, password, role, balance) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [username, email, hashedPassword, role, balance], callback);
};

const getUserByUsername = (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], callback);
};

module.exports = { createUser, getUserByUsername };


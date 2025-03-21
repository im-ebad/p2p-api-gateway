const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.TRANSACTION_DB
});

db.connect(err => {
    if (err) console.error("Database Connection Failed!", err);
    else console.log("✅ Connected to MySQL Transactions Database");
});

module.exports = db;


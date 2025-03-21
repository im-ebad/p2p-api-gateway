const express = require("express");
const dotenv = require("dotenv");
const transactoinRoutes = require("./src/routes/transactionRoutes");
require("./src/database/db.js");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/transaction", transactoinRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`👤 Transactioin Service running on port ${PORT}`));


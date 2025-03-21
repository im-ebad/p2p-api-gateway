const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/userRoutes");
require("./src/database/db.js");

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" })); // Increase JSON body limit

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`👤 User Service running on port ${PORT}`));


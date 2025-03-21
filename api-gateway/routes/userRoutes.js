
const express = require("express");
const { forwardRequest } = require("../services/userService");

const router = express.Router();

// Forward all user-related requests to the User Service
router.all("*", async (req, res) => {
  try {
    // Remove `/users` prefix before forwarding
    const relativePath = req.originalUrl.replace("/users", "");

    const response = await forwardRequest(req.method, relativePath, req.body, req.headers);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
});

module.exports = router;


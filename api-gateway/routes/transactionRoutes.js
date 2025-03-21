
const express = require("express");
const { forwardRequest } = require("../services/transactionService");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply verifyToken only to protected routes
router.use(verifyToken);

// Generic route forwarding to Transaction Service
router.all("*", async (req, res) => {
  try {
    // Forward only the relative path, not the full original URL
    const relativePath = req.originalUrl.replace("/transaction", ""); 

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


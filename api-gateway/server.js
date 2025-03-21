const express = require('express');
const usersRouter = require('./routes/userRoutes');
const transactionsRouter = require('./routes/transactionRoutes');
USER_SERVICE_URL=process.env.USER_SERVICE_URL;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use((req, res, next) => {
  console.log(`🟢 API Gateway received ${req.method} request at ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});
// Routes
app.use('/users', usersRouter);
app.use('/transaction', transactionsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});

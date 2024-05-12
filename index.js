// Global Import
const express = require("express");

// Local Import
const sequelize = require("./db/sequelize");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const reportRoutes = require("./routes/reportRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const cookieCheckMiddleware = require("./middleware/cookieCheckMiddleware");

// Initialize server
const app = express();
const port = process.env.PORT || 3000;

// Initialize DB
async function initializeDatabase() {
  try {
    await sequelize.sync({ alter: false });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cookieCheckMiddleware);
app.use((req, res, next) => {
  if (req.cookies && req.cookies.accessToken) {
    req.headers.authorization = `Bearer ${req.cookies.accessToken}`;
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/report", reportRoutes);

// Error handling middleware
app.use(errorHandler);

function startServer() {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

initializeDatabase().then(startServer).catch(console.error);

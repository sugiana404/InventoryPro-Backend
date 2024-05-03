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
initializeDatabase();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/report", reportRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

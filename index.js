// Global Import
const express = require("express");

// Local Import
const sequelize = require("./db/sequelize");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Initialize server
const app = express();
const port = process.env.PORT || 3000;

// Initialize DB
async function initializeDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}
initializeDatabase();

// Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

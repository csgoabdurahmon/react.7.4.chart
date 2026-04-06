"use strict";

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5567",
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    port: 5567,
    frontend: "http://localhost:5567",
  });
});

app.use(authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint topilmadi" });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Server xatoligi",
  });
});

module.exports = app;

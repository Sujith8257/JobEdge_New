const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./database.js");
const resumeRoutes = require("./routes/resumeRoutes.js"); //  Correct relative path

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allow JSON data

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

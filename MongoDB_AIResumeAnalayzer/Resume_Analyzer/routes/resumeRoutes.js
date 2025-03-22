const express = require("express");
const Resume = require("../models/Resume.js");

const router = express.Router();

// API to store parsed resume data
router.post("/upload", async (req, res) => {
  try {
    const { name, email, phone, skills, education, experience } = req.body;

    const newResume = new Resume({
      name,
      email,
      phone,
      skills,
      education,
      experience,
    });

    await newResume.save();
    res.status(201).json({ message: "Resume saved successfully!" });
  } catch (error) {
    console.error("Error saving resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

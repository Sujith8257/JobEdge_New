const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String], // Array of skills
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    }
  ],
  experience: [
    {
      jobTitle: String,
      company: String,
      years: String,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", ResumeSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  resume: String,  // File path or parsed JSON output
  skills: [String],
  jobPreferences: [String],  // Preferred job roles
  learningSuggestions: [String],  // AI-generated learning suggestions
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);

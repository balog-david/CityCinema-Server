// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI;
  try {
    await mongoose.connect(dbURI);
    console.log("✅ MongoDB kapcsolódás sikeres");
  } catch (error) {
    console.error("❌ MongoDB hiba:", error);
    process.exit(1); // Állítsd le a folyamatot, ha nem tud kapcsolódni
  }
};

module.exports = connectDB;

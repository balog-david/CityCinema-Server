const bcrypt = require("bcrypt");
const User = require("../models/User");

async function seedAdmin() {
  try {
    const existingAdmin = await User.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await new User({ username: "admin", password: hashedPassword }).save();
      console.log("✅ Admin felhasználó létrehozva!");
    } else {
      console.log("ℹ️ Admin felhasználó már létezik.");
    }
  } catch (err) {
    console.error("❌ Hiba a seed futtatásakor:", err);
  }
}

module.exports = seedAdmin;

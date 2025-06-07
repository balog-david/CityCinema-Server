const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        success: false,
        message: "Felhasználó nem található.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.userId = user.id;
      return res.json({ success: true, message: "Sikeres bejelentkezés." });
    } else {
      return res.json({ success: false, message: "Hibás jelszó." });
    }
  } catch (err) {
    console.error("Bejelentkezési hiba: ", err);
    res.status(500).json({ success: false, message: "Szerverhiba." });
  }
});

// POST /logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session törlés hiba:", err);
      return res
        .status(500)
        .json({ success: false, message: "Nem sikerült kijelentkezni" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Sikeres kijelentkezés" });
  });
});

// GET /check-auth
router.get("/check-auth", (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;

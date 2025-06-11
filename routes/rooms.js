const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET /rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch {
    res.status(500).json({ message: "Hiba a termek lekérdezésekor" });
  }
});

module.exports = router;

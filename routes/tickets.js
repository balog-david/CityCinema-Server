const express = require("express");
const router = express.Router();
const Screening = require("../models/Screening");

// GET /tickets/:storedToken
router.get("/:storedToken", async (req, res) => {
  const tokenId = req.params.storedToken;

  try {
    const result = await Screening.aggregate([
      { $unwind: "$seats" },
      { $unwind: "$seats" },
      { $match: { "seats.reservedby": tokenId } },
      { $count: "reservedSeatsCount" },
    ]);

    const count = result.length > 0 ? result[0].reservedSeatsCount : 0;
    res.json({ reservedSeatsCount: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /tickets/:tickedId/seats/:seatId
router.patch("/:tickedId/seats/:seatId", async (req, res) => {
  const { tickedId, seatId } = req.params;
  const { status } = req.body;
  const userId = req.userToken;

  try {
    const screening = await Screening.findById(tickedId);
    if (!screening)
      return res.status(404).json({ error: "A vetítés nem található" });

    for (let row of screening.seats) {
      for (let seat of row) {
        if (seat.id === seatId) {
          if (seat.status === "booked") {
            return res
              .status(403)
              .json({ error: "Ez a szék véglegesen le van foglalva!" });
          }
          if (seat.reservedby !== userId) {
            return res
              .status(403)
              .json({ error: "Nem ez a felhasználó foglalta le!" });
          }

          seat.status = "available";
          seat.reservedby = "";
          seat.until = "";
        }
      }
    }

    await screening.save();
    res.json({ message: "Szék frissítve", seatId, status });
  } catch (err) {
    res.status(500).json({ error: "Hiba a frissítés során" });
  }
});

module.exports = router;

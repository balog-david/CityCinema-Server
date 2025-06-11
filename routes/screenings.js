const express = require("express");
const router = express.Router();
const Screening = require("../models/Screening");

// GET /screenings
router.get("/", async (req, res) => {
  try {
    const screenings = await Screening.find();
    res.json(screenings);
  } catch {
    res.status(500).json({ message: "Hiba a vetítések lekérdezésekor" });
  }
});

// GET /screenings/:id
router.get("/:id", async (req, res) => {
  try {
    const screening = await Screening.findById(req.params.id);
    if (!screening)
      return res.status(404).json({ message: "Nem található vetítés" });
    res.json({
      name: screening.name,
      seats: screening.seats,
      roomName: screening.roomName,
    });
  } catch (err) {
    res.status(500).json({ message: "Hiba a lekérdezés során." });
  }
});

// GET /bytoken/:token
router.get("/bytoken/:token", async (req, res) => {
  const token = req.params.token;

  try {
    const screenings = await Screening.find({
      seats: {
        $elemMatch: {
          $elemMatch: { reservedby: token }
        }
      }
    });

    const result = screenings.map(screening => {
      // seats egy kétdimenziós tömb, ezért végig kell menni minden soron és azon belül minden széken
      const reservedSeats = [];
      screening.seats.forEach(row => {
        row.forEach(seat => {
          if (seat.reservedby === token) {
            reservedSeats.push(seat.id);
          }
        });
      });

      return {
        id: screening._id,
        name: screening.name,
        date: screening.date,
        time: screening.time,
        roomName: screening.roomName,
        seats: reservedSeats,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba a token alapú vetítések lekérdezésekor." });
  }
});

// POST /screenings
router.post("/", async (req, res) => {
  try {
    for (const screening of req.body) {
      const newScreening = new Screening(screening);
      await newScreening.save();
    }
    res.status(201).json({ message: "Vetítések mentve" });
  } catch (error) {
    res.status(500).json({ message: "Hiba a mentéskor", error: error.message });
  }
});

// PATCH /screenings/:screeningId/seats/:seatId
router.patch("/:screeningId/seats/:seatId", async (req, res) => {
  const { screeningId, seatId } = req.params;
  const { status } = req.body;
  const userId = req.headers['x-user-token'];

  try {
    const screening = await Screening.findById(screeningId);
    if (!screening)
      return res.status(404).json({ error: "Vetítés nem található" });

    const screeningDateTime = new Date(`${screening.date}T${screening.time}`);
    if (new Date() > screeningDateTime) {
      return res.status(403).json({ error: "Ez a vetítés már elkezdődött." });
    }

    let updated = false;
    for (let row of screening.seats) {
      for (let seat of row) {
        if (seat.id === seatId) {
          if (seat.status === "booked") {
            return res.status(403).json({
              error: "Ez a szék véglegesen le van foglalva, nem módosítható",
            });
          }
          if (
            status === "available" &&
            seat.reservedby &&
            seat.reservedby !== userId
          ) {
            return res
              .status(403)
              .json({ error: "Nem vonhatod vissza más foglalását" });
          }

          seat.status = status;
          seat.reservedby = status === "available" ? "" : userId;

          if (status === "reserved") {
            const now = new Date();
            now.setMinutes(now.getMinutes() + 20);
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            seat.until = `${hours}:${minutes}`;
          } else {
            seat.until = "";
          }

          updated = true;
          break;
        }
      }
      if (updated) break;
    }

    if (!updated) return res.status(404).json({ error: "Szék nem található" });

    await screening.save();
    res.json({ message: "Szék frissítve", seatId, status });
  } catch (err) {
    res.status(500).json({ error: "Hiba a frissítés során" });
  }
});

// DELETE /screenings/:id
router.delete("/:id", async (req, res) => {
  const screeningId = req.params.id;
  try {
    const deleted = await Screening.findByIdAndDelete(screeningId);
    if (!deleted) {
      return res.status(404).json({ error: "A vetítés nem található." });
    }
    res.status(200).json({ message: "Sikeres törlés.", id: req.params.id });
  } catch (err) {
    console.log("Törlés hiba.", err);
    res.status(500).json({ error: "Szerverhiba a törlés közben." });
  }
});

module.exports = router;

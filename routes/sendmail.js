const express = require("express");
const router = express.Router();
const Screening = require("../models/Screening");
const nodemailer = require("nodemailer");

// POST /sendmail
router.post("/", async (req, res) => {
  const { token, name, email, tickets } = req.body;
  const ticket = tickets[0];

  try {
    console.log(ticket);
    const screening = await Screening.findById(ticket.id);

    if (!screening) {
      return res.status(404).json({ error: "A vetítés nem található." });
    }

    for (const row of screening.seats) {
      for (const seat of row) {
        if (seat.reservedby === token) {
          seat.status = "booked";
          seat.until = "";
        }
      }
    }

    await screening.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Jegyrendelés visszaigazolás",
      text: `Kedves ${name}!\n\n
      Köszönjük a jegyrendelést!\n
      Film: ${ticket.name}
      Dátum: ${ticket.date.replaceAll("-", ".") + "."}
      Időpont: ${ticket.time}
      Terem: ${ticket.roomName}
      Székek: ${ticket.seats.join(", ")}
      
      Üdv,
      Mozicsapat`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({
          error: error.message || "Hiba az e-mail küldésekor.",
        });
      } else {
        res.status(200).json("E-mail sikeresen elküldve.");
      }
    });
  } catch (err) {
    console.error("Hiba a sendmail route-ban:", err);
    res.status(500).json({ error: "Szerverhiba a levélküldés során." });
  }
});

module.exports = router;

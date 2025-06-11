// websocket.js

const WebSocket = require("ws");
const Screening = require("./models/Screening");

/**
 * WebSocket handler function.
 * @param {http.Server} server - The HTTP server to attach the WebSocket server to.
 */
module.exports = function (server) {
  const wss = new WebSocket.Server({ server }); // WebSocket szerver indítása Render-en

  wss.on("connection", (ws) => {
    console.log("Új WebSocket kapcsolat");

    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data);

        if (message.type === "seat-update") {
          const { screeningId, seat } = message;
          const screening = await Screening.findById(screeningId);
          if (!screening) return;

          let updatedSeat = null;
          for (let row of screening.seats) {
            for (let s of row) {
              if (s.id === seat.id) {
                s.status = seat.status;
                s.reservedby = seat.reservedby;
                updatedSeat = s;
                break;
              }
            }
            if (updatedSeat) break;
          }

          if (updatedSeat) {
            await screening.save();

            const outgoing = JSON.stringify({
              type: "seat-update",
              screeningId,
              seat: updatedSeat,
            });

            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(outgoing);
              }
            });
          }
        }
      } catch (err) {
        console.error("Hiba a WS üzenet feldolgozásakor:", err);
      }
    });
  });

  // Periodikus foglalás-ellenőrző (20 perc)
  setInterval(async () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    try {
      const screenings = await Screening.find();
      for (const screening of screenings) {
        let modified = false;
        const updatedSeats = [];

        for (let row of screening.seats) {
          for (let seat of row) {
            if (seat.until) {
              const [h, m] = seat.until.split(":").map(Number);
              const seatUntilMinutes = h * 60 + m;

              if (seatUntilMinutes <= currentMinutes) {
                seat.status = "available";
                seat.reservedby = "";
                seat.until = "";
                modified = true;

                updatedSeats.push({
                  id: seat.id,
                  status: seat.status,
                  reservedby: seat.reservedby,
                  until: seat.until,
                });
              }
            }
          }
        }

        if (modified) {
          await screening.save();
          console.log(`Lejárt foglalások törölve: ${screening.name}`);

          if (updatedSeats.length > 0) {
            const outgoing = JSON.stringify({
              type: "seats-bulk-update",
              screeningId: screening._id,
              seats: updatedSeats,
            });

            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(outgoing);
              }
            });
          }
        }
      }
    } catch (err) {
      console.error("Hiba az automatikus foglalásellenőrzés során:", err);
    }
  }, 20 * 60 * 1000);

  // Lejárt vetítések automatikus törlése (5 perc)
  setInterval(async () => {
    const now = new Date();
    try {
      const screenings = await Screening.find();
      for (const screening of screenings) {
        if (!screening.date || !screening.time) continue;

        const screeningDateTime = new Date(
          `${screening.date}T${screening.time}`
        );
        if (now > screeningDateTime) {
          await Screening.findByIdAndDelete(screening._id);
          console.log(
            `Törölve: ${screening._id} (${screeningDateTime.toISOString()})`
          );
        }
      }
    } catch (err) {
      console.error("Hiba a screenings lekérdezésénél:", err);
    }
  }, 5 * 60 * 1000);
};

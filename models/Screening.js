const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  roomName: String,
  seats: [
    [
      {
        id: String,
        status: String,
        reservedby: String,
        until: String,
      },
    ],
  ],
}, {collection: 'screenings'});

module.exports = mongoose.model("Screening", screeningSchema);

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  seats: [[{ id: String, status: String, reservedby: String, until: String }]],
}, {collection: 'rooms'});

module.exports = mongoose.model("Room", roomSchema);

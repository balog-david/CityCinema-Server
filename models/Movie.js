const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  image: String,
  link: String,
  description: String,
  cast: String,
});

module.exports = mongoose.model("Movie", movieSchema);

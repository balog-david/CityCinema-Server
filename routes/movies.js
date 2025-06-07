const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");

// GET /movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch {
    res.status(500).json({ message: "Hiba a filmek lekérdezésekor" });
  }
});

// GET /movies/:link
router.get("/:link", async (req, res) => {
  try {
    const movie = await Movie.findOne({ link: req.params.link });
    if (!movie) return res.status(404).json({ message: "Film nem található" });
    res.json(movie);
  } catch {
    res.status(500).json({ message: "Hiba a film lekérdezésekor" });
  }
});

// POST /movies
router.post("/", async (req, res) => {
  try {
    const movieData = req.body;
    const newMovie = new Movie(movieData);
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Film sikeresen mentve!", movie: newMovie });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba a mentés során", error: error.message });
  }
});

// PATCH /movies/:id
router.patch("/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const id = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie) {
      return res
        .status(404)
        .json({ message: "A film nem található a megadott azonosítóval!" });
    }
    res.json({ message: "Film sikeresen frissítve!", movie: updatedMovie });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hiba a frissítés során", error: error.message });
  }
});

// DELETE /movies/:id
router.delete("/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ error: "Film nem található" });

    const title = movie.title;
    await Screening.deleteMany({ name: title });
    await Movie.findByIdAndDelete(movieId);

    res.status(200).json({ message: "Film és vetítések törölve" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hiba történt a törlés során" });
  }
});

module.exports = router;

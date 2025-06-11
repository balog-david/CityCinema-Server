const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const streamifier = require("streamifier");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "citycinema-pictures",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: multer.memoryStorage() });


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
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, body, author, link, description, cast } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "movies" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(buffer).pipe(uploadStream);
        });
      };
      const result = await uploadFromBuffer(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newMovie = new Movie({
      title,
      body,
      author,
      image: imageUrl,
      link,
      description,
      cast,
    });

    await newMovie.save();

    res.status(201).json({ message: "Film sikeresen mentve!", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Hiba a mentés során", error: error.message });
  }
});

// PATCH /movies/:id
router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, body, author, link, description, cast } = req.body;
    const id = req.params.id;

    const updateData = {
      title,
      body,
      author,
      link,
      description,
      cast,
    };

    if (req.file) {
      const movie = await Movie.findById(id);

      if (movie?.image) {
        const imageUrl = movie.image;
        const parts = imageUrl.split("/");
        const publicIdWithExtension = parts.slice(parts.indexOf("upload") + 2).join("/");
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Régi Cloudinary kép törlése sikertelen:", err.message);
        }
      }

      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "movies" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(buffer).pipe(uploadStream);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);
      updateData.image = result.secure_url;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Film nem található" });
    }

    res.json({ message: "Film sikeresen frissítve!", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Hiba a frissítés során", error: error.message });
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

    if (movie.image) {
      const imageUrl = movie.image;
      const parts = imageUrl.split("/");
      const uploadIndex = parts.indexOf("upload");
      if (uploadIndex !== -1 && parts.length > uploadIndex + 2) {
        const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log("Cloudinary kép törölve:", publicId);
        } catch (err) {
          console.error("Cloudinary kép törlése sikertelen:", err.message);
        }
      }
    }
    await Movie.findByIdAndDelete(movieId);
    res.status(200).json({ message: "Film és vetítések törölve" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hiba történt a törlés során" });
  }
});

module.exports = router;


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Movie = require("./models/Movie");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


/* ============================= */
/* MONGODB CONNECTION */
/* ============================= */

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected - KALAMANDIRA"))
    .catch(err => console.error("MongoDB Error:", err));


/* ============================= */
/* GET ALL MOVIES */
/* ============================= */

app.get("/api/movies", async (req, res) => {
    try {
        const movies = await Movie.find().sort({ _id: -1 });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/* ============================= */
/* GET SINGLE MOVIE BY ID */
/* ============================= */

app.get("/api/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);

    } catch (err) {
        console.error("Single movie fetch error:", err);

        res.status(400).json({
            message: "Invalid movie ID or fetch error"
        });
    }
});


/* ============================= */
/* ADD MOVIE */
/* ============================= */

app.post("/api/movies", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);

        res.status(201).json(movie);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


/* ============================= */
/* UPDATE MOVIE */
/* ============================= */

app.put("/api/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


/* ============================= */
/* DELETE MOVIE */
/* ============================= */

app.delete("/api/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json({
            message: "Movie deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


/* ============================= */
/* SERVER */
/* ============================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`KALAMANDIRA running at http://localhost:${PORT}`);
});

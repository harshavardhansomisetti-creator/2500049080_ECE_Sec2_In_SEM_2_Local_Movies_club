require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Movie = require("./models/Movie");

const app = express();

/* ============================= */
/* CORS */
/* ============================= */

app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "https://harshavardhansomisetti-creator.github.io"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();

});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ============================= */
/* HEALTH CHECK */
/* ============================= */

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        project: "KALAMANDIRA",
        database: mongoose.connection.readyState === 1
            ? "Connected"
            : "Disconnected",
        databaseName: mongoose.connection.name,
        collectionName: Movie.collection.name
    });
});

/* ============================= */
/* GET ALL MOVIES */
/* ============================= */

app.get("/api/movies", async (req, res) => {
    try {
        const movies = await Movie.find().sort({ _id: -1 });
        res.json(movies);
    } catch (err) {
        console.error("Movies fetch error:", err.message);
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
        console.error("Single movie fetch error:", err.message);

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

        console.log("RECEIVED MOVIE DATA:", req.body);

        const movie = await Movie.create(req.body);

        console.log("SAVED MOVIE DATA:", movie.toObject());

        res.status(201).json(movie);

    } catch (err) {

        console.error("Movie creation error:", err);

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

        console.log("UPDATE REQUEST DATA:", req.body);

        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    poster: req.body.poster,
                    genre: req.body.genre,
                    language: req.body.language,
                    year: req.body.year,
                    rating: req.body.rating,
                    director: req.body.director,
                    actors: req.body.actors,
                    ottLink: req.body.ottLink,
                    ottPlatform: req.body.ottPlatform,
                    ottStatus: req.body.ottStatus,
                    trailer: req.body.trailer
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        console.log("UPDATED MOVIE:", movie);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);

    } catch (err) {

        console.error("Movie update error:", err);

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
        console.error("Movie deletion error:", err.message);

        res.status(500).json({
            message: err.message
        });
    }
});

/* ============================= */
/* SERVER + DATABASE */
/* ============================= */

const PORT = process.env.PORT || 3000;

async function startServer() {

    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI environment variable is missing");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("--------------------------------");
        console.log("MongoDB Connected - KALAMANDIRA");
        console.log("Database Name:", mongoose.connection.name);
        console.log("Collection Name:", Movie.collection.name);

        const movieCount = await Movie.countDocuments();

        console.log("Movies Found:", movieCount);
        console.log("--------------------------------");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`KALAMANDIRA running on port ${PORT}`);
        });

    } catch (err) {
        console.error("MongoDB Connection Failed:");
        console.error(err.message);

        process.exit(1);
    }
}

startServer();

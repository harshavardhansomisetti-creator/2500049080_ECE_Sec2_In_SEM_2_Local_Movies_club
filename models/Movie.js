const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: "",
            trim: true
        },
        poster: {
            type: String,
            default: "",
            trim: true
        },
        genre: {
            type: [String],
            default: []
        },
        language: {
            type: String,
            default: "",
            trim: true
        },
        year: {
            type: Number
        },
        rating: {
            type: Number,
            min: 0,
            max: 10
        },
        director: {
            type: String,
            default: "",
            trim: true
        },
        actors: {
            type: [String],
            default: []
        },
        ott: {
            type: String,
            default: "",
            trim: true
        },
        trailer: {
            type: String,
            default: "",
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
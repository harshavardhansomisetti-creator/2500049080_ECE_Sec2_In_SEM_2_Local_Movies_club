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
        }
    },
    { timestamps: true }
);

module.exports = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

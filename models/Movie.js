const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    genre: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },

    director: {
        type: String,
        required: true,
        trim: true
    },

    actors: {
        type: [String],
        default: []
    },

    poster: {
        type: String,
        default: ""
    },

    trailer: {
        type: String,
        default: ""
    },

    ottPlatform: {
        type: String,
        default: ""
    },

    ottLink: {
        type: String,
        default: ""
    },

    ottStatus: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Movie", movieSchema);
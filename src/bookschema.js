const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    genre: Array,
    rating: Number,
});

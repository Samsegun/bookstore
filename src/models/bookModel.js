const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a title"],
        },
        author: {
            type: String,
            required: [true, "Please add a author"],
        },
        pages: Number,
        genre: [String],
        rating: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Books", bookSchema);

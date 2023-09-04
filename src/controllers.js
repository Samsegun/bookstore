const asyncHandler = require("express-async-handler");

const Book = require("./models/bookModel");

const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();

    res.status(200).json(books);
});

module.exports = {
    getBooks,
};

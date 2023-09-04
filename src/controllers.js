const { isValidObjectId } = require("mongoose");
const asyncHandler = require("express-async-handler");

const Book = require("./models/bookModel");

const getBooks = asyncHandler(async (req, res) => {
    try {
        const page = req.query.page || 0;
        const booksPerPage = 3;

        const books = await Book.find()
            .sort({ author: 1 })
            .skip(page * booksPerPage)
            .limit(booksPerPage);

        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error });
    }
});

const getBook = asyncHandler(async (req, res) => {
    try {
        if (isValidObjectId(req.params.id)) {
            const book = await Book.findById(req.params.id);

            res.status(200).json(book);
        } else {
            res.status(500).json({ error: "Not a valid id doc" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

const postBook = asyncHandler(async (req, res) => {
    try {
        const book = req.body;
        const result = await Book.create(book);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Could not create a new document" });
    }
});

module.exports = {
    getBooks,
    getBook,
    postBook,
};

const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const { port, status } = require("./config");
dotenv.config();

const app = express();

app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());
app.use(express.json());

// db connection
let db;
connectToDb(err => {
    if (!err) {
        app.listen(port, () => {
            console.log(
                `Server running in ${status} mode, listening on port ::${port}`
            );
        });

        db = getDb();
    }
});

// routes
app.get("/", (req, res) => {
    res.json({ message: "welcome to books api" });
});

app.get("/books", (req, res) => {
    // current page
    const page = req.query.page || 0;
    const booksPerPage = 3;

    let books = [];

    db.collection("books")
        .find()
        .sort({ author: 1 })
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        })
        .catch(error => {
            res.status(500).json({ error: "Could not fetch documents" });
        });
});

app.get("/books/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("books")
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(error => {
                res.status(500).json({ error: "Could not fetch document" });
            });
    } else {
        res.status(500).json({ error: "Not a valid id doc" });
    }
});

app.post("/books", (req, res) => {
    const book = req.body;

    db.collection("books")
        .insertOne(book)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json({ error: "Could not create a new document" });
        });
});

app.delete("/books/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("books")
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ error: "Could not delete document" });
            });
    } else {
        res.status(500).json({ error: "Not a valid id doc" });
    }
});

app.patch("/books/:id", (req, res) => {
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)) {
        db.collection("books")
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(500).json({ error: "Could not update document" });
            });
    } else {
        res.status(500).json({ error: "Not a valid doc id" });
    }
});

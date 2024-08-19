let express = require("express");

let BookModel = require("../models/library");
let { authenticate, authorize } = require("../middleware/auth.middleware.js");

let bookRouter = express.Router();

// get request 
bookRouter.get("/getBook", async (req, res) => {
    try {
        let bookData = await BookModel.find();
        res.status(200).json({
            message: "Data received successfully",
            data: bookData
        });
    } catch (error) {
        res.status(400).send("Something went wrong while getting the data");
    }
});

// post request to add the books
bookRouter.post("/addBook",  authenticate(["creator"]), async (req, res) => {
    try {
        let { author, title, publishedDate, genre, pages } = req.body;

        let bookData = new BookModel({
            author,
            title,
            publishedDate,
            genre,
            pages
        });
        await bookData.save();
        res.status(201).send("Book created successfully");

    } catch (error) {
        res.status(400).send("Something went wrong while adding the data");
    }
});

// put request 
bookRouter.put("/update-book/:bookId", authenticate, authorize(["librarian"]), async (req, res) => {
    try {
        let { author, title, publishedDate, genre, pages } = req.body;

        let newData = { author, title, publishedDate, genre, pages };

        let id = req.params.bookId;

        await BookModel.findByIdAndUpdate(id, newData, { new: true });

        res.status(201).send("Book updated successfully");

    } catch (error) {
        res.status(400).send("Something went wrong while updating the data");
    }
});

// patch request
bookRouter.patch("/update-book/:bookId", authenticate, async (req, res) => {
    try {
        let id = req.params.bookId;

        await BookModel.findByIdAndUpdate(id, req.body);

        res.status(201).send("Book updated successfully");

    } catch (error) {
        res.status(400).send("Something went wrong while updating the data");
    }
});

// delete request
bookRouter.delete("/delete-book/:bookId", authenticate, async (req, res) => {
    try {
        let id = req.params.bookId;

        await BookModel.findByIdAndDelete(id);

        res.status(201).send("Book deleted successfully");

    } catch (error) {
        res.status(400).send("Something went wrong while deleting the data");
    }
});

module.exports = bookRouter;

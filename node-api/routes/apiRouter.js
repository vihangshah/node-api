const express = require('express');
const { model } = require('../models/bookModel');

function routes(Book) {
    const apiRouter = express.Router();
    apiRouter.route('/books')
        .post((req, res) => {
            const book = new Book(req.body);
            book.save();
            return res.status(201).json(book);
        })
        .get((req, res) => {
            const query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;

            } else if (req.query.title) {
                query.title = req.query.title;

            } else if (req.query.read) {
                query.read = req.query.read;

            } else if (req.query.author) {
                query.author = req.query.author;

            }

            Book.find(query, (err, books) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(books);
            });
        });

    apiRouter.route('/books/:bookId')
        .get((req, res) => {

            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(book);
            });
        });
    return apiRouter;
}

module.exports = routes;
const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const apiRouter = require('./routes/apiRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send("welcome to my api virtualisation with express and starting with nodemon. This is cool");
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
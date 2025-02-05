const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.json());


app.get('/', (req, res, next) => {
    res.send('Divar API is running!');
});


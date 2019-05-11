const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

const MONGO_URI = "mongodb://fr3kz:BIko0230@ds155396.mlab.com:55396/qube";
const mongoose = require("mongoose");
mongoose.connect(MONGO_URI,{ useNewUrlParser: true}).then( () => console.log('db connect'));
mongoose.connection.on('error', err => {
    console.log(`db error ${err.message}`)
});


const postRoutes = require('./routers/post');

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", postRoutes);


app.listen(8080);
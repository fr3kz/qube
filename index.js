const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");

const postRoutes = require('./routers/post');
const authRoutes = require('./routers/auth');

const MONGO_URI = "mongodb://fr3kz:BIko0230@ds155396.mlab.com:55396/qube";
const mongoose = require("mongoose");

mongoose.connect(MONGO_URI,{ useNewUrlParser: true}).then( () => console.log('db connect'));
mongoose.connection.on('error', err => {
    console.log(`db error ${err.message}`)
});


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", authRoutes);


app.listen(8080);
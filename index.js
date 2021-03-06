const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");

const postRoutes = require('./routers/post');
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');

const MONGO_URI = "mongodb://fr3kz:BIko0230@ds155396.mlab.com:55396/qube";
const mongoose = require("mongoose");

const fs = require('fs');
const cors = require('cors');

mongoose.connect(MONGO_URI,{ useNewUrlParser: true}).then( () => console.log('db connect'));
mongoose.connection.on('error', err => {
    console.log(`db error ${err.message}`)
});


app.get('/', (req,res) => {
    fs.readFile('docs/apiDocs.json', (err,data) => {
        if(err){
            res.status(400).json({error:err});
        }

        const docs = JSON.parse(data)
        res.json(docs)
    });
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err,req,res,next){
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error:"unauth"})
    }
});

app.listen(8080);
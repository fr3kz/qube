const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type:String,
        /*required: "Title is required",
        minlength: 4,
        maxlength: 20, */
        
        required: true
    },
    body: {
        type:String,
      /*  required: "Title is required",
        minlength: 4,
        maxlength: 200, */
        required: true
    }
});

module.exports = mongoose.model("Post",postSchema);
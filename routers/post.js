const express = require("express");
const postController = require('../controllers/post');
const validator = require('../validator');
const authcontroller = require("../controllers/auth");
const router = express.Router();

router.get("/",authcontroller.requireSignin ,postController.getPosts);
router.post("/post" ,validator.createPostValidator,postController.createPost);


module.exports = router;
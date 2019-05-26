const express = require("express");
const postController = require('../controllers/post');
const validator = require('../validator');
const authcontroller = require("../controllers/auth");
const router = express.Router();
const usercontroller = require("../controllers/user");

router.get("/",postController.getPosts);
router.post("/post",authcontroller.requireSignin  ,validator.createPostValidator,postController.createPost);

router.param("userId", usercontroller.userById);
module.exports = router; 
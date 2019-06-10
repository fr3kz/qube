const express = require("express");
const router = express.Router();
const postController = require('../controllers/post');
const validator = require('../validator');
const authcontroller = require("../controllers/auth");
const usercontroller = require("../controllers/user");

router.get("/",postController.getPosts);    
router.post("/post/new/:userId",authcontroller.requireSignin,postController.createPost,validator.createPostValidator);
router.get("/post/by/:userId",postController.postsByUser)
router.param("userId", usercontroller.userById);
module.exports = router; 
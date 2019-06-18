const express = require("express");
const router = express.Router();

const authcontroller = require("../controllers/auth");
const validation = require("../validator/index");

const usercontroller = require("../controllers/user");

router.post("/signup" /*,validation.createUserSignupValidation*/,authcontroller.signup);
router.post("/signin",authcontroller.signin);
router.get("/signout",authcontroller.signout);

router.param("userId", usercontroller.userById);

module.exports = router;
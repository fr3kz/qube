const express = require("express");
const router = express.Router();

const authcontroller = require("../controllers/auth");
const validation = require("../validator/index");

const usercontroller = require("../controllers/user");

router.get("/users",usercontroller.allUsers);
router.get("/users/:userId",authcontroller.requireSignin,usercontroller.getUser);
router.put("/users/:userId",authcontroller.requireSignin,usercontroller.updateUser);
router.delete("/users/:userId",authcontroller.requireSignin,usercontroller.deleteUser);

router.param("userId", usercontroller.userById);

module.exports = router;
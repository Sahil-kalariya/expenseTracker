const express = require("express");
const {login , signUp, deleteUser} = require("../controllers/authController");
const authMiddleware = require("../controllers/authMiddleware");

const router = express.Router();

router.post("/login" , login);
router.post("/signup" , signUp);
router.post("/deleteuser" , authMiddleware ,deleteUser);

module.exports = router;
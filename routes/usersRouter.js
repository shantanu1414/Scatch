const express = require("express")
const userModel = require("../models/user-model")
const router = express.Router()
const {registerUser,loginUser,logoutUser} = require('../controllers/authController')


router.get("/",function(req,res){
    res.send("hey from user")
})

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout",  logoutUser);

module.exports = router;
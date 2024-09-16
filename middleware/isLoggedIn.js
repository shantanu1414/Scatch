const jwt = require('jsonwebtoken')
const userModel = require("../models/user-model")


module.exports.isLoggedIn = async (req,res,next)=>{

    if(!req.cookie.token){
        res.flash("error","You need to LogIn first");
        return res.redirect("/");
    }
     try{
        let decoded = jwt.verify(req.cookie.token , process.env.JWT_KEY);
        let user = await userModel
        .findOne({email: decoded.email})
        .select("-password")

        req.user = user;

        next();
    }catch(err){
        res.flash("error","Something went wrong");
        res.redirect("/");
    }
}
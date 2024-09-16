const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/generateTokens')

module.exports.registerUser = async (req,res)=>{
    try{
        let {email,password,fullname} = req.body;
        let user = await userModel.findOne({email});

        if(user) return res.status(401).send("You already have an account...Please Login")

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) return res.send(err.message);
                else {
                        let createduser = await userModel.create({
                            email,
                            password: hash,
                            fullname
                    })
                    
                    let token = generateToken(createduser);
                    res.cookie("token",token);
                    res.render("User Created succesfully");
                }
            })
        })

     }catch(err){
        res.send(err.message)
    }
}

module.exports.loginUser = async (req,res)=>{
    let {email,password} = req.body;

    let user = await userModel.findOne({email});

    if(!user){
        req.flash("error","Email or password incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.send("User logged in");
        }
        else{
            req.flash("error","Email or password incorrect");
            return res.redirect("/");
        }
    });
}
    
module.exports.logoutUser = async(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}
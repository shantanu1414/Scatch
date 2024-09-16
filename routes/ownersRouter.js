const express = require("express")
const ownerModel = require("../models/owner-model")
const router = express.Router()

router.get("/",function(req,res){
    res.send("hey from owner")
})


if(process.env.NODE_ENV === "development")
{
    router.post("/create", async (req,res)=>{
    let owners = await ownerModel.find();
        if(owners.length > 0)
        {
            return res.status(504).send("You dont have permission to create an owner");
        }
        let { fullname,email,password} = req.body;
        let createduser = await ownerModel.create({
            fullname, 
            email,
            password,
        })
        res.status(201).send(createduser);
    })
}

router.get("/admin",(req,res)=>{
    let success = req.flash('success', 'Product created successfully.');
    res.render("createproducts",{success})
})
module.exports = router;
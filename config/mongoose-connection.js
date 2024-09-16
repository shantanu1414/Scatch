const mongoose = require('mongoose')
const dbgr = require('debug')("development:mongoose")
const config = require("config")



mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    console.log(process.env.NODE_ENV);
    console.log("connecteddd")
    dbgr("connected")
})
.catch(function(err){
    dbgr(err);
    
})

module.exports = mongoose.connection;
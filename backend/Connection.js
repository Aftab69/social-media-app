const mongoose = require("mongoose");
const DB = process.env.DATABASE;

    mongoose.connect(DB).then(()=>{
        console.log("connection successful")
    }).catch((error)=>{
        console.error(error);
    })

module.exports = mongoose
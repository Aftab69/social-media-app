const express = require('express')
const app = express();
require("dotenv").config({path: "./config.env"});
const PORT = process.env.PORT;
const routes = require("./Routes")
require("./Connection");
const User = require("./Schemas");
app.use(express.json({limit: '50mb'}));
app.use(routes);


app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})

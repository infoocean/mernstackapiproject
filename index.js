const express = require('express');
const app = express();
const body_parser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

//include database connection file
require('./db/db.config');

//dependies middleware
app.use(express.json());
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

//require own middleware 
const isuser_auth = require('./app/middlewares/isuser');

//router using express app

app.get("/", (req,res)=>{
    res.send("working fine");
    console.log('working fine');
})

//router for testing purpose
// app.get("/",(req,res)=>{
//     console.log("working fine");
//     res.send("working fine");
// })
//route for middleware testing purpose
// app.get('/about', isuser_auth, (req,res)=>{
//     console.log("about");
//     res.send("about");
// })

//require router file
const router = require("./router/router");
app.use("/api", router);

router.get("/", (req,res)=>{
    res.send(" api working fine");
})


//create server 
const hostname = process.env.HOSTNAME;
const port     = process.env.PORT;
//listen
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

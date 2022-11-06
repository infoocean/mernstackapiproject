const mongoose = require('mongoose');
require('dotenv').config();

//mongodb database connection type 1
//mongodb database information
const dbusername = process.env.DATABASE_USERNAME;
const dbpassword = process.env.DATABASE_PASSWORD;
const databasename = process.env.DATABASE_NAME;
DATABASE_ATLAS_URL = `mongodb+srv://${dbusername}:${dbpassword}@cluster0.c4eu5ks.mongodb.net/${databasename}?retryWrites=true&w=majority`;
//create connection
mongoose.connect(DATABASE_ATLAS_URL).then(()=>{
    console.log("db connection successfull");
}).catch((error)=>{
    console.log("not connected",error);
})

//mangodb database connection type 2
//secure connection
// const  dotenv = require('dotenv');
// const database = process.env.DATABASE_connection_atlas_URL;
// //create connection
// mongoose.connect(database,{
//     useNewUrlParser:true,
// }).then(()=>{
//     console.log("db connection success");
// }).catch((error)=>{
//     console.log("db not connected",error);
// })
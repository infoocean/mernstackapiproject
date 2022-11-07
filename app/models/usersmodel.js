const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    number:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    confirmpassword : {
        type : String,
        required : true,
        unique : true
    }
});
const usermodel  = mongoose.model('users' , userSchema);
module.exports = usermodel;
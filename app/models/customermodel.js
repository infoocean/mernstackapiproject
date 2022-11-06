const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
        required : true
    },
    number:{
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
});
const customermodel  = mongoose.model('customers' , customerSchema);
module.exports = customermodel;
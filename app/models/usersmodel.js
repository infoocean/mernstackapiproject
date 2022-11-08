const mongoose = require('mongoose');
const  bcrypt = require('bcryptjs');

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

//here we are hashing the password
userSchema.pre('save', async function (next) {
     if (this.isModified('password')){
        // Hash password and confirm password with strength of 12
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
    }
    next();
  });

const usermodel  = mongoose.model('users' , userSchema);
module.exports = usermodel;

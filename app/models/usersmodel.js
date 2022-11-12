const mongoose = require('mongoose');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    tokens : [
         {
            token : {
                type : String
             }
         }
    ]
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

  //generate login auth tokens
  userSchema.methods.generateAuthToken = async function() {
     try {
        //generate token
        let token = jwt.sign({_id:this._id}, process.env.LOGIN_JWT_SECRET_KEY);
        //stored token in db
        this.tokens = this.tokens.concat( { token : token } );
        await this.save();
        //return token
        return token;
     } catch (error) {
        console.log(error);
     }        
  }

const usermodel  = mongoose.model('users' , userSchema);
module.exports = usermodel;

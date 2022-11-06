const express = require('express');
const router = express.Router();

//require cusromer model
const customermodel = require('../app/models/customermodel');

// insert customer  data using promises 
/*
router.post('/customerregistration', (req, res) => {
    //console.log(req.body);
    //res.json({message: req.body}); for json responce
    //object destructing
    const {firstname, lastname, email, number, password, message} = req.body;
    const userdata = new customermodel({firstname, lastname, email, number, password, message});
    if(!email || !number || !password){
         return res.status(422).send({message:"email, number and password feild are required"});
    }else{
        customermodel.find({email:email}).then((result)=>{
            //console.log(result);
            if(result.length > 0){
                return res.status(200).json({message:"email allready exists"});
            }else{
                userdata.save().then((result)=>{
                    res.status(201).send({message:"data submitted successfully", data:{result}});
                }).catch((err)=>{
                    res.status(500);
                    res.json({message: "data not submited", err});
                })
            }
        }).catch((error)=>{
              res.send({error:error.message});
        }) 
    }
});
*/

// insert data using Async Await method (try catch)
router.post('/customerregistration', async(req, res) => {
    //console.log(req.body);
    const userdata = new customermodel({
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        email     : req.body.email,
        number    :  req.body.number,
        password  : req.body.password,
        message   : req.body.message
    });
    //console.log(userdata);
    try {
        const check_email_allready_exists =  await customermodel.findOne({email:req.body.email});
        //console.log(check_email_allready_exists);
        if(check_email_allready_exists !== null){
            return res.status(200).send({error:"email allready exists"});
        }
        const savedata = await userdata.save();
        if(savedata){
            res.status(201).send({message:"data submitted successfully", data:{savedata}});
        }
    } catch (error) {
        res.status(500).send({error:error.message});
    }
})


//user registration router
router.post('/userregistration', (req,res)=>{
    res.send("userregistration")
})

//user login router
router.post('/userlogin', (req,res)=>{
    res.send("userlogin")
})

module.exports =  router;


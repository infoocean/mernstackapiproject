// require models
const usermodel =  require('../../models/usersmodel');
const  bcrypt = require('bcryptjs');

//user registration controller
const userregistration = async (req, res)=>{
      //console.log(req.body);
      const userdata =  new usermodel(req.body) 
      //console.log(userdata);
      try {
        if(!userdata.email || 
            !userdata.firstname ||  
            !userdata.lastname  || 
            !userdata.number  || 
            !userdata.password  || 
            !userdata.confirmpassword ){
           return  res.status(400).send( {message : "all feild is required" });
        }
        const check_is_user = await usermodel.findOne( {email : userdata.email } );
        //console.log(check_is_user);
        if(check_is_user === null){
            const saveuserdata = await userdata.save();
            //console.log(saveuserdata);
            if(saveuserdata){
                const sendsomedata = {
                    firstname : saveuserdata.firstname,
                    lastname  : saveuserdata.lastname,
                    email     : saveuserdata.email,
                    number    : saveuserdata.number
                }
                return res.status(201).send( {message : "data save successfully", data : sendsomedata })
            }
        }else{
             res.status(200).send({ message : "email allready registred" });
        }
      } catch (error) {
        res.status(500).send({ error : error.message });
      }
}

//user login controller
const userlogin = async (req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"all feild required"});
        }
        const isuser = await usermodel.findOne( { email : email } );
        //console.log(isuser);
        //console.log(isMatch);
        if(isuser !== null){
            //verify password
            const isMatch = await bcrypt.compare(password, isuser.password);
            if(isMatch){
                const sendsomedata = {
                    firstname : isuser.firstname,
                    lastname  : isuser.lastname,
                    email     : isuser.email,
                    number    : isuser.number
                }
                res.status(200).send({message:"login successfully", data : sendsomedata});
            }else{
                res.status(400).send({message:"invalid crendential"}); 
            }
        }else{
            res.status(400).send({message:"invalid crendential"}); 
        }
    } catch (error) {
      res.status(500).send({error:error.message});
    }
}

module.exports  = {userregistration, userlogin};
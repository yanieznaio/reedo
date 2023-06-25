const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({"messages": "username and password are required"});
    
    //check for duplicate username in the db
    const duplicate = await User.findOne({username: user}).exec();
    if (duplicate) return res.sendStatus(409) //409 conflict

    try{
        //encrypt the pwd with bcrypt
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //create and store store the new user
        const result = await User.create({
            "username": user, 
            "password": hashedPwd
        });

         
        console.log(result);


        res.status(201).json({"message": `New user ${user} created!`});
        

    }
    catch(err){
        res.status(500).json({"message" : err.message}) //500 serveur err
    }
}

module.exports = {handleNewUser};
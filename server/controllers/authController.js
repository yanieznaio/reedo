const User = require('../model/User')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({"messages": "username and password are required"});

    const foundUser = await User.findOne({username: user}).exec()
    if(!foundUser) return res.sendStatus(401); //unauthorized
    // evaluate password

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles).filter(Boolean);
        
        // create JWTs
        const accessToken = jwt.sign( 
            {"UserInfo": {
                "userId": foundUser.id,
                "username": foundUser.username,
                "roles": roles
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '3000s'}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        //saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save()
        console.log(result);
        console.log(roles);
        
        // const result = await User.connect()
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000});
        res.json({roles, accessToken});
     }
    else{
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}
const User = require('../model/User');


const handleLogout = async(req, res) => {
    // on client, also delete the acessToken
    const cookies= req.cookies
    if(!cookies?.jwt) return res.sendStatus(204); //succesful but No content
    const refreshToken = cookies.jwt

    // is refreshToken in db

    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true})
        return res.sendStatus(204)
    }

    //delete refreshToken in db
    foundUser.refreshToken = '';
    result = await foundUser.save();
    console.log(result)
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true}); //secure: true - only serve on https => we don't add this in development but we will in production 
    res.sendStatus(204);

        
}

module.exports = {handleLogout}
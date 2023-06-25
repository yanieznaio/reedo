
//Cross origin ressourc sharing
const allowedlist = require('./allowedOrigins')
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedlist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }
        else{
            callback(new Error('not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
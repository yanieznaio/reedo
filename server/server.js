require('dotenv').config();
const express = require('express');
const app  = express()
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOption')
const {logger, logEvents} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500;

//Connect to MongoDB
connectDB()


//custom middleware logger
app.use(logger);
app.use(credentials)
app.use(cors(corsOptions));
//built in middleware to handle urlencoded data
app.use(express.urlencoded({extended: false}));
//built in middleware for json 
app.use(express.json());


//midleware for cookie
app.use(cookieParser());

//built-in serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//routes 
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh') )
app.use('/logout', require('./routes/logout') )
app.use('/users', require('./routes/api/users'));
app.use('/books', require('./routes/api/books'))
app.use(verifyJWT);

app.use('/employees', require('./routes/api/employees'))


app.all('*', (req, res) => {

    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html')); 
    }
    else if(req.accepts('json')){
        res.json({err: "404 Not found"});
    }
    else{
        res.type('txt').send('404 not found')
    }
});


app.use(errorHandler);


mongoose.connection.once('open', () => {
    console.log('Connected to  MongoDB');
    app.listen(PORT, () => (console.log(`server runnin on port ${PORT}`)));
});


// 3 types of middleware: built in middleware, custom midleware, middleware from third parties
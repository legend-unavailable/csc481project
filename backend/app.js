const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const creationRoute = require('./api/routes/eventCreation');
const statsRoute = require('./api/routes/eventStats');
const homeRoute = require('./api/routes/home');
const loginRoute = require('./api/routes/login');
const userRoute = require('./api/routes/user');
const signUpRoute = require('./api/routes/signup');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes handle requests
app.use('/eventCreation', creationRoute);
app.use('/eventStats', statsRoute);
app.use('/home', homeRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/signup', signUpRoute);

//bypass CORS error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//errors that pass other routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//catches all errors
/*app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})*/

module.exports = app;
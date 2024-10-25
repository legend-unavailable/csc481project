const express = require('express');
const app = express();

const creationRoute = require('./api/routes/eventCreation');
const statsRoute = require('./api/routes/eventStats');
const homeRoute = require('./api/routes/home');
const loginRoute = require('./api/routes/login');

//routes handle requests
app.use('/eventCreation', creationRoute);
app.use('/eventStats', statsRoute);
app.use('/home', homeRoute);
app.use('/login', loginRoute);


//errors that pass other routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//catches all errors
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
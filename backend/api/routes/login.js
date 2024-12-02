const express = require('express');
const router = express.Router();

const {userExists}  = require('../database/database.js');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET requests to login'
    });
});

//Handle requests to login using user id and password and redirects to user data page
router.post('/', async (req, res, next) => {
    const {email, password_hash} = req.body
    const user = userExists(email, password_hash)

    console.log(email);
    

    if (user){
        res.status(201).send(user);
        /*({
            message: "Successfully logged in!",
            Location: '/home:user_id',
        });*/
    } else {
        return res.status(400).json({
            error: {
                message: "Error, user not found."
            },
            Location: '/home',
        });
    }
    //need to return true/false to frontend
});

module.exports = router;
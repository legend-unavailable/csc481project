const express = require('express');
const router = express.Router();

const {userExists}  = require('../database/database.js');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET requests to login'
    });
});

//Handle requests to login using user id and password and redirects to user data page
router.get('/', async (req, res, next) => {
    const {user_id, password_hash} = req.body
    const user = userExists(user_id, password_hash)

    if (user){
        res.status(301).json({
            message: "Successfully logged in!",
            Location: '/home:user_id',
        });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const {createUser} = require('../database/database.js');

router.get('/signup', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET requests to login',
    });
});

//Handle request to register user
router.post('/signup', async (req, res, next) => {
    const {user_id, first_name, last_name, email, password_hash, role} = req.body
    if (!user_id || !first_name || !last_name || !email || !password_hash){
        res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }
    //must check if email already exists
    const signUp = await createUser(user_id, first_name, last_name, email, password_hash, role)

    res.status(201).json({
        signUp: signUp,
        message: 'Successfully created an account!',
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();


const {getUserData, updateUserData} = require('../database/database.js');
//sample user data
/*
const user ={
    email: 'test@gmail.com',
    name: 'first last',
    dateOfBirth: '2024-02-08',
    password: 'password'
};
*/


//Handle GET requests to retrive user data 
router.get('/:user_id', (req, res, next) => {
    const user = getUserData(user_id)

    res.status(200).json({
        user: user,
        message : 'User details retrived successfully',
    });
});

//Handle requests to update user data
router.put('/', async (req, res, next) => {
    const {user_id, first_name, last_name, email, password_hash} = req.body
    const user = updateUserData(user_id, first_name, last_name, email, password_hash)

    res.status(200).json({
        user: user,
        message: "Updated user data successfully!"
    });
});

module.exports = router;
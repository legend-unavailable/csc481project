const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET requests to login'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling POST requests to login'
    });
});

module.exports = router;
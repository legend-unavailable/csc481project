const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create database connection
const connection = mysql.createConnection({
    host: '192.168.1.90',// Elizabeth IP server
    user: 'root',// Elizabeth user
    password: 'root', // Elizabeth pss
    database: 'eventmanage'
});

// GET all users
router.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
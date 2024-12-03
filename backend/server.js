/*const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {origin: ['http://localhost:5173']};

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.json({str: 'This message was sent from server.js'});
});
//http://localhost:5173/api or http://localhost:3000/api

app.listen(3000, () => {
    console.log('Server started on port 3000'); 
});*/

/*const express = require('express');
const cors = require('cors');
const usersRouter = require('./api/users');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/

/*Elizabeth FLores*/

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: '192.168.1.90',  // Replace with your MySQL server IP
    user: 'root',
    password: 'root',
    database: 'eventmanage'
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
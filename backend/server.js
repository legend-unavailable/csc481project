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

const express = require('express');
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
});
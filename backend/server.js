const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {origin: ['http://localhost:5173']};

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.json({str: 'yuuuurrr'});
});
//http://localhost:5173/api or http://localhost:3000/api

app.listen(3000, () => {
    console.log('Server started on port 3000'); 
});
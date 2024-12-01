const http = require('http');
const app = require('./app');

const port = 3000;

const server = http.createServer(app);

//server.listen(port);

const cors = require('cors');
const corsOptions = {origin: ['http://localhost:5173']};

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.json({str: 'This message was sent from server.js'});
});
//http://localhost:5173/api or http://localhost:3000/api

server.listen(port, () => {
    console.log('Server started on port 3000'); 
});

//this is just to test the commit
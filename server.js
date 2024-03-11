import express from 'express';
// create an Express.js server (aka app)
const app = express();

// Serve files from the 'client' directory
app.use(express.static('Client'));

// make the server available on the network
app.listen(8080);

const path = require('path');
const express = require('express');
const http = require('http'); // built in node module
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);

// Socket.io setup
let io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

// Express Middleware
app.use(express.static(publicPath));

// Socket.io setup
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User was disconnected from server')
    })
});

// Port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

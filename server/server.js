
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
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

    // Listener for joining a room
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required')
        }
        
        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
    
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();

    });

    // Geolocation
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected from server')
    });
});

// Port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

// V6 - Message generator
// create utils/message.js
// Mocha/expect testing
const path = require('path');
const express = require('express');
const http = require('http'); // built in node module
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message')
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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // io.emit emits event to every single connection
        io.emit('newMessage', generateMessage(message.from, message.text));
        
        // broadcasting - sends to everyone EXCEPT the person who posted it
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        // To test -can emit in console in browser: socket.emit('createMessage', {from: 'Emily', text: 'hi'});

    });

    socket.on('disconnect', () => {
        console.log('User was disconnected from server')
    });
});

// Port
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});

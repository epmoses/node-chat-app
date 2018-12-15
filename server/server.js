// V5 - Broadcasting events/basic messaging system
// emitting events to everyone except user
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

    // Challenge - emit 2 events when a user connects
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });


    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // io.emit emits event to every single connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        
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

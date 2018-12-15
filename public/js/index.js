// V5 - Broadcasting events/basic messaging system
// Client side JS
let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server')
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);
});


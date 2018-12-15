// Client side JS
let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'Emily',
        text: 'Yep, that workd for me.'
    })
});

socket.on('disconnect', () => {
    console.log('Disconnected from server')
});

socket.on('newMessage', (message) => {
    console.log('newMessage', message);
});


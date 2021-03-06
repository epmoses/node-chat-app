let socket = io();

function scrollToBottom() {
    // Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
   
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        // Should scroll
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    // When we start, join a room
    let params = jQuery.deparam(window.location.search);
    // Client to server
    socket.emit('join', params, (err) => {
        if(err) {
            // Don't join room
            alert(err);
            window.location.href = '/';
        } else {
            // Join room
            console.log('no error')
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server')
});

// Updates User List
socket.on('updateUserList', (users) => {
    let ul = jQuery('<ul></ul>');
    users.forEach((user) => {
        ul.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ul);
});

// Create Message Event
socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);
    scrollToBottom();
});

// Form
jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    });
});

// Geolocation
let locationButton = jQuery('#send-location');

locationButton.on('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser. Would you kindly join the rest of the world, and update your browser?')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location. Please give us permission to share your location.')
    })
});
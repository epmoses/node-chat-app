const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

// Message Test
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Emily';
        let text = 'Some message';
        let message = generateMessage(from, text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

// Geolocation Test
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Chris';
        let latitude = 15;
        let longitude = 20;
        let url = 'https://www.google.com/maps?q=15,20';
        let message = generateLocationMessage(from, latitude, longitude);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});
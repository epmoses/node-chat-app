// Tests for message function
const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    // Individual test case
    it('should generate correct message object', () => {
        // store res in variable
        let from = 'Emily';
        let text = 'Some message';
        let message = generateMessage(from, text);
        
        // assert createdAt is number
        expect(typeof message.createdAt).toBe('number');
        // assert from match
        // assert text match
        expect(message).toMatchObject({from, text});
    });
});
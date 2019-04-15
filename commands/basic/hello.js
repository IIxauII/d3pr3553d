const {
    Command,
} = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hello',
            group: 'basic',
            memberName: 'hello',
            description: 'Says hello to you.',
            examples: ['hello'],
        });
    }

    // eslint-disable-next-line class-methods-use-this
    run(msg) {
        return msg.say('Hello there!');
    }
};

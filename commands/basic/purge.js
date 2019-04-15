const {
    Command,
} = require('discord.js-commando');
const miniEmbed = require('../../lib/miniEmbed.js');

module.exports = class PurgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'basic',
            memberName: 'purge',
            description: 'Purges messages.',
            examples: ['purge 5'],
            args: [{
                key: 'messageNumber',
                prompt: 'How many messages would you like to delete?',
                type: 'string',
                max: '2',
                min: '1',
            }],
        });
    }

    run(msg, {
        messageNumber,
    }) {
        const amount = parseInt(messageNumber, 10);

        if (!amount || amount < 1 || amount > 10) {
            return msg.say('Use a number between 1 and 10');
        }

        msg.channel.fetchMessages({
            limit: amount + 1,
        }).then((messages) => {
            msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        });

        const fieldArray = [{
            name: 'Purge information',
            value: `Deleted ${amount} messages`,
        }];
        let responseMessage;
        setTimeout(() => {
            msg.channel.send(miniEmbed.createMiniEmbed(this.client, '', fieldArray));

            msg.channel.fetchMessages({
                limit: 1,
            }).then((messages) => {
                responseMessage = messages;
            });
        }, 500);

        setTimeout(() => {
            msg.channel.bulkDelete(responseMessage).catch(error => console.log(error.stack));
        }, 3000);
    }
};

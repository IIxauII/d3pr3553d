const microEmbed = require('../../lib/microEmbed.js');
const adminConfig = require('../../configs/admin.json');

exports.run = (client, message, args) => {
    const responseSelfDeleteTime = 3000;
    const amount = parseInt(args[0], 10);

    if (!amount || amount < 1 || amount > 10) {
        return message.reply(microEmbed.createMicroEmbed(client, 'Use a number between 1 and 10 as arg'));
    }

    // adding + 1 to include command message
    message.channel.bulkDelete(amount + 1)
        .then((messages) => {
            console.log(`Bulk deleted ${messages.size - 1} messages`);
            const filter = m => m.author.id === adminConfig.bot.id;
            message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
                .then((collected) => {
                    setTimeout(() => {
                        collected.first().delete();
                    }, responseSelfDeleteTime);
                })
                .catch((err) => {
                    console.error(err);
                });

            message.channel.send(microEmbed.createMicroEmbed(client, `Deleted ${messages.size - 1} messages`, `This message will self delete in ${responseSelfDeleteTime / 1000} seconds`));
        })
        .catch((err) => {
            console.error(err);
        });
};

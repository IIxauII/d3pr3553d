/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
exports.run = (client, message, args) => {
    if (servers[message.guild.id]) {
        const server = servers[message.guild.id];
        message.reply(server.queue);
    } else {
        message.reply('There is no queue for this server');
    }
};

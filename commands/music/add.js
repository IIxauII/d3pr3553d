/* eslint-disable no-undef */
const verifyUrl = require('../../lib/verifyUrl.js');

exports.run = (client, message, args) => {
    console.log(verifyUrl.verifyUrl(args[0]));
    if (verifyUrl.verifyUrl(args[0])) {
        if (servers[message.guild.id]) {
            const server = servers[message.guild.id];
            server.queue.push(args[0]);
            console.log(server.queue);
        } else {
            servers[message.guild.id] = { queue: [] };
            const server = servers[message.guild.id];
            server.queue.push(args[0]);
            console.log(server.queue);
        }
    } else {
        message.reply('Please enter a valid youtube url!');
    }
};

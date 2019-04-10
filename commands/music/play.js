/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const ytdl = require('ytdl-core');

exports.run = (client, message, args) => {
    console.log(message.guild.voiceConnection);
    const connection = message.guild.voiceConnection;
    const server = servers[message.guild.id];

    function play() {
        server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: 'audioonly' }));
        server.queue.shift();
        console.log(server.queue);
        server.dispatcher.on('end', () => {
            if (server.queue[0]) {
                play();
            } else {
                connection.disconnect();
            }
        });
    }

    if (server.queue[0]) {
        play();
    } else {
        message.reply('Please add something to the qeueue');
    }
};

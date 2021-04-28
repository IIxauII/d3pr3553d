/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const ytdl = require('ytdl-core');

exports.run = (client, message, args) => {
    //console.log(message.guild.voice.connection);
    const connection = message.guild.voice.connection;
    const server = servers[message.guild.id];

    function play() {
        // create commands for increasing or decreasing volumes
        // https://stackoverflow.com/questions/63697430/how-to-change-the-volume-of-the-music-discord-js
        // https://discord.js.org/#/docs/main/stable/class/StreamDispatcher


        // fix audio quality:
        // https://stackoverflow.com/questions/51344574/improvring-discord-js-audio-quailty-for-my-bot
        server.dispatcher = connection.play(ytdl(server.queue[0], { quality: 'highestaudio', filter: 'audioonly' }), { volume: 0.25 });
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

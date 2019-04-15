const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();

const adminConfig = require('./configs/admin.json');

const { token } = adminConfig;

// for different queues & voice channels
global.servers = {};

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.login(token);

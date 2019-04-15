const discord = require('discord.js');
const commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

const adminConfig = require('./configs/admin.json');
const mainConfig = require('./configs/main.json');

const {
    prefix,
} = mainConfig;
const {
    token,
    admins,
} = adminConfig;

// eslint-disable-next-line no-unused-vars
const clientDiscord = new discord.Client();
const clientCommando = new commando.Client({
    commandPrefix: prefix,
    owner: [admins.user1, admins.user2], // can also be array of user id's (on master branch only)
    disableEveryone: true, // prevents bot from mentioning @everyone

});

clientCommando.registry
    .registerDefaultTypes()
    .registerGroups([
        ['basic', 'Basic commands for testing and other primitive stuff'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

// for different queues & voice channels
global.servers = {};

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        clientCommando.on(eventName, (...args) => eventFunction.run(clientCommando, ...args));
    });
});

clientCommando.login(token);

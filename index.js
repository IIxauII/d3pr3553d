const discord = require('discord.js');
const client = new discord.Client();

const mainConfig = require('./configs/main.json');
const adminConfig = require('./configs/admin.json');

let prefix = mainConfig.prefix;
let token = adminConfig.token;
let adminId1 = adminConfig.adminId;

//for different queues & voice channels
global.servers = {};

const fs = require('fs');

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));        
    });
});

client.login(token);
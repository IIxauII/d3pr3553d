const fs = require('fs');
const codeEmbed = require('../../lib/codeEmbed.js');

exports.run = (client, message, args) => {
    let fileName = '';
    let found = false;
    fs.readdir('./configs/', (err, files) => {
        if (err) return console.error(err);
        if (!args[0]) {
            message.reply(files);
            found = true;
            return;
        }
        files.forEach((file) => {
            // eslint-disable-next-line prefer-destructuring
            fileName = file.split('.')[0];
            if (args[0] === fileName && args[0] !== 'admin') { // prevent displaying of api tokens etc
                found = true;
                const jsonObj = require(`../../configs/${args[0]}.json`); // meeds to be made bulletproof
                const jsonString = JSON.stringify(jsonObj, null, 4);
                message.channel.send(codeEmbed.makeString(jsonString, 'json'));
            }
        });
    });

    setTimeout(() => {
        if (!found) {
            message.channel.send(`file: \`${args[0]}\` not found`);
        }
    }, 500);
};

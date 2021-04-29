/* eslint-disable no-restricted-syntax */
const mainConfig = require('../configs/main.json');
const adminConfig = require('../configs/admin.json');
const commandsObj = require('../configs/commands.json');
const mirror = require('../lib/mirror');

const { prefix } = mainConfig;
const admin1 = adminConfig.admins.user1; // user1
const admin2 = adminConfig.admins.user2; // user2

exports.run = (client, message) => {
    // typeracer automation
    /* if (message.author.id === 474670778248331276) {
        const attachments = message.attachments.array();
        if (attachments && attachments.length > 0) {
            attachments.forEach((attachment) => {
                console.log(attachment.url);
                if (attachment.url) {
                    const imgUrl = attachment.url;
                    const tesseract = require('tesseract.js');
                    tesseract.recognize(imgUrl, {
                        lang: 'eng',
                    })
                        .then((result) => {
                            console.log(result.confidence);
                            // let testChannel = client.channels.get('563804543645777921');
                            // testChannel.send(imgUrl);
                            // testChannel.send(result.text);
                            // testChannel.send(result.confidence);
                            let formattedText = result.text.replace(/\n/g, ' ');
                            formattedText = formattedText.slice(0, -2);
                            const textArray = formattedText.split(' ');
                            const pauseTime = (textArray.length * 1000) / 3;
                            console.log(formattedText);
                            console.log(`${pauseTime}ms`);
                            setTimeout(() => {
                                message.channel.send(formattedText);
                            }, pauseTime);
                        });
                }
            });
        }
        return;
    } */
    if (message.author.bot) return;

    // check if message was posted in a mirror target & process if necessary
    if (mirror.isMirrorTarget(message)) {
        mirror.sendMessageToMirror(client, message);
    }

    if (message.content.indexOf(prefix) !== 0) return;
    if (message.author.id !== admin1 && message.author.id !== admin2) return;
    //console.log('reached debug 1');

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    for (const key in commandsObj) {
        if (Array.isArray(commandsObj[key])) {
            if (commandsObj[key].length > 0) {
                const folderName = key;
                for (let x = 0; x < commandsObj[key].length; x++) {
                    const fileName = commandsObj[key][x];
                    const commandName = fileName.substring(0, fileName.length - 3);
                    if (command === commandName) {
                        try {
                            const commandFile = require(`../commands/${folderName}/${fileName}`);
                            commandFile.run(client, message, args);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
        }
    }
};

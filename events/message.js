const mainConfig = require('../configs/main.json');
const adminConfig = require('../configs/admin.json');
const commandsObj = require('../configs/commands.json');

let prefix = mainConfig.prefix;
let admin1 = adminConfig.admins.user1; //user1
let admin2 = adminConfig.admins.user2; //user2

exports.run = (client,  message) => {
    //console.log(message.author.id);
    if (message.author.id == 474670778248331276) {
        let attachments = message.attachments.array();
        if (attachments && attachments.length > 0) {
            attachments.forEach(function(attachment) {
                console.log(attachment.url);
                if (attachment.url) {                    
                    let imgUrl = attachment.url;
                    const tesseract = require('tesseract.js');
                    tesseract.recognize(imgUrl, {
                        lang: 'eng'
                    })
                    .then(function(result) {                        
                        console.log(result.confidence);
                        //let testChannel = client.channels.get('563804543645777921');
                        //testChannel.send(imgUrl);
                        //testChannel.send(result.text);
                        //testChannel.send(result.confidence);
                        let formattedText = result.text.replace(/\n/g," ");
                        formattedText = formattedText.slice(0, -2);
                        let textArray = formattedText.split(" ");
                        let pauseTime = (textArray.length * 1000) / 2.5;
                        console.log(formattedText);
                        console.log(pauseTime + "ms");
                        setTimeout(function() {
                            message.channel.send(formattedText);
                        }, pauseTime);
                    })
                    
                }
            })
        }
        return;
    }    
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (message.author.id != admin1 && message.author.id != admin2) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    for (let key in commandsObj) {
        if (Array.isArray(commandsObj[key])) {
            if (commandsObj[key].length > 0) {
                let folderName = key;                
                for (let x = 0; x < commandsObj[key].length; x++) {
                    let fileName = commandsObj[key][x];
                    let commandName = fileName.substring(0, fileName.length - 3);
                    if (command === commandName) {
                        try {
                            let commandFile = require(`../commands/${folderName}/${fileName}`);
                            commandFile.run(client, message, args);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            }
        }
    }
}
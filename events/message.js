const mainConfig = require('../configs/main.json');
const adminConfig = require('../configs/admin.json');
const commandsObj = require('../configs/commands.json');

let prefix = mainConfig.prefix;
let admin1 = adminConfig.admins.user1; //user1
let admin2 = adminConfig.admins.user2; //user2

exports.run = (client,  message) => {
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
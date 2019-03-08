const fs = require('fs');

exports.run = (client) => {
    let fileArray = [];
    let object = {};
    let options = {
        encoding: "utf-8",
        withFileTypes: true
    }

    let folders = fs.readdirSync("./commands/", options);
    folders.forEach(folder => {        
        if (folder.isDirectory()) {
            let files = fs.readdirSync(`./commands/${folder.name}/`, options);
            files.forEach(file => {
                fileArray.push(file.name);
            });
        }
        object[folder.name] = fileArray;
        fileArray = [];
    });

    /* console.log("---");
    console.log(object);
    console.log("---"); */

    let objectString = JSON.stringify(object, null, 4);
    fs.writeFileSync("./configs/commands.json", objectString);

    console.log(`Ready! Currently in ${client.channels.size} channels on ${client.guilds.size} servers\n${client.users.size} users`);
}
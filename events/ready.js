const fs = require('fs');

exports.run = (client) => {
    let fileArray = [];
    const object = {};
    const options = {
        encoding: 'utf-8',
        withFileTypes: true,
    };

    const folders = fs.readdirSync('./commands/', options);
    folders.forEach((folder) => {
        if (folder.isDirectory()) {
            const files = fs.readdirSync(`./commands/${folder.name}/`, options);
            files.forEach((file) => {
                fileArray.push(file.name);
            });
        }
        object[folder.name] = fileArray;
        fileArray = [];
    });

    /* console.log("---");
    console.log(object);
    console.log("---"); */

    const objectString = JSON.stringify(object, null, 4);
    fs.writeFileSync('./configs/commands.json', objectString);

    console.log(`Ready! Currently in ${client.channels.size} channels on ${client.guilds.size} servers\n${client.users.size} users`);
    console.log(`${client.user.username}`);
    console.log(`${client.user.tag}`);
};

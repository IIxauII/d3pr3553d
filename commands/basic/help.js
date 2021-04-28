// Utilizes readjson command to display commands.json
// super basic, needs to make user friendly!

exports.run = (client, message) => {
    const readJsonCommand = require('../../commands/info/readjson');
    const customArg = ['commands'];
    console.log('im hereÄ');
    readJsonCommand.run(client, message, customArg);
};

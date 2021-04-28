const microEmbed = require("../../lib/microEmbed");
const colors = require('../../configs/colors.json');

// eslint-disable-next-line no-unused-vars
exports.run = (client, message, args) => {
    message.channel.send(microEmbed.createMicroEmbed(client, 'Hello!'));
};

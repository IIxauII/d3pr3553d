const miniEmbed = require("../../lib/miniEmbed");
const colors = require('../../configs/colors.json');

// eslint-disable-next-line no-unused-vars
exports.run = (client, message, args) => {
    const guildsArray = client.guilds.cache.array();
    const embedArray = [];
    embedArray.push(miniEmbed.createMiniEmbedFields(`Guilds`, guildsArray.length));
    guildsArray.forEach((element) => {
        embedArray.push(miniEmbed.createMiniEmbedFields(element.name, element.id));
    });
    message.channel.send(miniEmbed.createMiniEmbed(client, colors.violet, embedArray));
};

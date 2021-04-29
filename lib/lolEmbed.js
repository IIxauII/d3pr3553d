const discord = require('discord.js');
const colors = require('../configs/colors.json');

module.exports = {
    createLolSummonerEmbed(client, imagePath, imageName, fields, footerText) {
        const attachment = new discord.MessageAttachment(imagePath, imageName);
        const embedObject = {
            embed: {
                files: [
                    attachment,
                ],
                fields: fields,
                image: {
                    url: `attachment://${imageName}`,
                },
                footer : {
                    icon_url: client.user.avatarURL(),
                    text: footerText,
                },
            },
        };
        return embedObject;
    }
}
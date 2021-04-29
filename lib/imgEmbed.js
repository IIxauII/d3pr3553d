const discord = require('discord.js');
const colorConverter = require('hex2dec');
const embedConfig = require('../configs/embed.json');
const verifyHex = require('../lib/verifyHex.js');
const verifyString = require('../lib/verifyString.js');

let emColor = embedConfig.color;
let emImage = embedConfig.image;
let emText = embedConfig.footer.text;

module.exports = {
    createImgEmbed(client, color, image, footerText) {
        if (verifyHex.verifyHex(color)) {
            //emColor = colorConverter.hexToDec(color);
            emColor = color;
        }
        if (image) {
            emImage = image;
        }
        if (footerText && verifyString.hasChars(footerText)) {
            emText = footerText;
        }

        const embedObject = {
            embed: {
                color: emColor,
                image: {
                    url: emImage,
                },
                footer: {
                    icon_url: client.user.avatarURL(),
                    text: emText,
                },
            },
        };

        return embedObject;
    },
    createLocalImgEmbed(client, imagePath, imageName, footerText) {
        const attachment = new discord.MessageAttachment(imagePath, imageName);
        const embedObject = {
            embed: {
                files: [
                    attachment,
                ],
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
    },
};

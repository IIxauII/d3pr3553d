const colorConverter = require('hex2dec');
const verifyHex = require('../lib/verifyHex.js');
const embedConfig = require('../configs/embed.json');
const verifyString = require('../lib/verifyString.js');

let emColor = embedConfig.color;
let emDescription = embedConfig.description;

module.exports = {
    createMicroEmbed(client, description, footer, color) {
        if (color && verifyHex.verifyHex(color)) {
            // using hex color since dec color has a bug within discord.js
            //emColor = colorConverter.hexToDec(color);
            emColor = color;
        } else {
            //emColor = colorConverter.hexToDec(emColor);
            emColor = emColor;
        }
        if (description && verifyString.hasChars(description)) {
            emDescription = description
        }
        const embedObject = {
            embed: {
                color: emColor,
                description: emDescription,
            },
        };
        if (footer && verifyString.hasChars(footer)) {
            embedObject.embed.footer = {
                text: footer
            };
        }

        return embedObject;
    },
    createMicroEmbedWithTimeStamp(client, description, footer, timestamp, color) {
        let embedObject = this.createMicroEmbed(client, description, footer, color);
        if (timestamp) {
            embedObject.embed.timestamp = timestamp;
        }

        return embedObject;
    }
};

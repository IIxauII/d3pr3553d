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
            emColor = colorConverter.hexToDec(color);
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
                    icon_url: client.user.avatarURL,
                    text: emText,
                },
            },
        };

        return embedObject;
    },
};

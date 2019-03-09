const embedConfig = require("../configs/embed.json");
const verifyHex = require("../lib/verifyHex.js");
const colorConverter = require("hex2dec");

let emColor = embedConfig.color;
let emImage = embedConfig.image;

module.exports = {
    createImgEmbed: function(client, color, image) {
        if (verifyHex.verifyHex(color)) {
            emColor = colorConverter.hexToDec(color);
        }
        if (image) {
            emImage = image;
        }

        let embedObject = {embed: {
            color: emColor,
            image: {
                url: emImage
            },
            footer: {
                icon_url: client.user.avatarURL,
                text: embedConfig.footer.text
            }
        }};

        return embedObject;
    }
};
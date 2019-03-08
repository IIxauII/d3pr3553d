const colorConverter = require("hex2dec");
const verifyHex = require("../lib/verifyHex.js");
const embedConfig = require("../configs/embed.json");

let emColor = embedConfig.color;
let emFields = embedConfig.fields;

module.exports = {
    createMiniEmbed: function (client, color, fields) {                
        if (verifyHex.verifyHex(color)) {
            emColor = colorConverter.hexToDec(color);            
        } else {
            emColor = colorConverter.hexToDec(emColor);
        }       
        if (Array.isArray(fields)) {
            emFields = fields;
        }
        let embedObject = {embed:{
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL,
            },
            color: emColor,
            fields: emFields,
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: embedConfig.footer.text
            }
        }};

        return embedObject;
    }
};
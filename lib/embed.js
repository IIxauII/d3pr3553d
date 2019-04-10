const imgValidator = require('is-image-url');
const colorConverter = require('hex2dec');
const embedConfig = require('../configs/embed.json');
const verifyHex = require('../lib/verifyHex.js');
const verifyUrl = require('../lib/verifyUrl.js');
const verifyString = require('../lib/verifyString.js');

let emColor = embedConfig.color;
let emTitle = embedConfig.title;
let emUrl = embedConfig.url;
let emDescription = embedConfig.description;
let emThumbnail = embedConfig.thumbnail;
let emFields = embedConfig.fields;
let emImage = embedConfig.image;

module.exports = {
    createEmbed(client, color, title, url, description, thumbnail, fields, image) {
        if (verifyHex.verifyHex(color)) {
            emColor = colorConverter.hexToDec(color);
        }
        if (verifyString.hasChars(title)) {
            emTitle = title;
        }
        if (verifyUrl.verifyUrl(url)) {
            emUrl = url;
        }
        if (verifyString.hasChars(description)) {
            emDescription = description;
        }
        if (imgValidator(thumbnail)) {
            emThumbnail = thumbnail;
        }
        if (Array.isArray(fields)) {
            emFields = fields;
        }
        if (imgValidator(image)) {
            emImage = image;
        }

        const embedObject = {
            embed: {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL,
                },
                color: emColor,
                title: emTitle,
                url: emUrl,
                description: emDescription,
                thumbnail: {
                    url: emThumbnail,
                },
                image: {
                    url: emImage,
                },
                fields: emFields,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: embedConfig.footer.text,
                },
            },
        };

        if (!image) {
            delete embedObject.embed.image;
        }

        return embedObject;
    },
};

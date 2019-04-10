
const google = require('google');
const miniEmbed = require('../../lib/miniEmbed.js');
const argsToString = require('../../lib/argsToString.js');

exports.run = (client, message, args) => {
    google.resultsPerPage = 5;
    const fieldArray = [];

    google(argsToString.convert(args, ' '), (error, result) => {
        if (error) console.error(error);

        for (let x = 0; x < result.links.length; x++) {
            const link = result.links[x];
            if (!link.title || !link.href || !link.link || !link.description) {
                // skip this link
            } else {
                fieldArray.push({ name: link.title, value: link.href });
            }

            if (x === result.links.length - 1) {
                message.channel.send(miniEmbed.createMiniEmbed(client, '0x00FF00', fieldArray));
            }
        }
    });
};

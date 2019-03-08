
const google = require("google");
const miniEmbed = require("../../lib/miniEmbed.js");
const argsToString = require("../../lib/argsToString.js");
const adminConfig = require("../configs/admin.json");

exports.run = (client, message, args) => {
    google.resultsPerPage = 5;
    let fieldArray = [];

    google(argsToString.convert(args), function (error, result) {
        if (error) console.error(error);

        for (let x = 0; x < result.links.length; x++) {
            let link = result.links[x];            
            if (!link.title || !link.href || !link.link|| !link.description) {

            } else {
                fieldArray.push({"name": link.title, "value": link.href});
            }

            if (x === result.links.length - 1) {
                message.channel.send(miniEmbed.createMiniEmbed(client, "0x00FF00", fieldArray));
            }
        }
    });  
}

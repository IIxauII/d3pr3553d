const miniEmbed = require("../../lib/miniEmbed.js");

exports.run = (client, message, args) => {
    let amount = parseInt(args[0], 10);

    if(!amount || amount < 1 || amount > 10) {
        return message.reply("Use a number between 1 and 10");
    }

    message.channel.fetchMessages({
        limit: amount + 1,
    }).then((messages) => {
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });

    let fieldArray = [{"name": "Purge information", "value": `Deleted ${amount} messages`}];
    let responseMessage;
    setTimeout(function() {
        message.channel.send(miniEmbed.createMiniEmbed(client, "", fieldArray));
        
        message.channel.fetchMessages({
            limit: 1,
        }).then((messages) => {
            responseMessage = messages;
        });
    }, 500);
    

    setTimeout(function() {        
        message.channel.bulkDelete(responseMessage).catch(error => console.log(error.stack));
    }, 3000);
}
const miniEmbed = require('../../lib/miniEmbed.js');

exports.run = (client, message, args) => {
    let targetGuild;
    if (args.length) {
        console.log("Fetching invites for arg server!");
        targetGuild = client.guilds.get(args[0]);
        targetGuild.fetchInvites()
            .then(invites => {
                sendInvites(invites);
            })
            .catch(error => {
                checkPerms(error);
            })
    } else {
        console.log("Fetching invites for message server!");
        targetGuild = message.guild;
        targetGuild.fetchInvites()
            .then(invites => {
                sendInvites(invites);
            })
            .catch(error => {
                checkPerms(error);
            })
    }

    function checkPerms(error) {
        if (error.message.includes("Permissions")) {
            message.author.send("You are missing Permissions to fetch invites from this server!: " + targetGuild.name);
        } else {
            console.error(error);
        }
    }

    function sendInvites(invites) {
        let invArray = invites.array();
        let messageArray = [{"name": "Invites for guild: ", "value": invArray[0].guild.name}];       
        let x = 1;
        let nbsp = "\n";
        console.log(messageArray);
        invArray.forEach(element => {
            let messageObject = {"name": "", "value": ""};
            messageObject.name = "Invite " + x;
            x++;
            messageObject.value = "url: " + element.url + nbsp +
                                    "expires: " + element.expiresAt + nbsp +
                                    "code: " + element.code + nbsp +
                                    "inviter: " + element.inviter.username + nbsp +
                                    "uses: " + element.uses;
            messageArray.push(messageObject);
        });        
        message.author.send(miniEmbed.createMiniEmbed(client, "0x000000", messageArray));
    }
}
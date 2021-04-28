const miniEmbed = require('../../lib/miniEmbed.js');

exports.run = (client, message, args) => {
    const sendToChannelString = 'here';
    let sendPrivate = true;
    let targetGuild;

    function checkPerms(error) {
        if (error.message.includes('Permissions')) {
            message.author.send(`You are missing Permissions to fetch invites from this server!: ${targetGuild.name}`);
        } else {
            console.error(error);
        }
    }

    function sendInvites(invites) {
        const invArray = invites.array();
        const messageArray = [{ name: 'Invites for guild: ', value: invArray[0].guild.name }];
        let x = 1;
        const nbsp = '\n';
        console.log(messageArray);
        invArray.forEach((element) => {
            const messageObject = { name: '', value: '' };
            messageObject.name = `Invite ${x}`;
            x += 1;
            messageObject.value = `url: ${element.url}${nbsp
                }expires: ${element.expiresAt}${nbsp
                }code: ${element.code}${nbsp
                }inviter: ${element.inviter.username}${nbsp
                }uses: ${element.uses}`;
            messageArray.push(messageObject);
        });

        if (sendPrivate) {
            message.author.send(miniEmbed.createMiniEmbed(client, '0x000000', messageArray));
        } else {
            message.channel.send(miniEmbed.createMiniEmbed(client, '0x000000', messageArray));
        }

    }

    function fetchInvitesForGuild(targetGuild) {
        targetGuild.fetchInvites()
            .then((invites) => {
                sendInvites(invites);
            })
            .catch((error) => {
                checkPerms(error);
            });
    }

    if (args.length) {
        if (args[0] && sendToChannelString.includes(args[0])) {
            sendPrivate = false;
            if (args[1]) {
                // case: !xgetinv here 1234
                fetchInvitesForGuild(client.guilds.resolve(args[1]))
            } else {
                // case !xgetinv here
                fetchInvitesForGuild(message.guild);
            }
        } else if (args[1] && sendToChannelString.includes(args[1])) {
            sendPrivate = false;
            // case !xgetinv 1234 here
            fetchInvitesForGuild(client.guilds.resolve(args[0]));
        } else {
            // case !xgetinv 1234
            fetchInvitesForGuild(client.guilds.resolve(args[0]));
        }

    } else {
        // case !xgetinv
        fetchInvitesForGuild(message.guild);
    }
};

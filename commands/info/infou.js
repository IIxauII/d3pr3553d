const miniEmbed = require("../../lib/miniEmbed");

exports.run = (client, message, args) => {
    const fieldArray = [];
    const status = {
        online: 'Online',
        idle: 'Idle',
        dnd: 'Do Not Disturb',
        offline: 'Offline/Invisible',
    };

    // user was mentioned with @
    let member = message.mentions.members.first() || message.mentions.users.first();

    if (!member) {
        // user is defined by user id
        if (args[0]) {
            message.guild.members.fetch(args[0])
            .then((res) => {
                // found user by id
                respondWithUserInfo(res);
            })
            .catch((err) => {
                console.error(err);
                respondWithErrorMessage();
            })
        } else {
            // no argument provided, restrieving data from message sender
            respondWithUserInfo(message.member);
        }
    } else {
        // found user by mention
        respondWithUserInfo(member);
    }

    function gatherUserData(member) {
        addEmbedField('User', member.user.tag);
        addEmbedField('ID', member.user.id);
        addEmbedField('Name', member.user.username);
        addEmbedField('Nickname', member.nickname);
        addEmbedField('Created at', member.user.createdAt);
        //https://discord.js.org/#/docs/main/v12/class/GuildMember?scrollTo=premiumSince
        //addEmbedField('Premium Since', member.premiumSince);
        addEmbedField('Status', status[member.user.presence.status]);
        addEmbedField('Presence', member.user.presence.game ? member.user.presence.game.name : 'not playing anything');
        addEmbedField('Highest Role', member.roles.highest.name);
        addEmbedField('Avatar', member.user.avatarURL());
        addEmbedField('is bannable by me?', member.bannable);
    }

    function addEmbedField(title, value) {
        fieldArray.push({name: title, value: value});
    }

    function respondWithUserInfo(member) {
        gatherUserData(member);
        message.channel.send(miniEmbed.createMiniEmbed(client, '0x00FF00', fieldArray));
    }

    function respondWithErrorMessage() {
        message.reply(`Could not find a user with provided arguments: ${args[0]}`);
    }
};

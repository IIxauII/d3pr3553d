const miniEmbed = require('../../lib/miniEmbed');
const color = require('../../configs/colors.json');

// eslint-disable-next-line no-unused-vars
exports.run = (client, message, args) => {
    //message.delete();
    const g = message.guild;
    const guildDataArray = [];

    function gatherGuildData() {
        createField('Name', g.name);
        if (g.description) {
            createField('Description', g.description);
        }
        createField('ID', g.id);
        createField('Member Count', g.memberCount);
        if (g.owner) {
            createField('Owner', `${g.owner.user.username} ${g.ownerID}`);
        } else {
            createField('Owner', g.ownerID);
        }
        createField('Region', g.region);
        createField('Created At', g.createdAt);
        //createField('MFA Level', g.mfaLevel);
        createField('Icon', g.iconURL());
        createField('Default Notifications', g.defaultMessageNotifications.toLowerCase());
        createField('Emoji Count', g.emojis.cache.array().length);
        createField('Roles Count', g.roles.cache.array().length);
        createField('Highest Role', g.roles.highest.name);
    }

    function createField(title, value) {
        guildDataArray.push(miniEmbed.createMiniEmbedFields(title, value));
    }

    gatherGuildData();
    message.channel.send(miniEmbed.createMiniEmbed(client, color.violet, guildDataArray));
};

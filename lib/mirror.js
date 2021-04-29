const microEmbed = require('./microEmbed');
const mirrorGuilds = require('../configs/mirror-guilds.json');

module.exports = {
    isMirrorTarget(message) {
        return mirrorGuilds[message.guild.id];
    },
    sendMessageToMirror(client, message) {
        let channelName = message.channel.name;
        let channelType = message.channel.type;
        let mirrorGuildId = mirrorGuilds[message.guild.id].mirror.id;
        let mirrorGuild = client.guilds.resolve(mirrorGuildId);        
        let mirrorChannel = mirrorGuild.channels.cache.find((ch) => {
            return ch.name === channelName && ch.type === channelType;
        });

        function sendAuthorAndTimestamp() {
            mirrorChannel.send(microEmbed.createMicroEmbedWithTimeStamp(client, `**${message.author.tag}:**`, '', message.createdAt));
        }

        if (mirrorChannel) {
            if (message.attachments) {
                sendAuthorAndTimestamp();
                // e.g. comment to a picture
                if (message.content) {
                    mirrorChannel.send(message.content);
                }
                // e.g. pictures
                message.attachments.array().forEach((a) => {
                    mirrorChannel.send(a);
                });
            } else {
                // should be only text? i hope
                sendAuthorAndTimestamp();
                mirrorChannel.send(message);
            }
        }
    }
}
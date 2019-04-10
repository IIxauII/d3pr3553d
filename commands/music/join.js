/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {
        if (!message.guild.voiceConnection) {
            if (!servers[message.guild.id]) {
                servers[message.guild.id] = { queue: [] };
            }
            message.member.voiceChannel.join()
                .then((connection) => {
                    // const server = servers[message.guild.id];
                    message.reply('So what now?!');
                });
        }
    } else {
        message.reply('Why u do dis?');
    }
};

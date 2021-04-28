/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
exports.run = (client, message, args) => {
    if (message.member.voice.channel) {
        if (!message.guild.voice || !message.guild.voice.connection) {
            if (!servers[message.guild.id]) {
                servers[message.guild.id] = { queue: [] };
            }
            message.member.voice.channel.join()
                .then((connection) => {
                    // const server = servers[message.guild.id];
                    message.reply('So what now?!');
                });
        }
    } else {
        message.reply('Why u do dis?');
    }
};

/* eslint-disable no-unused-vars */
exports.run = (client, message, args) => {
    if (message.guild.voice.connection) {
        message.guild.voice.connection.disconnect();
    } else {
        message.reply("Not even there man -.-'");
    }
};

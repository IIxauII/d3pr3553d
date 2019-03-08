exports.run = (client, message, args) => {
    if (servers[message.guild.id]) {
        let server = servers[message.guild.id]; 
        message.reply(server.queue);
    } else {
        message.reply("There is no queue for this server");
    }
}
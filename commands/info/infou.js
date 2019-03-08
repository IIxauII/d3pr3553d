const Discord = require("discord.js");

exports.run = (client, message, args) => { 
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;    
    const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
    };

    //message.delete();
    
    if (!member)
    return message.reply("Duh u forgot to mention a user :kek:")

    let bot;
    if (member.user.bot === true) {
        bot = "Yes";
    } else {
        bot = "No";
    }  
    
    message.channel.send("```Markdown\n#User Info:\n```\n```\nUser: " + member.user.tag +
    "\nID: " + member.user.id + "\nName: " + member.user.username + "\nCreated At: " + member.user.createdAt +
    "\nStatus: " + `${status[member.user.presence.status]}` +
    "\nPresence: " + `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}` +
    "\nRoles: " + `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" | ") || "@Everyone"}` +
    "\nAvatar: " + `${member.user.avatarURL}` +
    "\n```"
    );
}
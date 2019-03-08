exports.run = (client, message, args) => {
    message.delete();
    let g = message.guild;
    message.channel.send("```Markdown\n#Server Info:\n```\n```\nName: " + g.name + "\nID: " + g.id +
    "\nMember Count: " + g.memberCount + "\nOwner: " + g.owner.user.username + "\nOwner ID: " + g.ownerID +
    "\nRegion: " + g.region + "\nCreated At: " + g.createdAt + "\nIcon URL: " + g.iconURL + "\n```");  
    // of you get the error that the propert "user" is undefinded, change g.owner.user.username to g.owner
}
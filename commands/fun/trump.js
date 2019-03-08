exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (member) {
        personalizedMessage();
    } else {
        nonPersonalizedMessage();
    }

    async function personalizedMessage() {
        message.channel.send("mentioned:");
        console.log(member.user.tag);
    }

    async function nonPersonalizedMessage() {
        message.channel.send("nnon.personalized");
    }
}
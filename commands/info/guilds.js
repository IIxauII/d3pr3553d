exports.run = (client, message, args) => {
    let guildsArray = client.guilds.array();
    guildsArray.forEach(element => {
        console.log("name", element.name);
        console.log("id", element.id);
        console.log(element.emojis.array().length, "emojis");
        console.log(element.memberCount, "members");
    });
}
const miniEmbed = require("../../lib/miniEmbed.js");
const axios = require('axios');

exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let baseUrl = "https://api.whatdoestrumpthink.com/api/";
    let requestString = "";
    if (member) {
        personalizedMessage();
    } else {
        nonPersonalizedMessage();
    }

    async function personalizedMessage() {
        requestString = baseUrl + "v1/quotes/personalized?q=" + member.user.username;
        getTrumpRequest(requestString);
    }

    async function nonPersonalizedMessage() {
        requestString = baseUrl + "v1/quotes/random";
        getTrumpRequest(requestString);
    }

    async function getTrumpRequest(requestString) {
        axios.get(requestString)
        .then(response => {            
            let trumpArray = [{"name": "Trump says:", "value": response.data.message}];
            message.channel.send(miniEmbed.createMiniEmbed(client, "0xff9900", trumpArray));
        })
        .catch(error => {
            console.log(error);
        });
    }
}
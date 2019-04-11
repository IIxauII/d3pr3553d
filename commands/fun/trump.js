const axios = require('axios');
const miniEmbed = require('../../lib/miniEmbed.js');

exports.run = (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const baseUrl = 'https://api.whatdoestrumpthink.com/api/';
    let requestString = '';

    async function getTrumpRequest() {
        axios.get(requestString)
            .then((response) => {
                const trumpArray = [{ name: 'Trump says:', value: response.data.message }];
                message.channel.send(miniEmbed.createMiniEmbed(client, '0xff9900', trumpArray));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function personalizedMessage() {
        requestString = `${baseUrl}v1/quotes/personalized?q=${member.user.username}`;
        getTrumpRequest(requestString);
    }

    async function nonPersonalizedMessage() {
        requestString = `${baseUrl}v1/quotes/random`;
        getTrumpRequest(requestString);
    }

    if (member) {
        personalizedMessage();
    } else {
        nonPersonalizedMessage();
    }    
};

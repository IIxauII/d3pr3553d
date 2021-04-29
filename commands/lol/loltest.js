const microEmbed = require('../../lib/microEmbed');
const lolEmbed = require('../../lib/lolEmbed');
const lolapi = require('../../lib/lolapi');
const loldata = require('../../lib/loldata');

exports.run = (client, message, args) => {
    lolapi.test()
        .then((res) => {
            console.log(res);
        });
}
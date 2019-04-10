const axios = require('axios');
const adminConfig = require('../../configs/admin.json');
const argsToString = require('../../lib/argsToString.js');
const imgEmbed = require('../../lib/imgEmbed.js');

exports.run = (client, message, args) => {
    const apiKey = adminConfig.apis.danbooru;
    const apiKeyString = `&api_key=${apiKey}`;
    const baseUrl = 'https://danbooru.donmai.us/';
    const onePostString = 'posts.json?limit=1';
    const randomString = '&random=true';
    const ratingString = 'rating:';
    let ratingLevel = 's';
    let tagString = '&tags=';
    let requestString;

    function setFooterText(rating) {
        if (rating === 's') {
            return 'safe';
        } if (rating === 'q') {
            return 'questionable';
        } if (rating === 'e') {
            return 'explicit';
        }
        return 'unknown';
    }

    function sendMessage(data) {
        const footerText = `rating: ${setFooterText(data.data[0].rating)}`;
        message.channel.send(imgEmbed.createImgEmbed(client, '0xf442f4', data.data[0].file_url, footerText));
    }

    function checkErrorMessage(error) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('2 tags')) {
            message.channel.send(errorMessage);
        } else {
            console.error(error);
        }
    }

    function checkRatingLevel(string) {
        if (string === 'e') {
            ratingLevel = 'e';
            return true;
        } if (string === 'q') {
            ratingLevel = 'q';
            return true;
        } if (string === 's') {
            ratingLevel = 's';
            return true;
        }
        return false;
    }

    function performRequest(string) {
        axios.get(string)
            .then((response) => {
                sendMessage(response);
            })
            .catch((error) => {
                checkErrorMessage(error);
            });
    }

    function getRandomDanbooru() {
        requestString = baseUrl
            + onePostString
            + tagString
            + ratingString
            + ratingLevel
            + randomString
            + apiKeyString;
        performRequest(requestString);
    }

    function getSpecificDanbooru() {
        requestString = `${baseUrl + onePostString + tagString}+${ratingString}${ratingLevel}${randomString}${apiKeyString}`;
        performRequest(requestString);
    }

    if (args.length) {
        if (args.length === 1) {
            checkRatingLevel(args[0]);
            getRandomDanbooru();
        } else if (args.length > 1) {
            if (checkRatingLevel(args[0])) {
                args.shift();
                tagString = `&tags=${argsToString.convert(args, '+')}`;
            } else {
                tagString = `&tags=${argsToString.convert(args, '+')}`;
            }
            getSpecificDanbooru(tagString);
        } else if (checkRatingLevel(args[0])) {
            getRandomDanbooru();
        } else {
            tagString = `&tags=${args[0]}`;
            getSpecificDanbooru(tagString);
        }
    } else {
        getRandomDanbooru();
    }
};

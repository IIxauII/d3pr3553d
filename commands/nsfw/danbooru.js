const axios = require('axios');
const adminConfig = require('../../configs/admin.json');
const argsToString = require('../../lib/argsToString.js');
const imgEmbed = require('../../lib/imgEmbed.js');

exports.run = (client, message, args) =>  {
    let apiKey = adminConfig.apis.danbooru;
    let apiKeyString = "&api_key=" + apiKey;
    let baseUrl = "https://danbooru.donmai.us/";
    let onePostString = "posts.json?limit=1";
    let randomString = "&random=true";
    let ratingString = "rating:";
    let ratingLevel = "s";
    let tagString = "&tags="
    let requestString;        
    if (args.length) {
        if (args.length === 1) {
            checkRatingLevel(args[0]);
            getRandomDanbooru();
        } else if (args.length > 1) {
            if (checkRatingLevel(args[0])) {
                args.shift();
                tagString = "&tags=" + argsToString.convert(args, "+");
            } else {
                tagString = "&tags=" + argsToString.convert(args, "+");
            }            
            getSpecificDanbooru(tagString);
        } else {
            if (checkRatingLevel(args[0])) {
                getRandomDanbooru();
            } else {
                tagString = "&tags=" + args[0];
                getSpecificDanbooru(tagString);
            }            
        }
    } else {
        getRandomDanbooru();
    }

    function getRandomDanbooru() {
        requestString = baseUrl + onePostString + tagString + ratingString + ratingLevel + randomString + apiKeyString;
        performRequest(requestString);   
    }

    function getSpecificDanbooru(tags) {
        requestString = baseUrl + onePostString + tagString + "+" + ratingString + ratingLevel + randomString + apiKeyString;
        performRequest(requestString);
    }

    function performRequest(string) {
        axios.get(string)
        .then(function (response) {
            sendMessage(response);
        })
        .catch(function (error) {
            checkErrorMessage(error);
        });
    }

    function sendMessage(data) {
        let footerText = "rating: " + setFooterText(data.data[0].rating);
        message.channel.send(imgEmbed.createImgEmbed(client, '0xf442f4', data.data[0].file_url, footerText));
    }

    function setFooterText(rating) {
        if (rating === "s") {
            return "safe";
        } else if (rating === "q") {
            return "questionable";
        } else if (rating === "e") {
            return "explicit";
        } else {
            return "unknown";
        } 
    }

    function checkErrorMessage(error) {
        let errorMessage = error.response.data.message;
        if (errorMessage.includes("2 tags")) {
            message.channel.send(errorMessage);
        } else {
            console.error(error);
        }
    }

    function checkRatingLevel(string) {
        if (string === "e") {
            ratingLevel = "e";            
            return true;
        } else if (string === "q") {
            ratingLevel = "q";
            return true;
        } else if (string === "s") {
            ratingLevel = "s";
            return true;
        } else {
            return false;
        }
    }   
}
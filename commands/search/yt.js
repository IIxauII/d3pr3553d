const embed = require("../../lib/embed.js");
const adminConfig = require("../../configs/admin.json");
const ytConfig = require("../../configs/youtube.json");
const argsToString = require("../../lib/argsToString.js");
let apiKey = adminConfig.apis.youtube;
const { YouTube } = require('better-youtube-api');
const youtube = new YouTube(apiKey);
let maxResults = ytConfig.config.maxResults;

exports.run = (client, message, args) => {
    let string = argsToString.convert(args);

    async function searchVideos(string) {
        await youtube.searchVideos(string, maxResults)
        .then((results) => {
            let ytArray = [];
            for (let x = 0; x < results.length; x++) {
                let video = results[x];            
                ytArray.push({"name": video.title, "value": video.shortUrl});
            }
            message.channel.send(embed.createEmbed(client, ytConfig.embed.color, ytConfig.embed.title, ytConfig.embed.url, ytConfig.embed.description, ytConfig.embed.thumbnail, ytArray, ytConfig.embed.image));
        })
        .catch((err) => {
            console.error(err);
        })
    }

    searchVideos(string);
}
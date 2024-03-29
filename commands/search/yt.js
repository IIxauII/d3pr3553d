const { YouTube } = require('better-youtube-api');

const embed = require('../../lib/embed.js');
const adminConfig = require('../../configs/admin.json');
const ytConfig = require('../../configs/youtube.json');
const argsToString = require('../../lib/argsToString.js');

const apiKey = adminConfig.apis.youtube;
const youtube = new YouTube(apiKey);
const { maxResults } = ytConfig.config;

exports.run = (client, message, args) => {
    const string = argsToString.convert(args, ' ');

    async function searchVideos() {
        await youtube.searchVideos(string, maxResults)
            .then((results) => {
                const ytArray = [];
                for (let x = 0; x < results.length; x++) {
                    const video = results[x];
                    ytArray.push({ name: video.title, value: video.shortUrl });
                }
                message.channel.send(
                    embed.createEmbed(
                        client,
                        ytConfig.embed.color,
                        ytConfig.embed.title,
                        ytConfig.embed.url,
                        ytConfig.embed.description,
                        ytConfig.embed.thumbnail,
                        ytArray,
                        ytConfig.embed.image,
                    ),
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }

    searchVideos(string);
};

const embed = require("../../lib/embed.js");
const adminConfig = require("../../configs/admin.json");
const ytConfig = require("../../configs/youtube.json");
const argsToString = require("../../lib/argsToString.js");
let apiYoutube = adminConfig.apis.youtube;
const ytSearch = require("youtube-search");
const config = {
    maxResults: ytConfig.config.maxResults,
    key: apiYoutube
};

exports.run = (client, message, args) => {
    let string = argsToString.convert(args);
    ytSearch(string, config, function(err, results) {
        if(err) return console.log(err);
        let ytArray = [];
        for (let x = 0; x < results.length; x++) {
            let video = results[x];            
            ytArray.push({"name": video.title, "value": video.link});
        }  
        message.channel.send(embed.createEmbed(client, ytConfig.embed.color, ytConfig.embed.title, ytConfig.embed.url, ytConfig.embed.description, ytConfig.embed.thumbnail, ytArray, ytConfig.embed.image));        
    });
}
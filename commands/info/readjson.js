const codeEmbed = require("../../lib/codeEmbed.js");
const fs = require('fs');

exports.run = (client, message, args) => {
    let fileName = "";
    let found = false;
    fs.readdir("./configs/", (err, files) => {
        if (err) return console.error(err);
        if (!args[0]) {
            message.reply(files);
            found = true;
            return;
        }
        files.forEach(file => {            
            fileName = file.split(".")[0];
            if (args[0] === fileName) {
                found = true;
                let jsonObj = require(`../../configs/${args[0]}.json`); //meeds to be made bulletproof
                let jsonString = JSON.stringify(jsonObj, null, 4);
                message.channel.send(codeEmbed.makeString(jsonString, "json"));   
            }        
        });        
    });

    setTimeout (function() {
        if (!found) {
            message.channel.send("file: `" + args[0] + "` not found");
        }
    }, 500);

    /* for (let key in jsonObj) {
        //console.log("key: " + key+ ", value: " + jsonObj[key]);
        //console.log(typeof jsonObj[key]);
        if (Array.isArray(jsonObj[key])) {
            //console.log(jsonObj[key] + " is array");
            for (let x = 0; x < jsonObj[key].length; x++) {
                //console.log(jsonObj[key][x]);
            }
        } else if (typeof jsonObj[key] === "object" && jsonObj[key] != null) {
            for (let innerKey in jsonObj[key]) {
                //console.log("inner value: " + jsonObj[key][innerKey]);
            }
        }
    } */
} 
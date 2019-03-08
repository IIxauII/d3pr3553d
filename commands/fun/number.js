const miniEmbed = require("../../lib/miniEmbed.js");
const axios = require('axios');

exports.run = (client, message, args) => {
    let baseUrl = "http://numbersapi.com/";
    let type, number, requestString;
    let amountArgs = args.length;

    if (args[0] && args[0] === "man") {
        manual();
    }
    
    if (amountArgs === 3) {
        type = "date";
        number = args[1] + "/" + args[2];
    } else if (amountArgs === 2) {
        type = args[0];
        number = args[1];
    } else if (amountArgs === 1) {
        type = args[0];
        number = "random";
    } else if (!amountArgs && amountArgs != 0) {
        type = "trivia";
        number = "random";
    } else {
        manual();
    }

    if (type != "trivia" && type != "math" && type != "date" && type != "year") {
        manual();
    }

    requestString = baseUrl + number + "/" + type;
    getRandomNumberFact(requestString);

    function manual() {        
        let numberArray = [{"name": "1. arg", "value": "trivia, math, date, year"},
                        {"name": "2. arg", "value": "number"},
                        {"name": "3. arg (2. arg has to be 1 - 12)", "value": "number 0 - 32"},
                        {"name": "Example 1", "value": "!xnumber"}, {"name": "Example 2", "value": "!xnumber trivia 42"},
                        {"name": "Example 3", "value": "!xnumber date 9 11"}];
        message.channel.send(miniEmbed.createMiniEmbed(client, "0x327baa", numberArray));
        return;
    }

    async function getRandomNumberFact(requestString) {
        axios.get(requestString)
            .then(response => {            
                let numberArray = [{"name": number + " - " + type, "value": response.data}];
                message.channel.send(miniEmbed.createMiniEmbed(client, "0x327baa", numberArray));
            })
            .catch(error => {
                console.error(error);
            });
    }    
}
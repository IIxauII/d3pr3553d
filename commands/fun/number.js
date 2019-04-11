const axios = require('axios');
const miniEmbed = require('../../lib/miniEmbed.js');

exports.run = (client, message, args) => {
    const baseUrl = 'http://numbersapi.com/';
    let type;
    let number;
    let requestString;
    const amountArgs = args.length;

    function manual() {
        const numberArray = [{ name: '1. arg', value: 'trivia, math, date, year' },
            { name: '2. arg', value: 'number' },
            { name: '3. arg (2. arg has to be 1 - 12)', value: 'number 0 - 32' },
            { name: 'Example 1', value: '!xnumber' }, { name: 'Example 2', value: '!xnumber trivia 42' },
            { name: 'Example 3', value: '!xnumber date 9 11' }];
        message.channel.send(miniEmbed.createMiniEmbed(client, '0x327baa', numberArray));
    }

    async function getRandomNumberFact() {
        axios.get(requestString)
            .then((response) => {
                const numberArray = [{ name: `${number} - ${type}`, value: response.data }];
                message.channel.send(miniEmbed.createMiniEmbed(client, '0x327baa', numberArray));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (args[0] && args[0] === 'man') {
        return manual();
    }

    if (amountArgs === 3) {
        type = 'date';
        number = `${args[1]}/${args[2]}`;
    } else if (amountArgs === 2) {
        // eslint-disable-next-line prefer-destructuring
        type = args[0];
        // eslint-disable-next-line prefer-destructuring
        number = args[1];
    } else if (amountArgs === 1) {
        // eslint-disable-next-line prefer-destructuring
        type = args[0];
        number = 'random';
    } else if (!amountArgs && amountArgs !== 0) {
        type = 'trivia';
        number = 'random';
    } else {
        return manual();
    }

    if (type !== 'trivia' && type !== 'math' && type !== 'date' && type !== 'year') {
        return manual();
    }

    // eslint-disable-next-line prefer-const
    requestString = `${baseUrl + number}/${type}`;
    getRandomNumberFact(requestString);
};

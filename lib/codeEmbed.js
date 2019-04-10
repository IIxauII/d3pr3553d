const verifyString = require('../lib/verifyString.js');

const start = '```';
let codeType = 'mkd';
const lineBreak = '\n';
const end = '```';

module.exports = {
    makeString(string, type) {
        if (verifyString.hasChars(type)) {
            codeType = type;
        }

        if (verifyString.hasChars(string)) {
            return (start + codeType + lineBreak + string + end);
        }
        return (`${start + codeType + lineBreak}No information in this file${end}`);
    },
};

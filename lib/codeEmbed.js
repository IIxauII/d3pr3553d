const verifyString = require("../lib/verifyString.js");

let start = "```";
let codeType = "mkd";
let lineBreak = "\n";
let end = "```";

module.exports = {
    makeString: function(string, type) {
        if (verifyString.hasChars(type)) {
            codeType = type;
        }

        if (verifyString.hasChars(string)) {
            return (start + codeType + lineBreak + string + end);
        } else {
            return (start + codeType + lineBreak + "No information in this file" + end);
        }
    }
}
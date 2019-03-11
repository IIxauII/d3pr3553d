const leet = require("1337");
const argsToString = require("../../lib/argsToString.js");

exports.run = (client, message, args) => {
    message.delete();
    let toLeet = argsToString.convert(args, " ");
    message.channel.send(leet(toLeet));
}
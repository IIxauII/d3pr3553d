module.exports = {
    convert: function(args, seperator) {
        let string = "";
        for (let x = 0; x < args.length; x++) {
            string += args[x] + seperator;
        }
        string = string.slice(0, -seperator.length);
        return string;
    }
}
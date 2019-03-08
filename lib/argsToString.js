module.exports = {
    convert: function(args) {
        let string = "";
        for (let x = 0; x < args.length; x++) {
            string += args[x] + " ";
        }
        string = string.slice(0, -1);
        return string;
    }
}
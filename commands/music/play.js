const ytdl = require("ytdl-core");

exports.run = (client, message, args) => {
    console.log(message.guild.voiceConnection);
    let connection = message.guild.voiceConnection;
    let server = servers[message.guild.id];    
    if (server.queue[0]) {      
        play(connection, message);
    } else {
        message.reply("Please add something to the qeueue");
    }

    function play(connection, message) {
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        console.log(server.queue);
        server.dispatcher.on("end", function() {
            if (server.queue[0]) {
                play(connection, message);
            } else {
                connection.disconnect();
            }
        });
    }
}
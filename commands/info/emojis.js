const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const download = require('download');

let output = fs.createWriteStream('media/compressed/example.zip');
let archive = archiver('zip', {
    zlib: {level: 9}
});
output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});
archive.on('error', function(err){
    throw err;
});
archive.pipe(output);

fs.readdir("media/downloads/", (err, files) => {
    if (err) throw err;
    for (const file of files) {
        fs.unlink(path.join("media/downloads", file), err => {
            if (err) throw err;
        });
    }
});

exports.run = (client, message, args) => {
    let emojisArray;
    if (!args) {       
        emojisArray = message.guild.emojis.array();
    } else {
        emojisArray = client.guilds.get(args[0]).emojis.array();
    }

    function imageType(element) {
        if (element.animated) {
            return ".gif";
        } else {
            return ".png";
        }
    }

    if (emojisArray) {
        emojisArray.forEach(element => {
            download(element.url)
                .then(data => {
                    let fileName = element.name + imageType(element);
                    let filePath = 'media/downloads/' + fileName;
                    fs.writeFile(filePath, data, (err) => {
                        if (err) throw err;
                        archive.file(filePath, {name: fileName});
                    });
                })
                .catch(error => {
                    console.error(error);
                })
        });        
    } else {
        message.channel.send("No emojis or wrong guild!");
    }
    setTimeout(function(){
        archive.finalize();
        message.channel.send("Emojis:");
        message.channel.sendFile('media/compressed/example.zip', 'example.zip');
    }, 2000);    
}
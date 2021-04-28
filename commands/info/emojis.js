const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const download = require('download');

exports.run = (client, message, args) => {
    const output = fs.createWriteStream('media/compressed/emojis.zip');
    let archive = archiver('zip', {
        zlib: { level: 9 },
    });
    output.on('close', () => {
        console.log(`${archive.pointer()} total bytes`);
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    archive.on('error', function(err){
        throw err;
    });
    // archive.pipe(output);

    fs.readdir('media/downloads/', (err, files) => {
        if (err) throw err;
        // eslint-disable-next-line no-restricted-syntax
        for (const file of files) {
            // eslint-disable-next-line no-shadow
            fs.unlink(path.join('media/downloads', file), (err) => {
                if (err) throw err;
            });
        }
    });

    setTimeout(() => {
        let guildName = 'undefined';
        let emojisArray;
        if (!args || args.length === 0) {
            emojisArray = message.guild.emojis.array();
            guildName = message.guild.name;
        } else {
            emojisArray = client.guilds.get(args[0]).emojis.array();
            guildName = client.guilds.get(args[0]).name;
        }

        function imageType(element) {
            if (element.animated) {
                return '.gif';
            }
            return '.png';
        }

        if (emojisArray) {
            emojisArray.forEach((element) => {
                download(element.url)
                    .then((data) => {
                        const fileName = element.name + imageType(element);
                        const filePath = `media/downloads/${fileName}`;
                        fs.writeFile(filePath, data, (err) => {
                            if (err) throw err;
                            archive.file(filePath, { name: fileName });
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        } else {
            message.channel.send('No emojis or wrong guild!');
        }
        setTimeout(() => {
            archive.finalize();
            message.channel.send(`Emojis from ${guildName}:`);
            message.channel.sendFile('media/compressed/emojis.zip', 'emojis.zip');
            archive.end();
        }, 4000);
    }, 2000);
};

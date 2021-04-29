const fs = require('fs');
const mirrorGuilds = require('../../configs/mirror-guilds.json');

exports.run = (client, message, args) => {
    const currentGuildId = message.guild.id;
    const currentGuildName = message.guild.name;

    function mgSaveMirrorGuildToJson(newMirrorGuild) {
        mirrorGuilds[currentGuildId] = {
            mirror: {
                id: newMirrorGuild.id,
                name: newMirrorGuild.name,
            },
        };
        const mirrorGuildString = JSON.stringify(mirrorGuilds, null, 4);
        fs.writeFileSync('./configs/mirror-guilds.json', mirrorGuildString);
    }

    // check if bot is in fewer than 10 guilds, otherwise not possible to create a new guild with bot user
    function mgCheckIfCanCreateNewGuild() {
        return client.guilds.cache.array().length < 10;
    }

    function mgCannotCreateMirrorGuildMessage() {
        console.log("cannot create mirror guild!");
    }

    function mgCreateMirrorGuild(mirrorGuildId) {
        if (mirrorGuildId) {

        } else {
            client.guilds.create(`${client.guilds.resolve(currentGuildId).name}-mirror`, {
                channels: mgFetchChannelsOfGuild(),
            }).then((guild) => {
                mgSaveMirrorGuildToJson(guild);
                guild.channels.cache.first().createInvite()
                    .then((invite) => {
                        console.log(`Created an invite with the code: ${invite.code}`);
                        message.channel.send(`https://discord.gg/${invite.code}`);
                    })
                    .catch((err) => {
                        console.err(err);
                    })
            }).catch((err) => {
                console.error(err);
                console.log('create guild error');
            })
        }
    }

    function mgFetchChannelsOfGuild() {
        let currentGuildChannels = message.guild.channels.cache.array();
        let newPartialChannelsData = [];
        currentGuildChannels.forEach((channel) => {
            let partialData = {
                type: channel.type,
                name: channel.name,
                topic: channel.topic,
                id: channel.id,
                parentID: channel.parentID,
            };
            newPartialChannelsData.push(partialData);
        });
        // sort channels with category on top (to prevent discord api error);
        // types:
        //          category
        //          text
        //          voice
        newPartialChannelsData.sort((left, right) => {
            let leftHas = left.hasOwnProperty("type");
            let rightHas = right.hasOwnProperty("type");
            if (leftHas && rightHas) {
                return left.type.localeCompare(right.type);
            }
            return leftHas ? -1 : rightHas ? 1 : 0;
        });
        //console.log(newPartialChannelsData);
        return newPartialChannelsData;
    }

    if (mirrorGuilds[currentGuildId]) {
        console.log('Already mirroring this guild!');
        return;
    } else {
        if (!args || !args.length) {
            if (mgCheckIfCanCreateNewGuild()) {
                // try to create channels in provided mirror guild
                mgCreateMirrorGuild(args[0]);
            } else {
                mgCannotCreateMirrorGuildMessage();
            }
        } else if (mgCheckIfCanCreateNewGuild) {
            // no args provided will try to create a mirror guild
            mgCreateMirrorGuild();
        } else {
            mgCannotCreateMirrorGuildMessage();
        }
    }
}
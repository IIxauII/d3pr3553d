const fs = require('fs');
const adminConfig = require('../../configs/admin.json');
const mirrorGuilds = require('../../configs/mirror-guilds.json');
const isAdmin = require("../../lib/isAdmin")

exports.run = (client, message, args) => {
    function deleteIfBeingMirroredFromMirrorList() {
        for (mirroringID in mirrorGuilds) {
            if (mirrorGuilds[mirroringID].mirror.id === args[0]) {
                delete mirrorGuilds[mirroringID];
            }
        }
        const mirrorGuildString = JSON.stringify(mirrorGuilds, null, 4);
        fs.writeFileSync('./configs/mirror-guilds.json', mirrorGuildString);
    }

    if (isAdmin.isUserAdmin(message.member.id)) {
        // compares name of provided guild with adminConfig.safe entries
        // CURRENTLY ONLY COMAPRES NAMES, THIS IS NOT FOOLPROOF (comparing ID is a lot better)
        // -> needs to be improved!
        if (args && args[0] && !adminConfig.safe[client.guilds.resolve(args[0]).name]) {
            let toDeleteGuild = client.guilds.resolve(args[0]);
            toDeleteGuild.delete()
                .then((g) => {
                    console.log(`Deleted the guild ${g}`);
                    deleteIfBeingMirroredFromMirrorList();
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            console.log('pls provide a guild id for the guild you want to delete');
        }
    } else {
        isAdmin.reportUnauthorized(message.member, 'deleteguild');
    }
}
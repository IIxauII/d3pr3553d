const lolapi = require('../../lib/lolapi');
const mergeImg = require('../../lib/mergeImages');
const lolData = require('../../lib/loldata');
const imgEmbed = require('../../lib/imgEmbed');

exports.run = (client, message, args) => {
    lolapi.fetchRotation()
        .then((res) => {
            // global
            const basePath = './media/lol/custom/';
            
            // default rotation:
            const freeChampionIds = res.freeChampionIds;
            const freeRotationImgName = 'freeRotation.png';
            const freeRotationSavePath = `${basePath}${freeRotationImgName}`;
            const freeRotationInfoMessage = 'LOL EUW free champ rotation';

            // new players rotation:
            const freeChampionIdsForNewPlayers = res.freeChampionIdsForNewPlayers;
            const maxNewPlayerLevel = res.maxNewPlayerLevel;
            const freeRotationNewPlayersImgName = 'freeRotationNewPlayers.png';
            const freeRotationNewPlayersSavePath = `${basePath}${freeRotationNewPlayersImgName}`;
            const freeRotationNewPlayersInfoMessage = `LOL EUW free champ rotation for new players (max lvl: ${maxNewPlayerLevel})`;

            function fetchDataStitchAndSendMessage(championIds, mergeImgPath, mergeImageName, infoText) {
                const gatheredImgPaths = [];

                championIds.forEach((id) => {
                    const foundImgPath = lolData.fetchImagesByKey(id);
                    if (foundImgPath) {
                        gatheredImgPaths.push(foundImgPath);
                    } else {
                        console.log(`could not find a champion for id: ${id}`);
                    }
                });                
                mergeImg.mergeImages(gatheredImgPaths, mergeImgPath).then(() => {
                    //img merging seems to resolve promise to early, not sure if my mistake or package mistake
                    //therefor utilizing a timeout to not run into an error
                    setTimeout(() => {
                        message.channel.send(imgEmbed.createLocalImgEmbed(client, mergeImgPath, mergeImageName, infoText));
                    }, 500);
                });
            }

            fetchDataStitchAndSendMessage(freeChampionIds, freeRotationSavePath, freeRotationImgName, freeRotationInfoMessage);
            fetchDataStitchAndSendMessage(freeChampionIdsForNewPlayers, freeRotationNewPlayersSavePath, freeRotationNewPlayersImgName, freeRotationNewPlayersInfoMessage);
        });
}
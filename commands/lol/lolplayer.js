const microEmbed = require('../../lib/microEmbed');
const lolEmbed = require('../../lib/lolEmbed');
const lolapi = require('../../lib/lolapi');
const loldata = require('../../lib/loldata');


exports.run = (client, message, args) => {
    if (!args || !args.length) {
        message.channel.send(microEmbed.createMicroEmbed(client, 'Please provide a EUW summoner name!'));
        return;
    }
    const summonerName = args.join(' ');
    let summonerId = null;
    let imgData = null;
    let summonerFields = [];
    let footerText = null;
    // pls dont rate limit me :(
    lolapi.fetchSummonerByName(summonerName)
        .then((res) => {
            summonerId = res.id;
            imgData = loldata.fetchProfilIconById(res.profileIconId);
            summonerFields = [
                {name: 'Summoner Name', value: res.name},
                {name: 'Level', value: res.summonerLevel},
            ];
            footerText = `revisionDate: ${res.revisionDate}`;
            lolapi.fetchChampionScore(summonerId, true)
                .then((res) => {
                    summonerFields.push({name: 'Champion Score', value: res.score});
                    lolapi.fetchLeagueRankedDataForSummoner(summonerId, true)
                        .then((res) => {
                            res.forEach((e) => {
                                summonerFields.push({name: e.queueType, value: `${e.tier} ${e.rank}\nLeague Points ${e.leaguePoints}\nwins/losses ${e.wins}/${e.losses}`});
                            });
                            message.channel.send(lolEmbed.createLolSummonerEmbed(client, imgData.path, imgData.name, summonerFields, footerText));                
                        });
                });
        });
}

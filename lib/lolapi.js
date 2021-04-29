const { resolveMx } = require('dns');
const { resolve } = require('path');
const { LolApi, Constants } = require('twisted');
const adminConfig = require('../configs/admin.json');
const api = new LolApi({
    // If api response is 429 (rate limits) try reattempt after needed time (default true)
    rateLimitRetry: true,
    // Number of time to retry after rate limit response (default 1)
    rateLimitRetryAttempts: 1,
    // Concurrency per method (example: summoner api, match api, etc)
    concurrency: undefined,
    // Riot games api key
    key: adminConfig.apis.riot,
    // Debug methods
    debug: {
        // Log methods execution time (default false)
        logTime: false,
        // Log urls (default false)
        logUrls: false,
        // Log when is waiting for rate limits (default false)
        logRatelimit: false,
    },
});
module.exports = {
    async test() {
        let id = await this.fetchSummonerByName('II xau II', 'id')
            .then((res) => {
                return res;
            })
            .finally(() => {
                resolve;
            });
        let test = await api.Status.get(Constants.Regions.EU_WEST)
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                resolve;
            });
        return test;
    },
    async fetchRotation() {
        let rotation = await api.Champion.rotation(Constants.Regions.EU_WEST)
            .then((res) => {
                return res.response;
            })
            .catch((err) => {
                console.error(err);
                return;
            })
            .finally(() => {
                resolve;
            });

        return rotation;
    },
    async fetchSummonerByName(summonerName, onlyReturnXID) {
        let summoner = await api.Summoner.getByName(summonerName, Constants.Regions.EU_WEST)
            .then((res) => {
                //console.log(res.response);
                if (onlyReturnXID) {
                    switch (onlyReturnXID) {
                        case 'id':
                            return res.response.id;
                        case 'accountId':
                            return res.response.accountId;
                        case 'puuid':
                            return res.response.puuid;
                        default:
                            console.log('Not valid onlyReturnXID, try: id, accountId, puuid');
                            break;
                    }
                    return res.response.puuid;
                } else {
                    return res.response;
                }
            })
            .catch((err) => {
                console.error(err);
                return;
            })
            .finally(() => {
                resolve;
            });
        return summoner;
    },
    async fetchChampionScore(summonerNameOrId, isId) {
        let id = null;
        if (isId) {
            id = summonerNameOrId;
        } else {
            id = await this.fetchSummonerByName(summonerName, 'id')
                .then((res) => {
                    return res;
                })
                .finally(() => {
                    resolve;
                });
        }
        let championScore = await api.Champion.championsScore(id, Constants.Regions.EU_WEST)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                resolve;
            });
        return championScore;
    },
    async fetchMasteryBySummoner(summonerNameOrId, isId) {
        let id = null;
        if (isId) {
            id = summonerNameOrId;
        } else {
            id = await this.fetchSummonerByName(summonerName, 'id')
                .then((res) => {
                    return res;
                })
                .finally(() => {
                    resolve;
                });
        }
        let summonerMastery = await api.Champion.masteryBySummoner(id, Constants.Regions.EU_WEST)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                resolve;
            });
        return summonerMastery;
    },
    async fetchLeagueRankedDataForSummoner(summonerNameOrId, isId) {
        let id = null;
        if (isId) {
            id = summonerNameOrId;
        } else {
            id = await this.fetchSummonerByName(summonerName, 'id')
                .then((res) => {
                    return res;
                })
                .finally(() => {
                    resolve;
                });
        }
        let leagueRank = await api.League.bySummoner(id, Constants.Regions.EU_WEST)
            .then((res) => {
                return res.response;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                resolve;
            });
        return leagueRank;
    }
}
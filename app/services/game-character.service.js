export class GameCharacterService {
    constructor(axios) {
        this.axios = axios;
    }

    /**
     * Make the challenge for verifying the lol summoner
     * @param summonerName
     * @return {{token: <String>, question: <Number>, expiresAt: <Date>}}
     */
    makeChallengeLOLSummoner(summonerName) {
        return this.axios({
            url: '/game-characters/lol/request-verification/' + summonerName,
            method: 'POST'
        }).then(response => response.data, error => Promise.reject(error));
    }

    /**
     * verify the challenge
     * @param challengeToken is created by making challenge above step
     * @param verifyLater default false
     */
    verifyChallengeLOLSummoner(challengeToken, verifyLater = false) {
        return this.axios({
            url: '/game-characters/lol/verify-and-add/' + challengeToken + (verifyLater ? '?verifyLater=true' : ''),
            method: 'POST'
        }).then(response => response.data, error => Promise.reject(error));
    }

    /**
     * remove the lol summoner
     * @param lolSummonerId
     * @return {*}
     */
    removeLOLSummoner(lolSummonerId) {
        return this.axios({
            url: '/game-characters/lol/remove/' + lolSummonerId,
            method: 'POST'
        }).then(response => response.data, error => Promise.reject(error));
    }

    /**
     * invalidate the lol summoner info (ranks, icon, ...)
     * @return {*}
     */
    invalidateLOLSummoner() {
        return this.axios({
            url: '/game-characters/lol/invalidate',
            method: 'POST'
        }).then(response => response.data, error => Promise.reject(error));
    }
}
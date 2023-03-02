export default class TournamentService {
    constructor(axios) {
        this.axios = axios;
    }

    async createTournament(tournamentInfo){
        return this.axios({
            method: 'POST',
            url: '/tournaments',
            data: tournamentInfo
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }
    async registerTournament(tournamentId, teamId, description){
        return this.axios({
            method: 'POST',
            url: 'tournaments/'+tournamentId+'/participations/register',
            data: {
                teamId:teamId,
                description:description
            }
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }
    async listTournamentParticipations(tournamentId){
        return this.axios({
            method: 'GET',
            url: '/tournaments'+tournamentId+'/participations'
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }
    async detailTournament(tournamentId){
        return this.axios({
            method: 'GET',
            url: '/tournaments/'+tournamentId
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }
    async confirmTournamentParticipation(tournamentId,participationId,confirmationResult){
        return this.axios({
            method: 'POST',
            url: '/tournaments/'+tournamentId+'/participations/'+participationId+'/confirm/'+confirmationResult
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }
}
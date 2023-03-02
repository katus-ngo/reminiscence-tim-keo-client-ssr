export default class TeamService {
    constructor(axios) {
        this.axios = axios;
    }

    async listTeams() {
        return this.axios({
            method: 'GET',
            url: '/teams?limit=100'
        }).then(response => response.data, error => Promise.reject(error));
    }

    async creatTeam(slug, shortName, longName, game, description, slogan, contactInfo) {
        return this.axios({
            method: 'POST',
            url: '/teams',
            data: {
                slug: slug,
                shortName: shortName,
                longName: longName,
                game: game,
                description: description,
                slogan: slogan,
                contactInfo: contactInfo
            }
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }

    async getTeamProfile(slug) {
        return this.axios({
            method: 'GET',
            url: "/teams/" + slug
        }).then(response => {
            return response.data;
        }, error => Promise.reject(error));
    }

    async memberInvitation(teamId, receiverId) {
        return this.axios({
            method: 'POST',
            url: '/team-participation-requests',
            data: {
                requestType:'MEMBER_INVITATION',
                teamId,
                receiverId
            }
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }

    async teamParticipationState(teamId, token) {
        return this.axios({
            method: 'GET',
            url: '/team-participation-state/'+teamId,
            headers: {
                Authorization: token
            }
        }).then(response => response.data, error => Promise.reject(error));
    }

    async requestToJoinTeam(teamId) {
        return this.axios({
            method: 'POST',
            url: '/team-participation-requests',
            data: {
                requestType:'MEMBER_REQUEST',
                teamId
            }
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }

    async updateTeam(updateTeamRequest) {

        return this.axios({
            method: 'PUT',
            url: '/teams/' + updateTeamRequest.id,
            data: updateTeamRequest
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }

    async confirmTeamParticipation(id,confirmationResult) {
        return this.axios({
            method: 'POST',
            url: '/team-participation-requests/'+id+'/confirm/'+confirmationResult,
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }
}
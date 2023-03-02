
const LIST_TEAMS_REQUEST = 'app/containers/listTeam/actions/LIST_TEAM_REQUEST';
const LIST_TEAMS_SUCCESS = 'app/containers/listTeam/actions/LIST_TEAMS_SUCCESS';
const LIST_TEAMS_ERROR = 'app/containers/listTeam/actions/LIST_TEAMS_ERROR';

export {
    LIST_TEAMS_REQUEST,
    LIST_TEAMS_SUCCESS,
    LIST_TEAMS_ERROR,
}

export const listTeamsRequest = () => ({
    type: LIST_TEAMS_REQUEST
});
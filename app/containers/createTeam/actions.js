
const CREATE_TEAM_REQUEST = 'app/containers/createTeam/actions/CREATE_TEAM_REQUEST';
const CREATE_TEAM_SUCCESS = 'app/containers/createTeam/actions/CREATE_TEAM_SUCCESS';
const CREATE_TEAM_ERROR = 'app/containers/createTeam/actions/CREATE_TEAM_ERROR';
const OPEN_DIALOG_CREATE_TEAM = 'app/containers/createTeam/actions/OPEN_DIALOG_CREATE_TEAM';
const CLOSE_DIALOG_CREATE_TEAM = 'app/containers/createTeam/actions/CLOSE_DIALOG_CREATE_TEAM';

export {
    CREATE_TEAM_ERROR,
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CLOSE_DIALOG_CREATE_TEAM,
    OPEN_DIALOG_CREATE_TEAM,
}

export const createTeamRequest = (
    slug, shortName, longName, game, description, slogan, contactInfo
) => ({
    type: CREATE_TEAM_REQUEST,
    slug, shortName, longName, game, description, slogan, contactInfo
});
export const openDialogCreateTeam = () => ({
    type: OPEN_DIALOG_CREATE_TEAM,
});
export const closeDialogCreateTeam = () => ({
    type: CLOSE_DIALOG_CREATE_TEAM,
});
const OPEN_DIALOG_REGISTER_TOURNAMENT = 'app/containers/tournaments/actions/OPEN_DIALOG_REGISTER_TOURNAMENT';
const CLOSE_DIALOG_REGISTER_TOURNAMENT = 'app/containers/tournaments/actions/CLOSE_DIALOG_REGISTER_TOURNAMENT';

const REGISTER_TOURNAMENT_REQUEST = 'app/containers/tournaments/actions/REGISTER_TOURNAMENT_REQUEST';
const REGISTER_TOURNAMENT_SUCCESS = 'app/containers/tournaments/actions/REGISTER_TOURNAMENT_SUCCESS';

const LIST_TOURNAMENT_REQUEST = 'app/containers/tournaments/actions/LIST_TOURNAMENT_REQUEST';
const LIST_TOURNAMENT_SUCCESS = 'app/containers/tournaments/actions/LIST_TOURNAMENT_SUCCESS';

const GET_DETAIL_TOURNAMENT_REQUEST = 'app/containers/tournaments/actions/GET_DETAIL_TOURNAMENT_REQUEST';
const GET_DETAIL_TOURNAMENT_SUCCESS = 'app/containers/tournaments/actions/GET_DETAIL_TOURNAMENT_SUCCESS';

const CONFIRM_TOURNAMENT_REQUEST = 'app/containers/tournaments/actions/CONFIRM_TOURNAMENT_REQUEST';
const CONFIRM_TOURNAMENT_SUCCESS = 'app/containers/tournaments/actions/CONFIRM_TOURNAMENT_SUCCESS';

const PUSH_ERROR_CLIENT_REQUEST = 'app/containers/tournaments/actions/PUSH_ERROR_CLIENT_REQUEST';

const CREATE_TOURNAMENT_REQUEST = 'app/containers/tournaments/actions/CREATE_TOURNAMENT_REQUEST';
const CREATE_TOURNAMENT_SUCCESS = 'app/containers/tournaments/actions/CREATE_TOURNAMENT_SUCCESS';
const CREATE_TOURNAMENT_ERROR = 'app/containers/tournaments/actions/CREATE_TOURNAMENT_ERROR';

export {
    OPEN_DIALOG_REGISTER_TOURNAMENT,
    CLOSE_DIALOG_REGISTER_TOURNAMENT,
    REGISTER_TOURNAMENT_REQUEST,
    REGISTER_TOURNAMENT_SUCCESS,
    LIST_TOURNAMENT_REQUEST,
    LIST_TOURNAMENT_SUCCESS,
    GET_DETAIL_TOURNAMENT_REQUEST,
    GET_DETAIL_TOURNAMENT_SUCCESS,
    CONFIRM_TOURNAMENT_REQUEST,
    CONFIRM_TOURNAMENT_SUCCESS,
    PUSH_ERROR_CLIENT_REQUEST,
    CREATE_TOURNAMENT_REQUEST,
    CREATE_TOURNAMENT_SUCCESS,
    CREATE_TOURNAMENT_ERROR,
}

export const openDialogRegisterTournament = () => ({
    type: OPEN_DIALOG_REGISTER_TOURNAMENT,
});
export const closeDialogRegisterTournament = () => ({
    type: CLOSE_DIALOG_REGISTER_TOURNAMENT,
});
export const registerTournament = (tournamentId, teamId, description) => ({
    type: REGISTER_TOURNAMENT_REQUEST,
    tournamentId, teamId, description
});
export const listTournamentParticipations = (tournamentId) => ({
    type: LIST_TOURNAMENT_REQUEST,
    tournamentId
});
export const getDetailTournament = (tournamentId) => ({
    type: GET_DETAIL_TOURNAMENT_REQUEST,
    tournamentId
});
export const confirmTournamentParticipation = (tournamentId,participationId,confirmationResult) => ({
    type: CONFIRM_TOURNAMENT_REQUEST,
    tournamentId,participationId,confirmationResult
});
export const pushErrorClient = (errors) => ({
    type: PUSH_ERROR_CLIENT_REQUEST,
    errors
});
export const creatTournament = (tournamentInfo) => ({
    type: CREATE_TOURNAMENT_REQUEST,
    tournamentInfo
});

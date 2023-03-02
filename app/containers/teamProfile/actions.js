import {CREATE_TEAM_REQUEST} from "app/containers/createTeam/actions";

const GET_TEAM_PROFILE_REQUEST = 'app/containers/teamProfile/actions/GET_TEAM_PROFILE_REQUEST';
const GET_TEAM_PROFILE_SUCCESS = 'app/containers/teamProfile/actions/GET_TEAM_PROFILE_SUCCESS';
const GET_TEAM_PROFILE_ERROR = 'app/containers/teamProfile/actions/GET_TEAM_PROFILE_ERROR';

const OPEN_DIALOG_ADD_MEMBER = 'app/containers/teamProfile/actions/OPEN_DIALOG_ADD_MEMBER';
const CLOSE_DIALOG_ADD_MEMBER = 'app/containers/teamProfile/actions/CLOSE_DIALOG_ADD_MEMBER';

const HANDLE_CHOOSE_USER_ADD_TO_TEAM = 'app/containers/teamProfile/actions/HANDLE_CHOOSE_USER_ADD_TO_TEAM';

const MEMBER_INVITATION_REQUEST = 'app/containers/teamProfile/actions/MEMBER_INVITATION_REQUEST';
const MEMBER_INVITATION_SUCCESS = 'app/containers/teamProfile/actions/MEMBER_INVITATION_SUCCESS';
const MEMBER_INVITATION_ERROR = 'app/containers/teamProfile/actions/MEMBER_INVITATION_ERROR';

const REQUEST_TO_JOIN_TEAM_REQUEST = 'app/containers/teamProfile/actions/REQUEST_TO_JOIN_TEAM_REQUEST';
const REQUEST_TO_JOIN_TEAM_SUCCESS = 'app/containers/teamProfile/actions/REQUEST_TO_JOIN_TEAM_SUCCESS';
const REQUEST_TO_JOIN_TEAM_ERROR = 'app/containers/teamProfile/actions/REQUEST_TO_JOIN_TEAM_ERROR';

const TEAM_PARTICIPATION_REQUEST = 'app/containers/teamProfile/actions/TEAM_PARTICIPATION_REQUEST';
const TEAM_PARTICIPATION_SUCCESS = 'app/containers/teamProfile/actions/TEAM_PARTICIPATION_SUCCESS';
const TEAM_PARTICIPATION_ERROR = 'app/containers/teamProfile/actions/TEAM_PARTICIPATION_ERROR';

const SEARCH_MEMBER_REQUEST = 'app/containers/teamProfile/actions/SEARCH_MEMBER_REQUEST';
const SEARCH_MEMBER_SUCCESS = 'app/containers/teamProfile/actions/SEARCH_MEMBER_SUCCESS';
const SEARCH_MEMBER_ERROR = 'app/containers/teamProfile/actions/SEARCH_MEMBER_ERROR';

const CONFIRM_TEAM_PARTICIPATION_REQUEST = 'app/containers/teamProfile/actions/CONFIRM_TEAM_PARTICIPATION_REQUEST';
const CONFIRM_TEAM_PARTICIPATION_SUCCESS = 'app/containers/teamProfile/actions/CONFIRM_TEAM_PARTICIPATION_SUCCESS';
const CONFIRM_TEAM_PARTICIPATION_ERROR = 'app/containers/teamProfile/actions/CONFIRM_TEAM_PARTICIPATION_ERROR';

const UPDATE_TEAM_REQUEST = 'app/containers/teamProfile/actions/UPDATE_TEAM_REQUEST';

const CHANGE_TAB_INDEX = 'app/containers/teamProfile/actions/CHANGE_TAB_INDEX';

const TOGGLE_DIALOG_UPDATE_INFO = 'app/containers/teamProfile/actions/TOGGLE_DIALOG_UPDATE_INFO';

export {
    GET_TEAM_PROFILE_ERROR,
    GET_TEAM_PROFILE_REQUEST,
    GET_TEAM_PROFILE_SUCCESS,

    OPEN_DIALOG_ADD_MEMBER,
    CLOSE_DIALOG_ADD_MEMBER,

    HANDLE_CHOOSE_USER_ADD_TO_TEAM,

    MEMBER_INVITATION_ERROR,
    MEMBER_INVITATION_REQUEST,
    MEMBER_INVITATION_SUCCESS,

    REQUEST_TO_JOIN_TEAM_ERROR,
    REQUEST_TO_JOIN_TEAM_REQUEST,
    REQUEST_TO_JOIN_TEAM_SUCCESS,

    TEAM_PARTICIPATION_REQUEST,
    TEAM_PARTICIPATION_SUCCESS,
    TEAM_PARTICIPATION_ERROR,

    SEARCH_MEMBER_REQUEST,
    SEARCH_MEMBER_SUCCESS,
    SEARCH_MEMBER_ERROR,

    TOGGLE_DIALOG_UPDATE_INFO,

    CONFIRM_TEAM_PARTICIPATION_REQUEST,
    CONFIRM_TEAM_PARTICIPATION_SUCCESS,
    CONFIRM_TEAM_PARTICIPATION_ERROR,

    UPDATE_TEAM_REQUEST,

    CHANGE_TAB_INDEX
}

export const updateTeamProfile = (updateTeamRequest) => ({
    type: UPDATE_TEAM_REQUEST,
    updateTeamRequest
});


export const getTeamProfile  = (slug,token, tab) => ({
    type: GET_TEAM_PROFILE_REQUEST,
    slug,
    token,
    tab
});
export const openDialogAddMember = (open) => ({
    type: OPEN_DIALOG_ADD_MEMBER,
    open
});
export const closeDialogAddMember = (open) => ({
    type: CLOSE_DIALOG_ADD_MEMBER,
    open
});
export const handleChooseUserAddToTeam = (resultChoose) => ({
    type: HANDLE_CHOOSE_USER_ADD_TO_TEAM,
    resultChoose
});
export const memberInvitation = (teamId, receiverId) => ({
    type: MEMBER_INVITATION_REQUEST,
    teamId,
    receiverId
});
export const requestToJoinTeam = (teamId) => ({
    type: REQUEST_TO_JOIN_TEAM_REQUEST,
    teamId
});
export const getTeamParticipationState = (teamId) => ({
    type: TEAM_PARTICIPATION_REQUEST,
    teamId
});
export const searchMember = (limit,keyword) => ({
    type: SEARCH_MEMBER_REQUEST,
    limit,
    keyword
});
export const confirmTeamParticipation = (id,confirmationResult,teamId,slug) => ({
    type: CONFIRM_TEAM_PARTICIPATION_REQUEST,
    id,
    confirmationResult,
    teamId,
    slug
});

export const changeTab = (tabName) => ({
    type: CHANGE_TAB_INDEX,
    tabName,
});

export const toggleDialogUpdateInfo = (open) => ({
    type: TOGGLE_DIALOG_UPDATE_INFO,
    open,
});
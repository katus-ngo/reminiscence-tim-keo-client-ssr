import {
    GET_TEAM_PROFILE_SUCCESS,
    GET_TEAM_PROFILE_REQUEST,
    GET_TEAM_PROFILE_ERROR,
    OPEN_DIALOG_ADD_MEMBER,
    CLOSE_DIALOG_ADD_MEMBER,
    HANDLE_CHOOSE_USER_ADD_TO_TEAM,
    TEAM_PARTICIPATION_SUCCESS,
    SEARCH_MEMBER_SUCCESS,
    TOGGLE_DIALOG_UPDATE_INFO,
    CHANGE_TAB_INDEX,
    SEARCH_MEMBER_REQUEST
} from "./actions";

const initialState = {
    teamInfo: null,
    error: null,
    openDialogAddMember: false,
    resultChooseUser: [],
    teamParticipationState: {},
    resultUserSearch: {},
    loading: false,
    loadingTeamProfile: false,
    openDialogUpdateInfo: false,
    tabIndex: 1,
    errorUpdateInfo: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TEAM_PROFILE_REQUEST:
            return {
                ...state,
                teamInfo: null,
                loadingTeamProfile: true
            };
        case GET_TEAM_PROFILE_SUCCESS:
            return {
                ...state,
                teamInfo: action.teamInfo,
                loadingTeamProfile: false,
                tabIndex: action.tabIndex ? action.tabIndex : state.tabIndex
            };
        case SEARCH_MEMBER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_TEAM_PROFILE_ERROR:
            return {
                ...state,
                teamInfo: null,
                loadingTeamProfile: false,
                error: action.error
            };
        case OPEN_DIALOG_ADD_MEMBER:
            return {
                ...state,
                openDialogAddMember: action.open
            };
        case CLOSE_DIALOG_ADD_MEMBER:
            return {
                ...state,
                openDialogAddMember: action.open,
                resultChooseUser: [],
                resultUserSearch: {}
            };
        case HANDLE_CHOOSE_USER_ADD_TO_TEAM:
            return {
                ...state,
                resultChooseUser: action.resultChoose
            };
        case TEAM_PARTICIPATION_SUCCESS:
            return {
                ...state,
                teamParticipationState: action.teamParticipationState
            };
        case SEARCH_MEMBER_SUCCESS:
            return {
                ...state,
                resultUserSearch: action.resultUserSearch,
                loading: false
            };
        case CHANGE_TAB_INDEX:
            return {
                ...state,
                tabIndex: action.tabIndex
            };
        case TOGGLE_DIALOG_UPDATE_INFO:
            return {
                ...state,
                openDialogUpdateInfo: action.open
            };
        default:
            return state;
    }
}
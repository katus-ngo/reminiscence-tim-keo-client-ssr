import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    CHANGE_TAB_INDEX,
    OPEN_DIALOG_MEMBER_INVITATION,
    CLOSE_DIALOG_MEMBER_INVITATION, GET_USER_PROFILE_ERROR,
} from './actions'

const initialState = {
    loadingProfile: false,
    userProfile: null,
    openDialogMemberInvitation: false,
    tabName: "overview",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                userProfile: null,
                loadingProfile: true
            };
        case GET_USER_PROFILE_ERROR:
            return {
                ...state,
                userProfile: null,
                loadingProfile: false
            };
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loadingProfile: false,
                userProfile: action.userProfile,
                tabName: action.tabName
            };
        case OPEN_DIALOG_MEMBER_INVITATION:
            return {
                ...state,
                openDialogMemberInvitation: action.open
            };
        case CLOSE_DIALOG_MEMBER_INVITATION:
            return {
                ...state,
                openDialogMemberInvitation: action.open
            };
        case CHANGE_TAB_INDEX:
            return {
                ...state,
                tabName: action.tabName
            };
        default:
            return state
    }
}
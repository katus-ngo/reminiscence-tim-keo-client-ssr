import {
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_ERROR,
    CLOSE_DIALOG_CREATE_TEAM,
    OPEN_DIALOG_CREATE_TEAM,
} from "./actions";

const initialState = {
    error: null,
    teamInfo:{},
    openDialogCreate:false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEAM_SUCCESS:
            return {
                ...state,
                teamInfo: action.teamInfo
            };
        case CREATE_TEAM_ERROR:
            return {
                ...state,
                error: action.error
            };
        case OPEN_DIALOG_CREATE_TEAM:
            return {
                ...state,
                openDialogCreate: true
            }
        case CLOSE_DIALOG_CREATE_TEAM:
            return {
                ...state,
                openDialogCreate: false
            }
        default:
            return state;
    }
}
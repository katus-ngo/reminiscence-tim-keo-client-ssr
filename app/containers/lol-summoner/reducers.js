import {
    CHANGE_SUMMONER,
    CHANGE_VERIFY,
    MAKE_CHALLENGE_LOL_RESPONSE,
    MAKE_CHALLENGE_LOL_REQUEST,
    MAKE_CHALLENGE_LOL_ERROR,
    VERIFY_CHALLENGE_LOL_SUMMONER_ERROR,
    VERIFY_CHALLENGE_LOL_SUMMONER_REQUEST,
    VERIFY_CHALLENGE_LOL_SUMMONER_RESPONSE,
    BACK_STEP,
    OPEN_DIALOG_ADD_SUMMONER,
    CLOSE_DIALOG_ADD_SUMMONER,
    OPEN_DIALOG_CONFIRM_REMOVE_SUMMONER,
    CLOSE_DIALOG_CONFIRM_REMOVE_SUMMONER,
    INVALIDATE_LOL_SUMMONER_ERROR,
    INVALIDATE_LOL_SUMMONER_REQUEST,
    INVALIDATE_LOL_SUMMONER_RESPONSE
} from './actions'

const initialState = {
    invalidating: false,
    summonerName: '',
    verify: true,
    summoner: null,
    submitting: false,
    activeStep: 0,
    openDialogAddSummoner: false,
    openDialogConfirmRemoveSummoner: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SUMMONER:
            return {
                ...state,
                summonerName: action.summonerName,
            };

        case CHANGE_VERIFY:
            return {
                ...state,
                verify: !state.verify,
            };

        case MAKE_CHALLENGE_LOL_RESPONSE:
            return {
                ...state,
                summoner: action.lolSummoner,
                activeStep: 1,
                submitting: false
            };

        case MAKE_CHALLENGE_LOL_REQUEST:
            return {
                ...state,
                submitting: true,
            };

        case MAKE_CHALLENGE_LOL_ERROR:
            return {
                ...state,
                submitting: false,
                summoner: null
            };

        case VERIFY_CHALLENGE_LOL_SUMMONER_RESPONSE:
            return {
                ...state,
                activeStep: 2,
                submitting: false,
                verify: true,
                summoner: action.lolSummoner
            };

        case VERIFY_CHALLENGE_LOL_SUMMONER_REQUEST:
            return {
                ...state,
                submitting: true,
            };

        case VERIFY_CHALLENGE_LOL_SUMMONER_ERROR:
            return {
                ...state,
                submitting: false,
            };

        case BACK_STEP:
            return {
                ...state,
                activeStep: state.activeStep - 1,
                summoner: state.activeStep === 1 ? null : state.summoner,
            };

        case OPEN_DIALOG_ADD_SUMMONER:
            return {
                ...state,
                openDialogAddSummoner: true
            };

        case CLOSE_DIALOG_ADD_SUMMONER:
            return {
                ...state,
                openDialogAddSummoner: false,
                summoner: null,
                summonerName: '',
                verify: true,
                activeStep: 0,
                submitting: false,
            };

        case OPEN_DIALOG_CONFIRM_REMOVE_SUMMONER:
            return {
                ...state,
                openDialogConfirmRemoveSummoner: true
            };

        case CLOSE_DIALOG_CONFIRM_REMOVE_SUMMONER:
            return {
                ...state,
                openDialogConfirmRemoveSummoner: false,
            };
        case INVALIDATE_LOL_SUMMONER_REQUEST:
            return {
                ...state,
                invalidating: true
            };
        case INVALIDATE_LOL_SUMMONER_RESPONSE:
            return {
                ...state,
                invalidating: false
            };
        default:
            return state
    }
}
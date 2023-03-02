import {
    GET_DETAIL_TOURNAMENT_SUCCESS,
    OPEN_DIALOG_REGISTER_TOURNAMENT,
    CLOSE_DIALOG_REGISTER_TOURNAMENT,
    PUSH_ERROR_CLIENT_REQUEST,
} from './actions'

const initialState = {
    openDialog: false,
    detailTournament: null,
    errors:{}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DIALOG_REGISTER_TOURNAMENT:
            return {
                ...state,
                openDialog: true
            };
        case CLOSE_DIALOG_REGISTER_TOURNAMENT:
            return {
                ...state,
                openDialog: false
            };
        case GET_DETAIL_TOURNAMENT_SUCCESS:
            return {
                ...state,
                detailTournament: action.detailTournament
            };
        case PUSH_ERROR_CLIENT_REQUEST:
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
}
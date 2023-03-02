import {
    OPEN_DIALOG_SIGN_IN_SUCCESS,
    CLOSE_DIALOG_SIGN_IN,
    OPEN_DIALOG_SIGN_UP_SUCCESS,
    CLOSE_DIALOG_SIGN_UP
} from "./actions";

const initialState = {
    openSignUp: false,
    openSignIn: false,
    route: {name: 'home'}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DIALOG_SIGN_IN_SUCCESS:
            return {
                ...state,
                openSignIn: action.open,
                route: action.route ? action.route : {name: 'home'}
            };
        case CLOSE_DIALOG_SIGN_IN:
            return {
                ...state,
                openSignIn: action.open
            };
        case OPEN_DIALOG_SIGN_UP_SUCCESS:
            return {
                ...state,
                openSignUp: action.open,
                route: action.route ? action.route : {name: 'home'}
            };
        case CLOSE_DIALOG_SIGN_UP:
            return {
                ...state,
                openSignUp: action.open
            };
        default:
            return state;
    }
}
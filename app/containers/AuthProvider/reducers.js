import {
    SET_PROFILE,
    CLEAR_PROFILE,
    CLEAR_ERROR,
    LOGIN_ERROR,
    CLEAR_PROFILE_ME,
    REGISTER_BY_EMAIL_ERROR,
    GET_PROFILE_ME_SUCCESS, LOGIN_SUCCESS, LOGIN_BY_EMAIL_REQUEST
} from './actions';

const initialState = {
    profile:null,
    error:null,
    idMe:null,
    profileMe:null,
    submitting: false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                submitting: false
            };
        case LOGIN_BY_EMAIL_REQUEST:
            return {
                ...state,
                submitting: true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
                submitting: false
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
                idMe: action.id
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null
            };
        case CLEAR_PROFILE_ME:
            return {
                ...state,
                profileMe: null
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case REGISTER_BY_EMAIL_ERROR:
            return {
                ...state,
                error: action.error
            };
        case GET_PROFILE_ME_SUCCESS:
            return {
                ...state,
                profileMe: action.profileMe
            };
        default:
            return state;
    }
}

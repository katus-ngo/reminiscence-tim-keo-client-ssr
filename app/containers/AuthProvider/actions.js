const LOGOUT                            = 'app/containers/AuthProvider/actions/LOGOUT';
const LOGIN_BY_EMAIL_REQUEST            = 'app/containers/AuthProvider/actions/LOGIN_BY_EMAIL';
const LOGIN_BY_FACEBOOK_REQUEST         = 'app/containers/AuthProvider/actions/LOGIN_BY_FACEBOOK_REQUEST';
const LOGIN_BY_ZALO_REQUEST             = 'app/containers/AuthProvider/actions/LOGIN_BY_ZALO_REQUEST';
const LOGIN_ERROR                       = 'app/containers/AuthProvider/actions/LOGIN_ERROR';
const LOGIN_SUCCESS                     = 'app/containers/AuthProvider/actions/LOGIN_SUCCESS';
const REGISTER_BY_EMAIL_REQUEST         = 'app/containers/AuthProvider/actions/REGISTER_BY_EMAIL_REQUEST';
const REGISTER_BY_EMAIL_SUCCESS         = 'app/containers/AuthProvider/actions/REGISTER_BY_EMAIL_SUCCESS';
const REGISTER_BY_EMAIL_ERROR           = 'app/containers/AuthProvider/actions/REGISTER_BY_EMAIL_ERROR';
const SET_PROFILE                       = 'app/containers/AuthProvider/actions/SET_PROFILE';
const CLEAR_PROFILE                     = 'app/containers/AuthProvider/actions/CLEAR_PROFILE';
const SET_CREDENTIAL                    = 'app/containers/AuthProvider/actions/SET_CREDENTIAL';
const CLEAR_CREDENTIAL                  = 'app/containers/AuthProvider/actions/CLEAR_CREDENTIAL';
const CLEAR_ERROR                       = 'app/containers/AuthProvider/actions/CLEAR_ERROR';

const GET_PROFILE_ME_REQUEST                       = 'app/containers/AuthProvider/actions/GET_PROFILE_ME_REQUEST';
const GET_PROFILE_ME_SUCCESS                       = 'app/containers/AuthProvider/actions/GET_PROFILE_ME_SUCCESS';
const CLEAR_PROFILE_ME                       = 'app/containers/CLEAR_PROFILE_ME_REQUEST/actions/CLEAR_PROFILE_ME';

export {
    LOGOUT,
    CLEAR_ERROR,
    LOGIN_SUCCESS,
    SET_PROFILE,
    CLEAR_PROFILE,
    SET_CREDENTIAL,
    CLEAR_CREDENTIAL,
    LOGIN_BY_EMAIL_REQUEST,
    LOGIN_ERROR,
    REGISTER_BY_EMAIL_REQUEST,
    REGISTER_BY_EMAIL_SUCCESS,
    REGISTER_BY_EMAIL_ERROR,
    GET_PROFILE_ME_REQUEST,
    GET_PROFILE_ME_SUCCESS,
    CLEAR_PROFILE_ME,
    LOGIN_BY_FACEBOOK_REQUEST,
    LOGIN_BY_ZALO_REQUEST
};

export const loginSuccess  = (token,profile) => ({
    type : LOGIN_SUCCESS,
    token,
    profile,
});
export const setProfile = (profile, id) => ({
    type: SET_PROFILE,
    profile,
    id
});
export const clearProfile = () => ({
    type: CLEAR_PROFILE,
});
export const clearError = () => ({
    type: CLEAR_ERROR,
});
export const setCredential = (token, profile) => ({
    type: SET_CREDENTIAL,
    token,
    profile
});
export const clearCredential = () => ({
    type: CLEAR_CREDENTIAL
});
export const loginByEmail = (email, password, route) => ({
    type: LOGIN_BY_EMAIL_REQUEST,
    email,
    password,
    route
});

export const loginByFacebook = (accessToken, route) => ({
    type: LOGIN_BY_FACEBOOK_REQUEST,
    accessToken,
    route
});

export const loginByZalo = (code, route) => ({
    type: LOGIN_BY_ZALO_REQUEST,
    code,
    route
});

export const registerByEmail = (email, password, fullName, route) => ({
    type: REGISTER_BY_EMAIL_REQUEST,
    email,
    password,
    fullName,
    route
});
export const registerByEmailSuccess  = (token,profile) => ({
    type : REGISTER_BY_EMAIL_SUCCESS,
    token,
    profile,
});

export const logOut = () => ({
    type: LOGOUT,
});

export const getProfileMe=() => ({
    type: GET_PROFILE_ME_REQUEST
});
export const clearProfileMe = () => ({
    type: CLEAR_PROFILE_ME,
});

import {takeLatest, put} from "redux-saga/effects";
import {routerPush} from 'app/utils/Router';
import {
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_BY_EMAIL_REQUEST,
    LOGIN_ERROR,
    SET_CREDENTIAL,
    CLEAR_CREDENTIAL,
    REGISTER_BY_EMAIL_ERROR,
    REGISTER_BY_EMAIL_REQUEST,
    REGISTER_BY_EMAIL_SUCCESS,
    loginSuccess,
    setCredential,
    setProfile,
    clearProfile,
    clearError,
    clearCredential,
    registerByEmailSuccess,
    clearProfileMe,
    GET_PROFILE_ME_REQUEST,
    GET_PROFILE_ME_SUCCESS,
    LOGIN_BY_ZALO_REQUEST,
    LOGIN_BY_FACEBOOK_REQUEST
} from "./actions";
import {authService, cookieService} from "app/services";
import {closeDialogSignIn, closeDialogSignUp} from "app/containers/sign-in-sign-up-dialog/actions";
import {closeDesktopMenu, closeMobileMenu} from "app/containers/layout/actions";
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";

function* logOut() {
    yield put(clearCredential());
    yield put(clearProfile());
    yield put(clearProfileMe());
    yield put(closeDesktopMenu(null));
    yield put(closeMobileMenu(false));
    routerPush('home');
}

function* clearCredentialSaga() {
    cookieService.remove("id");
    cookieService.remove("token");
    cookieService.remove("profile");
    yield put(enqueueSnackbar({
        message: 'Đăng xuất thành công!',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            autoHideDuration:2000
        },
    }))
}


function* loginByEmail(action) {
    try {
        const credential = yield authService.loginByEmail(action.email, action.password);
        yield afterLogin(action, credential);
    } catch (e) {
        yield put({
            type: LOGIN_ERROR,
            error: e
        })
    }

}

function* afterLogin(action, credential) {
    yield put(loginSuccess(credential.token, credential.profile));
    yield put(closeDialogSignIn(false));
    yield put(clearError());
    if(action.route.pathParam){
        routerPush(action.route.name,{[action.route.pathParam]:action.route.pathVariable})
    } else{
        routerPush(action.route.name);
    }
}

function* loginByFacebook(action) {
    try {
        const credential = yield authService.loginByFacebook(action.accessToken);
        yield afterLogin(action, credential);
    } catch (e) {
        yield ({
            type:  LOGIN_ERROR,
            error: e
        })
    }
}

function* loginByZalo(action) {
    try {
        const credential = yield authService.loginWithZalo(action.code);
        yield afterLogin(action, credential);
    } catch (e) {
        yield ({
            type:  LOGIN_ERROR,
            error: e
        })
    }
}

function* loginSuccessSaga(action) {
    const {token, profile} = action;
    yield put(setCredential(token, profile));
    yield put(setProfile(profile));
}

function* setCredentialSaga(action) {
    cookieService.set("id", JSON.stringify(action.profile.id));
    cookieService.set("token", action.token);
    cookieService.set("profile", JSON.stringify(action.profile));
}

function* registerByEmail(action) {
    try {
        const credential = yield authService.registerByEmail(action.email, action.password, action.fullName);
        afterLogin(action, credential);
    } catch (e) {
        yield put({
            type: REGISTER_BY_EMAIL_ERROR,
            error: e
        })
    }
}

function* registerByEmailSuccessSaga(action) {
    const {token, profile} = action;
    yield put(setCredential(token, profile));
    yield put(setProfile(profile));
}

function* getProfileMeSaga() {
    const profileMe = yield authService.getPofileMe();
    yield put({
        type: GET_PROFILE_ME_SUCCESS,
        profileMe: profileMe
    })
}


export default function* () {
    yield takeLatest(LOGIN_SUCCESS, loginSuccessSaga);
    yield takeLatest(LOGIN_BY_EMAIL_REQUEST, loginByEmail);
    yield takeLatest(LOGIN_BY_FACEBOOK_REQUEST, loginByFacebook);
    yield takeLatest(LOGIN_BY_ZALO_REQUEST, loginByZalo);
    yield takeLatest(LOGOUT, logOut);
    yield takeLatest(SET_CREDENTIAL, setCredentialSaga);
    yield takeLatest(CLEAR_CREDENTIAL, clearCredentialSaga);
    yield takeLatest(REGISTER_BY_EMAIL_REQUEST, registerByEmail);
    yield takeLatest(REGISTER_BY_EMAIL_SUCCESS, registerByEmailSuccessSaga);
    yield takeLatest(GET_PROFILE_ME_REQUEST, getProfileMeSaga);
}

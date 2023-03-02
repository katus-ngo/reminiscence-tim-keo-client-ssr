import {takeLatest, put} from "redux-saga/effects";
import {closeDesktopMenu, closeMobileMenu} from "app/containers/layout/actions";
import {
    OPEN_DIALOG_SIGN_IN_REQUEST,
    OPEN_DIALOG_SIGN_IN_SUCCESS,
    OPEN_DIALOG_SIGN_UP_REQUEST,
    OPEN_DIALOG_SIGN_UP_SUCCESS
} from "./actions";

function* openDialogSignInSaga(action) {
    try {
        yield put(closeMobileMenu(false));
        yield put(closeDesktopMenu(null));
        yield put({
            type: OPEN_DIALOG_SIGN_IN_SUCCESS,
            open: action.open,
            route: action.route
        });
    } catch (e) {
        console.log(e)
    }
}
function* openDialogSignUpSaga(action) {
    try {
        yield put(closeMobileMenu(false));
        yield put(closeDesktopMenu(null));
        yield put({
            type: OPEN_DIALOG_SIGN_UP_SUCCESS,
            open: action.open,
            route: action.route
        })
    } catch (e) {
        console.log(e);
    }
}

export default function* () {
    yield takeLatest(OPEN_DIALOG_SIGN_IN_REQUEST, openDialogSignInSaga);
    yield takeLatest(OPEN_DIALOG_SIGN_UP_REQUEST, openDialogSignUpSaga);
}

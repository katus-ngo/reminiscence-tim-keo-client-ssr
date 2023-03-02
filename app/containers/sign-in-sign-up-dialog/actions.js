const OPEN_DIALOG_SIGN_IN_REQUEST   = 'app/containers/sign-in-sing-up-dialog/actions/OPEN_DIALOG_SIGN_IN_REQUEST';
const OPEN_DIALOG_SIGN_IN_SUCCESS   = 'app/containers/sign-in-sing-up-dialog/actions/OPEN_DIALOG_SIGN_IN_SUCCESS';
const OPEN_DIALOG_SIGN_UP_REQUEST   = 'app/containers/sign-in-sing-up-dialog/actions/OPEN_DIALOG_SIGN_UP_REQUEST';
const OPEN_DIALOG_SIGN_UP_SUCCESS   = 'app/containers/sign-in-sing-up-dialog/actions/OPEN_DIALOG_SIGN_UP_SUCCESS';
const CLOSE_DIALOG_SIGN_IN  = 'app/containers/sign-in-sing-up-dialog/actions/CLOSE_DIALOG_SIGN_IN';
const CLOSE_DIALOG_SIGN_UP  = 'app/containers/sign-in-sing-up-dialog/actions/CLOSE_DIALOG_SIGN_UP';

export {
    OPEN_DIALOG_SIGN_IN_REQUEST,
    OPEN_DIALOG_SIGN_IN_SUCCESS,
    CLOSE_DIALOG_SIGN_IN,
    OPEN_DIALOG_SIGN_UP_REQUEST,
    OPEN_DIALOG_SIGN_UP_SUCCESS,
    CLOSE_DIALOG_SIGN_UP,
}

export const openDialogSignIn = (open, route) => ({
    type: OPEN_DIALOG_SIGN_IN_REQUEST,
    open,
    route
});
export const closeDialogSignIn = (open) => ({
    type: CLOSE_DIALOG_SIGN_IN,
    open
});
export const openDialogSignUp = (open, route) => ({
    type: OPEN_DIALOG_SIGN_UP_REQUEST,
    open,
    route
});
export const closeDialogSignUp = (open) => ({
    type: CLOSE_DIALOG_SIGN_UP,
    open
});

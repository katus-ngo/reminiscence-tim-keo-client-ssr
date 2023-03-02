import {takeLatest, put} from "redux-saga/effects";
import {teamService, userService} from 'app/services';

import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR,
    MEMBER_INVITATION_REQUEST,
} from './actions';
import {closeDialogMemberInvitation} from "app/containers/userProfile/actions";
import {enqueueSnackbar} from "../SnackBarNotification/actions";


function* getUserProfileSaga(action) {
    try {
        const userProfile = yield userService.getUserProfile(action.slug);

        yield put({
            type: GET_USER_PROFILE_SUCCESS,
            userProfile: userProfile,
            tabName: action.tabName
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: GET_USER_PROFILE_ERROR,
            error: e
        })
    }

}

function* memberInvitationSaga(action) {
    try {
        yield teamService.memberInvitation(action.teamId, action.receiverId);
        yield put(closeDialogMemberInvitation(false));
        yield put(enqueueSnackbar({
            message: 'Đã gửi lời mời thành công!',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000
            },
        }))
    } catch (e) {
        yield put(enqueueSnackbar({
            message: e.message,
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000
            },
        }))
    }

}

export default function* () {
    yield takeLatest(GET_USER_PROFILE_REQUEST, getUserProfileSaga);
    yield takeLatest(MEMBER_INVITATION_REQUEST, memberInvitationSaga);
}
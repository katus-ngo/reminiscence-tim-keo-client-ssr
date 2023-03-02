import {takeLatest, put} from "redux-saga/effects";
import {teamService, userService} from 'app/services'
import {
    GET_TEAM_PROFILE_ERROR,
    GET_TEAM_PROFILE_REQUEST,
    GET_TEAM_PROFILE_SUCCESS,
    MEMBER_INVITATION_REQUEST,
    REQUEST_TO_JOIN_TEAM_REQUEST,
    closeDialogAddMember,
    getTeamParticipationState,
    getTeamProfile,
    TEAM_PARTICIPATION_REQUEST,
    TEAM_PARTICIPATION_SUCCESS,
    TEAM_PARTICIPATION_ERROR,
    SEARCH_MEMBER_REQUEST,
    SEARCH_MEMBER_SUCCESS,
    SEARCH_MEMBER_ERROR,
    CONFIRM_TEAM_PARTICIPATION_REQUEST,
    UPDATE_TEAM_REQUEST,
} from './actions';
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";

function* getTeamProfileSaga(action) {
    try {
        const teamInfo = yield teamService.getTeamProfile(action.slug);
        const tabs=['rate', 'members', 'challenge'];
        let tabIndex = 1;
        if(tabs.includes(action.tab)){
            tabIndex = tabs.indexOf(action.tab)
        }
        let teamParticipationState;
        try {
            teamParticipationState = yield teamService.teamParticipationState(teamInfo.id, action.token);
        } catch (e) {
            console.log(e);
            teamParticipationState = 'NONE';
        }
        yield put({
            type: GET_TEAM_PROFILE_SUCCESS,
            teamInfo: teamInfo,
            tabIndex: tabIndex
        });
        yield put({
            type: TEAM_PARTICIPATION_SUCCESS,
            teamParticipationState: teamParticipationState
        })

    } catch (e) {
        console.log(e);
        yield put({
            type: GET_TEAM_PROFILE_ERROR,
            error: e
        })
    }

}

function* getTeamParticipationStateSaga(action) {
    try {
        const state = yield teamService.teamParticipationState(action.teamId);
        yield put({
            type: TEAM_PARTICIPATION_SUCCESS,
            teamParticipationState: state
        })
    } catch (e) {
        yield put({
            type: TEAM_PARTICIPATION_ERROR,
            error: e
        })
    }

}


function* updateTeamProfileSaga(action) {
    try {
        const team = yield teamService.updateTeam(
            action.updateTeamRequest
        );

        yield put({
            type: GET_TEAM_PROFILE_SUCCESS,
            teamInfo: team
        });

        yield put(enqueueSnackbar({
            message: 'Cập nhật thành công!',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 2000
            },
        }));
    } catch (e) {
        console.log(e);
        yield put(enqueueSnackbar({
            message: e.message,
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                autoHideDuration: 3000
            },
        }));
    }
}

function* requestToJoinTeamSaga(action) {
    try {
        yield teamService.requestToJoinTeam(action.teamId);
        yield put(getTeamParticipationState(action.teamId));
        yield put(enqueueSnackbar({
            message: 'Đã gửi yêu cầu tham gia thành công!',
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

function* searchMemberSaga(action) {
    try {
        const result = yield userService.searchUser({limit: action.limit, keyword: action.keyword});
        yield put({
            type: SEARCH_MEMBER_SUCCESS,
            resultUserSearch: result
        })
    } catch (e) {
        yield put({
            type: SEARCH_MEMBER_ERROR,
            error: e
        })
    }

}

function* confirmTeamParticipationSaga(action) {
    try {
        yield teamService.confirmTeamParticipation(action.id, action.confirmationResult);
        yield put(getTeamParticipationState(action.teamId));
        yield put(getTeamProfile(action.slug));
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

function* memberInvitationSaga(action) {
    try {
        yield teamService.memberInvitation(action.teamId, action.receiverId);
        yield put(closeDialogAddMember(false));
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
    yield takeLatest(GET_TEAM_PROFILE_REQUEST, getTeamProfileSaga);
    yield takeLatest(MEMBER_INVITATION_REQUEST, memberInvitationSaga);
    yield takeLatest(TEAM_PARTICIPATION_REQUEST, getTeamParticipationStateSaga);
    yield takeLatest(SEARCH_MEMBER_REQUEST, searchMemberSaga);
    yield takeLatest(REQUEST_TO_JOIN_TEAM_REQUEST, requestToJoinTeamSaga);
    yield takeLatest(CONFIRM_TEAM_PARTICIPATION_REQUEST, confirmTeamParticipationSaga);
    yield takeLatest(UPDATE_TEAM_REQUEST, updateTeamProfileSaga);
}
import {takeLatest, put} from 'redux-saga/effects';
import {
    tournamentService
} from 'app/services'
import {
    REGISTER_TOURNAMENT_REQUEST,
    LIST_TOURNAMENT_REQUEST,
    GET_DETAIL_TOURNAMENT_REQUEST,
    GET_DETAIL_TOURNAMENT_SUCCESS,
    CONFIRM_TOURNAMENT_REQUEST,
    CREATE_TOURNAMENT_REQUEST,
} from "./actions";
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";
import {
    closeDialogRegisterTournament
} from 'app/containers/tournaments/actions'
import {routerPush} from "../../utils/Router";

function* registerTournamentSaga(action) {
    try {
        const resultRegister = yield tournamentService.registerTournament(
            action.tournamentId, action.teamId, action.description
        );
        yield put(closeDialogRegisterTournament());
        yield put(enqueueSnackbar({
            message: 'Đăng ký thành công. Chúng tôi sẽ sớm liên hệ với đội của bạn!',
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

function* listTournamentParticipationsSaga(action) {
    try {
        const listTournament = yield tournamentService.listTournamentParticipations(
            action.tournamentId
        )
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

function* getDetailTournamentSaga(action) {
    try {
        const detailTournament = yield tournamentService.detailTournament(
            action.tournamentId
        );
        yield put({
            type: GET_DETAIL_TOURNAMENT_SUCCESS,
            detailTournament: detailTournament
        })
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

function* confirmTournamentParticipationSaga(action) {
    try {
       yield tournamentService.confirmTournamentParticipation(
            action.tournamentId, action.participationId, action.confirmationResult
        )
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

function* creatTournamentSaga(action) {
    try {
        const tournament = yield tournamentService.createTournament(action.tournamentInfo);
        yield put(enqueueSnackbar({
            message: "Tạo giải đấu thành công.",
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration: 3000
            },
        }));
        routerPush('tournament-detail', {id: tournament.id});
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
    yield takeLatest(REGISTER_TOURNAMENT_REQUEST, registerTournamentSaga);
    yield takeLatest(LIST_TOURNAMENT_REQUEST, listTournamentParticipationsSaga);
    yield takeLatest(GET_DETAIL_TOURNAMENT_REQUEST, getDetailTournamentSaga);
    yield takeLatest(CONFIRM_TOURNAMENT_REQUEST, confirmTournamentParticipationSaga);
    yield takeLatest(CREATE_TOURNAMENT_REQUEST, creatTournamentSaga);
}
import {takeLatest, put} from "redux-saga/effects";
import {
    INVALIDATE_LOL_SUMMONER_ERROR,
    INVALIDATE_LOL_SUMMONER_REQUEST,
    INVALIDATE_LOL_SUMMONER_RESPONSE,
    MAKE_CHALLENGE_LOL_REQUEST,
    MAKE_CHALLENGE_LOL_ERROR,
    MAKE_CHALLENGE_LOL_RESPONSE,
    VERIFY_CHALLENGE_LOL_SUMMONER_ERROR,
    VERIFY_CHALLENGE_LOL_SUMMONER_REQUEST,
    VERIFY_CHALLENGE_LOL_SUMMONER_RESPONSE,
    REMOVE_SUMMONER_REQUEST,
    REMOVE_SUMMONER_RESPONSE,
    REMOVE_SUMMONER_ERROR,
} from "app/containers/lol-summoner/actions";
import {getUserProfile} from "app/containers/userProfile/actions";
import {
    cookieService,
    gameCharacterService,
} from "app/services";
import {enqueueSnackbar} from "../SnackBarNotification/actions";

function* invalidateLOLSummoner() {
    try {
        const lolSummoner = yield gameCharacterService.invalidateLOLSummoner();

        yield put({
            type: INVALIDATE_LOL_SUMMONER_RESPONSE,
            lolSummoner,
        });

        window.location.reload();
        // yield put(getUserProfile(cookieService.get("id")));
    } catch (e) {
        console.log(e);
        yield put({
            type: INVALIDATE_LOL_SUMMONER_ERROR,
            error: e.response.data
        });
    }
}

function* makeChallengeLOLSummoner(action) {
    try {
        const lolSummoner = yield gameCharacterService.makeChallengeLOLSummoner(action.summonerName);
        yield put({
            type: MAKE_CHALLENGE_LOL_RESPONSE,
            lolSummoner
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: MAKE_CHALLENGE_LOL_ERROR
        });
        yield put(enqueueSnackbar({
            message: e.response.data.message,
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

function* verifyChallengeLOLSummoner(action) {
    try {
        const lolSummoner = yield gameCharacterService.verifyChallengeLOLSummoner(action.challengeToken, action.verifyLater);
        yield put({
            type: VERIFY_CHALLENGE_LOL_SUMMONER_RESPONSE,
            lolSummoner
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: VERIFY_CHALLENGE_LOL_SUMMONER_ERROR
        });
        yield put(enqueueSnackbar({
            message: e.response.data.message,
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


function* removeLOLSummoner(action) {
    try {
        yield gameCharacterService.removeLOLSummoner(action.lolSummonerId);
        yield put({
            type: REMOVE_SUMMONER_RESPONSE,
        });
        yield put(enqueueSnackbar({
            message: 'Xoá thành công',
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
        // yield put(getUserProfile(cookieService.get('id')));
        window.location.reload();
    } catch (e) {
        console.log(e);
        yield put({
            type: REMOVE_SUMMONER_ERROR
        });
        yield put(enqueueSnackbar({
            message: e.response.data.message,
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

export default function * () {
    yield takeLatest(INVALIDATE_LOL_SUMMONER_REQUEST, invalidateLOLSummoner);
    yield takeLatest(MAKE_CHALLENGE_LOL_REQUEST, makeChallengeLOLSummoner);
    yield takeLatest(VERIFY_CHALLENGE_LOL_SUMMONER_REQUEST, verifyChallengeLOLSummoner);
    yield takeLatest(REMOVE_SUMMONER_REQUEST, removeLOLSummoner);
}
import {takeLatest, put} from "redux-saga/effects";
import { teamService } from 'app/services'
import {
    CREATE_TEAM_ERROR,
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS
} from './actions';
import {routerPush} from "app/utils/Router";
import {closeDialogCreateTeam} from "app/containers/createTeam/actions";
import {enqueueSnackbar} from "../SnackBarNotification/actions";

function* createTeamRequestSaga(action) {
    try{
        const teamInfo = yield teamService.creatTeam(
            action.slug,
            action.shortName,
            action.longName,
            action.game,
            action.description,
            action.slogan
        );
        yield put(enqueueSnackbar({
            message: 'Tạo đội thành công!',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                autoHideDuration:2000
            },
        }));

        yield put(closeDialogCreateTeam());

        routerPush('team-profile', {slug: teamInfo.slug});
    } catch (e) {
        yield put(enqueueSnackbar({
            message: e.message,
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                autoHideDuration:3000
            },
        }));

    }

}


export default function* () {
    yield takeLatest(CREATE_TEAM_REQUEST, createTeamRequestSaga);
}
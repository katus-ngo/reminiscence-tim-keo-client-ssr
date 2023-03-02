import {takeLatest, put} from "redux-saga/effects";
import { teamService } from 'app/services'
import {
    LIST_TEAMS_REQUEST,
    LIST_TEAMS_SUCCESS,
    LIST_TEAMS_ERROR,
} from './actions';

function* listTeamRequestSaga() {
    try{
        const dataListTeam = yield teamService.listTeams();
        yield put({
            type: LIST_TEAMS_SUCCESS,
            dataListTeam: dataListTeam
        })
    } catch (e) {
        yield put({
            type: LIST_TEAMS_ERROR,
            error: e
        })
    }

}


export default function* () {
    yield takeLatest(LIST_TEAMS_REQUEST, listTeamRequestSaga);
}
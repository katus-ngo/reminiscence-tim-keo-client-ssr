import {notificationService} from "../../services";
import {takeLatest, put} from 'redux-saga/effects'
import {COUNT_UNVIEWED_REQUEST, COUNT_UNVIEWED_RESPONSE, VIEW_ALL_REQUEST, VIEW_ALL_RESPONSE} from "./actions";

function* countUnviewed() {
    try {
        const unviewedCount = yield notificationService.countUnviewed();
        yield put({
            type: COUNT_UNVIEWED_RESPONSE,
            unviewedCount: unviewedCount
        })
    } catch (e) {
        console.log(e);
    }
}

function* viewAllNotifications() {
    try {
        yield notificationService.viewAll();
        yield put({
           type: VIEW_ALL_RESPONSE
        });
    } catch (e) {
        console.log(e);
    }
}

export default function* () {
    yield takeLatest(COUNT_UNVIEWED_REQUEST, countUnviewed);
    yield takeLatest(VIEW_ALL_REQUEST, viewAllNotifications);
}
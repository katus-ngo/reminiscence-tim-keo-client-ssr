import {all, fork}                   from 'redux-saga/effects';
import layoutSaga                    from "app/containers/layout/sagas";
import authSaga                      from 'app/containers/AuthProvider/sagas';
import listTeamSaga                  from 'app/containers/listTeam/sagas';
import createTeamSaga                from 'app/containers/createTeam/sagas';
import teamProfileSaga               from 'app/containers/teamProfile/sagas';
import userProfileSaga               from 'app/containers/userProfile/sagas';
import tournamentSaga                from 'app/containers/tournaments/sagas';
import signInSignUpSaga              from 'app/containers/sign-in-sign-up-dialog/sagas';
import notificationSaga              from 'app/containers/notification/sagas';
import lolSummonerSaga               from 'app/containers/lol-summoner/sagas';

export default function* rootSaga() {
    yield all([
        yield fork(layoutSaga),
        yield fork(listTeamSaga),
        yield fork(createTeamSaga),
        yield fork(teamProfileSaga),
        yield fork(signInSignUpSaga),
        yield fork(userProfileSaga),
        yield fork(tournamentSaga),
        yield fork(authSaga),
        yield fork(notificationSaga),
        yield fork(lolSummonerSaga)
    ])
}
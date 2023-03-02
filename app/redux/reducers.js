import {combineReducers} from 'redux';
import layoutData from 'app/containers/layout/reducers';
import listTeamData from 'app/containers/listTeam/reducers';
import createTeamData from 'app/containers/createTeam/reducers';
import signInSignUpData from 'app/containers/sign-in-sign-up-dialog/reducers';
import auth from 'app/containers/AuthProvider/reducers';
import teamProfileData from 'app/containers/teamProfile/reducers';
import userProfileData from 'app/containers/userProfile/reducers';
import snackBarNotificationData from 'app/containers/SnackBarNotification/reducers';
import tournamentData from 'app/containers/tournaments/reducers';
import routerProvider from 'app/containers/router-provider/reducers';
import notification from 'app/containers/notification/reducers';
import lolSummoner from 'app/containers/lol-summoner/reducers';
const rootReducers = combineReducers({
    layoutData,
    listTeamData,
    createTeamData,
    signInSignUpData,
    teamProfileData,
    userProfileData,
    snackBarNotificationData,
    auth,
    routerProvider,
    tournamentData,
    notification,
    lolSummoner
});

export default rootReducers;


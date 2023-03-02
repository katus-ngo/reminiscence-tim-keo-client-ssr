import AuthService from './auth.service';
import TeamService from './team.service';
import TournamentService from './tournament.service';
import UserService from './user.service';
import axios from 'axios';
import config from 'app/config';
import CookieService from './cookie.service';
import ImageUploaderService from './image-uploader.service';
import NotificationService from './notification.service';
import {GameCharacterService} from "app/services/game-character.service";

axios.defaults.baseURL = config.BACKEND_API;


//interceptors axios
axios.interceptors.request.use(configAxios => {
    let authentication = cookieService.get('token');

    configAxios.headers = {
        Authorization: authentication || '',
        ...configAxios.headers
    };

    return configAxios;
}, error => Promise.reject(error));

const authService = new AuthService(axios);
const teamService = new TeamService(axios);
const userService = new UserService(axios);
const tournamentService = new TournamentService(axios);
const cookieService = new CookieService(config);
const imageUploaderService = new ImageUploaderService(axios);
const notificationService = new NotificationService(axios);
const gameCharacterService = new GameCharacterService(axios);

export {
    authService,
    teamService,
    cookieService,
    imageUploaderService,
    userService,
    tournamentService,
    notificationService,
    gameCharacterService,
    axios
}
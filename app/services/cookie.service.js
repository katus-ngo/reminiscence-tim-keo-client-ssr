import Cookies from 'js-cookie'

export default class CookieService {

    constructor(config) {
        this.config = config;
    }


    set(key, value, options = {}) {
        Cookies.set(key, value, {...this.config.cookie, ...options})
    }

    get(key, request) {
        if (request && request['cookies']) {
            return request['cookies'][key];
        }
        return Cookies.get(key);
    }

    remove(key, options) {
        Cookies.remove(key, {...this.config.cookie, options});
    }
}
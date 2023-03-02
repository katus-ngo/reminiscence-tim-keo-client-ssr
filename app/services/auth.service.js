export default class AuthService {
    constructor(axios) {
        this.axios = axios;
    }

    async loginByFacebook(accessToken){
        return this.axios({
            method: 'POST',
            url: '/auth/facebook',
            data: {
                accessToken
            }
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }

    async loginWithZalo(authorizationCode) {
        return this.axios({
            method: 'POST',
            url: '/auth/zalo',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: authorizationCode
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }

    async loginByEmail(email, password){
        return this.axios({
            method: 'POST',
            url: '/auth/local',
            data: {
                username: email,
                password: password
            }
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }

    async registerByEmail(email, password, fullName) {
        return this.axios({
            method: 'POST',
            url:'/register/local',
            data: {
                username: email,
                password: password,
                fullName: fullName
            }
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }

    async getPofileMe() {
        return this.axios({
            method: 'GET',
            url:'/me',
        }).then(response => response.data,error => Promise.reject(error.response.data));
    }

}
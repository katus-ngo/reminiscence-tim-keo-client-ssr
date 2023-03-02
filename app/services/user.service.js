export default class UserService {
    constructor(axios) {
        this.axios = axios;
    }

    async searchUser({offset = 0, limit = 10, keyword = '', direction, fields, ...rest}) {
        return this.axios({
            method: 'GET',
            url: '/users',
            params: {
                limit,
                keyword,
                offset,
                direction,
                fields,
                ...rest
            }
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }

    async getUserProfile(slug) {
        return this.axios({
            method: 'GET',
            url: '/friendly-id-slugs/'+slug
        }).then(response => response.data, error => Promise.reject(error.response.data));
    }
}
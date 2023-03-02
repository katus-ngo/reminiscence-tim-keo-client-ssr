
export default class NotificationService {
    constructor(axios) {
        this.axios = axios;
    }

    countUnviewed() {
        return this.axios({
            method: "GET",
            url: '/notifications/unviewed-count'
        }).then(response => response.data, error => Promise.reject(error));
    }

    viewAll() {
        return this.axios({
           method: "POST",
           url: '/notifications/view-all'
        });
    }

    read(id) {
        return this.axios({
            method: "POST",
            "url": `/notifications/${id}/read`,
        });
    }

    fetch({limit = 10, offset = 0}) {
        return this.axios({
            method: "GET",
            url: '/notifications',
            params: {
                limit,
                offset
            }
        }).then(response => response.data, error => Promise.reject(error));
    }
}
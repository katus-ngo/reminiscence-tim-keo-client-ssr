const config = {
    env: process.env['NODE_ENV'],
    BACKEND_API: process.env.BACKEND_API,
    REDIRECT_URL: process.env.REDIRECT_URL,
    DATA_URL: process.env.DATA_URL,

    cookie : {
        path: "/",
        domain: process.env.DOMAIN_COOKIE,
        expires: 30
    },
    app: {
        HEAD_TITLE_POST_FIX: 'TimKeoVN'
    },
    oauth: {
        facebook: {
            clientId: "2567384563505948"
        },
        zalo: {
            clientId: "3136664010923126701",
            redirectUrl: "http://localhost:1234/auth/zalo"
        }
    }
};

export default config;
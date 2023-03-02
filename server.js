const express = require('express');

const next      = require('next');

const router = express.Router();
const routes = require('./routes.config');

const dev =  process.env.NODE_ENV !== 'production';
const app = next({dev});

const handle = app.getRequestHandler();

const PORT = process.env.PORT || 7070;

const cookieParser = require('cookie-parser');


app.prepare().then(() => {

    const server = express();
    server.use(cookieParser());

    routes.map( route => {
        router.get(route.as, (req, res) => {
            return app.render(req, res, route.pathname)
        })
    });

    server.use(router);

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`)
    });
}).catch(err => {
    console.log(err)
});
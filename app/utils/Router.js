import {buildAsPath} from "./path.helper";
import lodash from "lodash";
import routes from 'routes.config';
import Router from 'next/router';

const routerRedirectServer = (res, routeName, query = {}, language = '') => {
    let route = lodash.find(routes, {name: routeName}) || {};
    let as = buildAsPath(route.as, query);

    res.writeHead(302, {Location: `${language ? '/' + language : ''}${as}`});
    res.end();
};

const routerPush = (routeName, query = {}, language = '') => {
    let route = lodash.find(routes, {name: routeName}) || {};
    let as = buildAsPath(route.as, query);
    Router.push({
        pathname: route.pathname,
        query: query,
    }, `${language ? '/' + language : ''}${as}`)
};

const routerReplace = (routeName, query = {}, language = '') => {
    let route = lodash.find(routes, {name: routeName}) || {};
    let as = buildAsPath(route.as, query);

    Router.replace({
        pathname: route.pathname,
        query: query,
    }, `${language ? '/' + language : ''}${as}`)
};

const getRouteNameByPathname = (pathname) => {
    for(let i = 0; i <= routes.length; i++) {
        if (routes[i].pathname === pathname) return routes[i].name;
    }

    return '';
};

export {
    routerPush,
    routerReplace,
    routerRedirectServer,
    getRouteNameByPathname
};

export const ROUTE_CHANGED = 'app/containers/router-change/ROUTE_CHANGED';

export const routeChange = routeName => ({type: ROUTE_CHANGED, nextRouteName: routeName});
import React from 'react';
import {cookieService} from "app/services";
import {setProfile} from "app/containers/AuthProvider/actions";
import {withRouter} from 'next/router';
import {getRouteNameByPathname} from "app/utils/Router";
import {routeChange} from "app/containers/router-provider/action";

const defaultPage = Page => class DefaultPage extends React.Component {
    static async getInitialProps(ctx = {}) {
        let token = cookieService.get("token", ctx.req);
        let profile = cookieService.get("profile", ctx.req);
        let id = cookieService.get("id", ctx.req);
        try {
            profile = JSON.parse(profile);
        } catch (e) {
            profile = null;
        }
        if (profile) {
            ctx.store.dispatch(setProfile(profile, id));
        }

        const routeName = getRouteNameByPathname(ctx.pathname);
        ctx.store.dispatch(routeChange(routeName));

        const params = ctx.req ? {...ctx.req.query, ...ctx.req.params} : ctx.query;
        return await (Page.getInitialProps && Page.getInitialProps({...ctx, isLogged: !!token,profile, id, params, token}));
    }

    render() {
        return <Page {...this.props}/>
    }
};

export default Page => withRouter(defaultPage(Page));

import React from 'react';
import store from 'app/redux/store';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import {Provider} from 'react-redux';
import {IntlProvider} from "react-intl";
import App, {Container} from 'next/app';
import {ThemeProvider} from '@material-ui/styles';
import theme from 'app/config/theme';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'app/shared/css/Nprogress.css';
import {SnackbarProvider} from 'notistack';
import config from "app/config";

//region config nprogress
NProgress.configure({trickleSpeed: 300});
NProgress.configure(
    {
        showSpinner: false,
        template : "<div class='bar-1' role='bar' style='z-index: 2000'><div class='peg></div></div>"
    });
Router.onRouteChangeStart = () => {
    NProgress.start();
    NProgress.set(0.1);
    NProgress.set(0.2);
    NProgress.set(0.3);
    NProgress.set(0.4);
    NProgress.set(0.5);
    NProgress.set(0.6);
    NProgress.set(0.7);
};

Router.onRouteChangeComplete = () => {
    NProgress.set(0.8);
    NProgress.set(0.9);
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.set(0.8);
    NProgress.set(0.9);
    NProgress.done();
};
//endregion config nprogress

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

        try {
            console.log('zalo init');
            Zalo.init({
                version: '2.0',
                appId: config.oauth.zalo.clientId,
                redirectUrl: config.oauth.zalo.redirectUrl
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async getInitialProps({Component, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <IntlProvider locale="en">
                    <Provider store={store}>
                        <ThemeProvider theme={theme}>
                            <SnackbarProvider maxSnack={3}>
                                <Component {...pageProps} />
                            </SnackbarProvider>
                        </ThemeProvider>
                    </Provider>
                </IntlProvider>
            </Container>
        );
    }
}

export default withRedux(store)(withReduxSaga(MyApp))
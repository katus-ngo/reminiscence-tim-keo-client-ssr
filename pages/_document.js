import Document, {Head, Main, NextScript} from 'next/document';
import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';
import config from "app/config";

class MyDocument extends Document {
    render() {
        return (
            <html>
            <Head>
                <meta charSet="UTF-8"/>
                <link rel="icon" type="image/png" href="/static/images/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, width=device-width, shrink-to-fit=no"/>
                <meta charSet='utf-8'/>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="/static/css/common.css" />
            </Head>
            <body style={{margin:'unset', backgroundColor:'#111217'}}>
            <Main/>
            <NextScript/>
            <script src="https://zjs.zdn.vn/zalo/sdk.js"/>
            <script type='text/javascript'>

            </script>
            </body>
            </html>
        )
    }
}

MyDocument.getInitialProps = async ctx => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: (
            <React.Fragment>
                {sheets.getStyleElement()}
                {flush() || null}
            </React.Fragment>
        ),
    };
};

export default MyDocument;
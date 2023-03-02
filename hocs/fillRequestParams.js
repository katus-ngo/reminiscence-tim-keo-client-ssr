import React from 'react';

export default Page => class FillRequestParams extends React.Component {
    static async getInitialProps (ctx = {}) {
        const params = ctx.req ? {...ctx.req.query, ...ctx.req.params} : ctx.query;

        return await (Page.getInitialProps && Page.getInitialProps({...ctx, params}));
    }

    render() {
        return <Page {...this.props} />
    }
}
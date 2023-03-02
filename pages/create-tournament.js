import React from 'react';
import Layout from 'app/components/layout';
import CreateTournamentContainer from "/app/containers/CreateTournament";
import defaultPage from "/hocs/defaultPage";


class TournamentDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
            return (
                <Layout hide={true}>
                    <CreateTournamentContainer/>
                </Layout>
            )
    }
}

export default defaultPage(TournamentDetail);
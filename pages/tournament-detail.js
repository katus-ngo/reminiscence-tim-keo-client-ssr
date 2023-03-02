import React from 'react';
import Layout from 'app/components/layout';
import defaultPage from "/hocs/defaultPage";
import {connect} from 'react-redux';
import {getDetailTournament} from "../app/containers/tournaments/actions";
import TournamentDetailContainer from 'app/containers/tournaments'


class TournamentDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({store,isLogged, res, params}) {
        store.dispatch(getDetailTournament(params['id']));
    }
    render() {
        const {detailTournament} = this.props;
        if (detailTournament && detailTournament.id) {
            return (
                <Layout hide={true}>
                    <TournamentDetailContainer/>
                </Layout>
            )
        }
        return <h3 style={{color: '#fff'}}>Tournament Not Found</h3>;
    }
}

const mapStateToProps = state => ({
    detailTournament: state.tournamentData.detailTournament
});

export default connect(mapStateToProps, null)(defaultPage(TournamentDetail));
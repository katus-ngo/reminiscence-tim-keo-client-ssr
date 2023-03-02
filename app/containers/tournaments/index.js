import React from 'react';
import defaultPage from "/hocs/defaultPage";
import {connect} from 'react-redux';
import TournamentDetailComponent from 'app/components/tournaments'
import {
    withStyles
} from "@material-ui/core";

const styles = theme => {
    return {

    }
}

class TournamentDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TournamentDetailComponent/>
            )

    }
}

const mapStateToProps = state => ({
    detailTournament: state.tournamentData.detailTournament
});

export default connect(mapStateToProps, null)(withStyles(styles)(defaultPage(TournamentDetailContainer)));
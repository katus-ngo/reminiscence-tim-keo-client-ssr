import React from 'react';
import defaultPage from "/hocs/defaultPage";
import {connect} from 'react-redux';
import {
    Container,
    withStyles
} from "@material-ui/core";
import TournamentHeader from './tournamentHeader';
import TournamentDetail from './detail'


const styles = theme => {
    return {
        tournamentDetail: {
            marginTop: theme.spacing(1)
        }

    }
};

class TournamentDetailComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, detailTournament} = this.props;
        const {
            registerDate, metaInfo,
            tournamentStatus, competitionDate,
            prize,tournamentParticipations,
            tournamentParticipationType,
            description
        } = detailTournament;
        return (
            <section className={classes.tournamentDetail}>
                <Container fixed>
                    <TournamentHeader registerDate={registerDate}
                                      metaInfo={metaInfo}
                                      tournamentStatus={tournamentStatus}
                                      competitionDate={competitionDate}/>
                    <TournamentDetail prize={prize}
                                      registerDate={registerDate}
                                      competitionDate={competitionDate}
                                      tournamentParticipations={tournamentParticipations}
                                      tournamentParticipationType={tournamentParticipationType}
                                      description={description}/>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    detailTournament: state.tournamentData.detailTournament
});

export default connect(mapStateToProps, null)(withStyles(styles)(defaultPage(TournamentDetailComponent)));
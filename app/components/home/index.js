import React from 'react';
import {withStyles} from "@material-ui/core";
import GameLogosComponent from './gameLogos'
import CountDataComponent from './countData'
import GamesChangllenge from './gamesChallenge'
import TimkeoLolChampionshipSeries from './TimkeoLolChampionshipSeries'

const styles = theme => {
    return {
    }
};
class HomeComponent extends React.Component {
    render () {
        const {classes} = this.props;
        return (
            <section>
                <GameLogosComponent/>
                <TimkeoLolChampionshipSeries/>
                {/*// Comming soon!*/}
                {/*<CountDataComponent/>*/}
                <GamesChangllenge/>
            </section>
        )
    }
}
export default withStyles(styles)(HomeComponent)

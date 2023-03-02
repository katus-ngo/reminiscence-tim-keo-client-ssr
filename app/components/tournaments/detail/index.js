import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TounamentSidebarRight from './tounamentSidebarRight';
import TounamentTabOverview from './tounamentTabOverview';
import TournamentParticipations from './tournamentParticipations';
import BracketTournament from './bracketTournament';
import tournamentData from 'app/fakeData/tournamentData'
import {
    Tab,
    Tabs,
    withStyles
} from "@material-ui/core";

const CssTabs = withStyles(theme => ({
    root: {
        borderBottom: '1px solid' + theme.palette.divider,
    },
    indicator: {
        backgroundColor: theme.palette.text.secondary,
    },
}))(Tabs);

const CssTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        marginRight: theme.spacing(2),
        color: '#a4a4a4',
        '&:hover': {
            color: theme.palette.text.secondary,
            opacity: 1,
        },
        '&$selected': {
            color: theme.palette.text.secondary,
            fontWeight: 'bold',
        },
        '&:focus': {
            color: theme.palette.text.secondary,
        },
    },
    selected: {},
}))(props => <Tab {...props} />);

const styles = theme => {
    return {
        tabDetail: {
            position: 'relative'
        },
        tabItem: {
            marginTop: theme.spacing(3),
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]:{
                display: 'block',
            }
        },
        tabContent:{
            marginTop: theme.spacing(6),
          width: 'calc(100% - 310px)',
            [theme.breakpoints.down('sm')]:{
              width: '100%'
            }
        },
        sidebar: {
            maxWidth: '290px',
            width: '100%',
            marginTop: theme.spacing(3),
            [theme.breakpoints.down('sm')]:{
                maxWidth: '100%',
                width: '100%',
                marginTop: theme.spacing(8)
            },
        }
    }
};

class TournamentDetail extends Component {
    constructor(props) {
        super(props);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.state = {
            value: 0,
        }
    }

    handleChangeTab(e, value) {
        this.setState({value});
    }

    render() {
        const {classes,prize,registerDate,competitionDate,description,
            tournamentParticipations,tournamentParticipationType,
        } = this.props;
        const {value} = this.state;
        return (
            <div className={classes.tabDetail}>
                <CssTabs value={value} onChange={this.handleChangeTab}>
                    <CssTab label="Tổng quan"/>
                    <CssTab label={tournamentParticipationType === 'TEAM' ? 'Đội tham gia' : 'Người tham gia'}/>
                    <CssTab label="Luật thi đấu"/>
                    <CssTab label="Ban tổ chức"/>
                    <CssTab label="Bracket"/>
                </CssTabs>
                {value === 0 && <div className={classes.tabItem}>
                    <div className={classes.tabContent}>
                        <TounamentTabOverview prize={prize} registerDate={registerDate} competitionDate={competitionDate} description={description}/>
                    </div>
                    <div className={classes.sidebar}>
                        <TounamentSidebarRight prize={prize}
                                               tournamentParticipations={tournamentParticipations}
                                               tournamentParticipationType={tournamentParticipationType}/>
                    </div>
                </div>}
                {value === 1 && <div className={classes.tabItem}>
                    <div className={classes.tabContent}>
                        <TournamentParticipations tournamentParticipations={tournamentParticipations}
                                                  tournamentParticipationType={tournamentParticipationType}/>
                    </div>
                    <div className={classes.sidebar}>
                        <TounamentSidebarRight prize={prize}
                                               tournamentParticipations={tournamentParticipations}
                                               tournamentParticipationType={tournamentParticipationType}/>
                    </div>
                </div>}
                {value === 2 && <div>
                    <p style={{fontSize: '24px', color: '#ebeef2', textAlign: 'center'}}>Coming soon!</p>
                </div>}
                {value === 3 && <div>
                    <p style={{fontSize: '24px', color: '#ebeef2', textAlign: 'center'}}>Coming soon!</p>
                </div>}
                {value === 4 && <div className={classes.tabItem} style={{overflow: "hidden", height: '100vh',}}>
                    <BracketTournament round={3} tournamentData={tournamentData} />
                </div>}
            </div>
        )
    }
}

TournamentDetail.propTypes = {
    prize: PropTypes.object,
    registerDate: PropTypes.object,
    competitionDate: PropTypes.object,
    tournamentParticipations: PropTypes.array,
    tournamentParticipationType: PropTypes.string,
    description: PropTypes.string,
};

export default withStyles(styles)(TournamentDetail);


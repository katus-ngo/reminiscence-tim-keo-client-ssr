import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SideBarInfoTeam from './siderbarTeamInfo'
import {
    withStyles,
} from "@material-ui/core";
import TabInfoTeam from './tabTeamInfo';


const styles = theme => {
    return {
        fullWidth: {
            width: '100%',
            display: 'flex',
            marginTop: theme.spacing(8),
            [theme.breakpoints.down('sm')]: {
                display: 'block'
            }
        },
        intro: {
            width: '275px',
            flex: '0 0 auto',
            backgroundColor: '#1b1c23',
            marginRight: theme.spacing(1),
            padding: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginRight: 'unset',
                padding: 'unset',
            }
        },
        tabInfo: {
            flex: '1 1 auto',
            backgroundColor: '#1b1c23',
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            position: 'relative',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                padding: 'unset',
                marginTop: theme.spacing(4)
            }
        },
    }
};

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {teamInfo, classes, isCaptain} = this.props;
        return (
            <div className={classes.fullWidth}>
                <div className={classes.intro}>
                    <SideBarInfoTeam teamInfo={teamInfo} isCaptain={isCaptain}/>
                </div>
                <div className={classes.tabInfo}>
                    <TabInfoTeam teamInfo={teamInfo}/>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    teamInfo: PropTypes.object,
    isCaptain: PropTypes.bool,
};

export default withStyles(styles)(Index)
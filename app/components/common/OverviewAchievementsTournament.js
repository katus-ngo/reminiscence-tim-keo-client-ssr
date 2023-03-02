import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
} from '@material-ui/core'
import {
    IconTrophy
} from 'app/components/icon'

const styles = theme => {
    return {
        achievements: {
            display: 'flex',
        },
        achievement: {
            display: 'flex',
            alignItems: 'center',
            marginRight: 4
        },
        count: props=>({
            fontSize: props.countSize ? props.countSize : 14
        }),
        icon:{
            marginRight: 2
        }
    }
};

class OverviewAchievementsTournament extends React.Component {
    render() {
        const {
            classes,
            first,
            second,
            third,
            iconSize,
        } = this.props;
        return (
            <div className={classes.achievements}>
                <span className={classes.achievement}><IconTrophy className={classes.icon} fill='#bc952c'
                                                                  size={iconSize}/><Typography component='span'
                                                                                               color='textPrimary'
                                                                                               className={classes.count}>{first}</Typography></span>
                <span className={classes.achievement}><IconTrophy className={classes.icon} fill='#acacac'
                                                                  size={iconSize}/><Typography component='span'
                                                                                               color='textPrimary'
                                                                                               className={classes.count}>{second}</Typography></span>
                <span className={classes.achievement}><IconTrophy className={classes.icon} fill='#8c612d'
                                                                  size={iconSize}/><Typography component='span'
                                                                                               color='textPrimary'
                                                                                               className={classes.count}>{third}</Typography></span>
            </div>
        )
    }
}

OverviewAchievementsTournament.defaultProps = {
    first: 0,
    second: 0,
    third: 0,
    iconSize: 14,
    countSize: 14
};
OverviewAchievementsTournament.propTypes = {
    first: PropTypes.number,
    second: PropTypes.number,
    third: PropTypes.number,
    iconSize: PropTypes.number,
    countSize: PropTypes.number,
};
export default withStyles(styles)(OverviewAchievementsTournament);
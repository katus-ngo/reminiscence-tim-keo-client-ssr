import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Card,
    Typography, Tooltip,
} from '@material-ui/core'
import {
    IconVersusGame,
    IconMedal
} from 'app/components/icon';
import {
    Person,
    Group,
} from "@material-ui/icons";
import {
    convertTournamentStatus,
    convertTournamentDaysAround,
} from 'app/utils/convertInfoTournament.helper';
import Link from "../../utils/Link";
import {cookieService} from "../../services";

const styles = theme => {
    return {
        container: {
            width: '100%',
            position: 'relative',
            '&:hover': {
                '&:before': {
                    content: '""',
                    paddingTop: '25%',
                    paddingBottom: '25%',
                    paddingLeft: '50%',
                    paddingRight: '50%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    borderRadius: 4,
                    position: 'absolute',
                },
                cursor: 'pointer'
            },
        },
        thumbnail: props => ({
            paddingTop: '25%',
            paddingBottom: '25%',
            paddingLeft: '50%',
            paddingRight: '50%',
            backgroundImage: 'url("' + props.briefInfoTournament.thumbnail + '")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }),
        content: {
            marginTop: theme.spacing(1)
        },
        status: props => ({
            fontSize: 10,
            color: theme.palette.text.secondary,
            padding: '2px 8px',
            height: 16,
            backgroundColor: convertTournamentStatus(props.briefInfoTournament.status).color,
            borderRadius: '500px',
        }),
        moreInfo: {
            display: 'flex',
            alignItems: 'center'
        },
        time: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        itemInfo: {
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: 4
        },
        iconOne: {
            color: theme.palette.text.primary,
            width: '18.25px',
            height: '16.85px',
            marginRight: 2
        },
        iconTwo: {
            color: theme.palette.text.primary,
            fontSize: '18px'
        },
        name: {
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        medal: {
            position: 'absolute',
            right: 0,
            top: '-6px'
        }
    }
};

class BriefInfoTournament extends React.Component {
    render() {
        const {
            classes,
            briefInfoTournament
        } = this.props;
        const {id, competitionDate, prize, slot, name, tournamentParticipationType, status, winnerID} = briefInfoTournament;
        const userId = cookieService.get("id");
        let medalColor = null;
        winnerID && winnerID.forEach((id, index) => {
            if (id === parseInt(userId)) {
                medalColor = ['#bc952c', '#acacac', '#8c612d'][index]
            }
        });
        const time = convertTournamentDaysAround(null,competitionDate, status);
        return (
            <Link routeName={"tournament-detail"} query={{"id": id}}>
                <div className={classes.container}>
                    {
                        medalColor && <IconMedal className={classes.medal} fill={medalColor}/>
                    }
                    <Card className={classes.thumbnail}>
                    </Card>
                    <div className={classes.content}>
                        <div className={classes.time}>
                            <Typography component='span' variant='body2' color='textPrimary'>{time}</Typography>
                            <span className={classes.status}>
                            <Typography component='span'
                                        variant='body2'>{convertTournamentStatus(status).status}</Typography>
                                    </span>
                        </div>
                        <Tooltip title={name} placement="top-start"><Typography component='p' variant='body1'
                                                                                color='textSecondary'
                                                                                className={classes.name}>{name}</Typography></Tooltip>
                        <div className={classes.moreInfo}>
                        <span className={classes.itemInfo}>
                            <IconVersusGame className={classes.iconOne}/>
                            <Typography component='span' variant='body2'
                                        color='textPrimary'>{tournamentParticipationType} • </Typography>
                        </span>
                            <span className={classes.itemInfo}>
                            <Typography component='span' variant='body2'
                                        color='textPrimary'>${prize.prizePool} •</Typography>
                        </span>
                            <span className={classes.itemInfo}>
                            {
                                tournamentParticipationType === 'Team' && <Group className={classes.iconTwo}/>
                            }
                                {
                                    tournamentParticipationType !== 'Team' && <Person className={classes.iconTwo}/>
                                }
                                <Typography component='span' variant='body2' color='textPrimary'>{slot}</Typography>
                        </span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

BriefInfoTournament.defaultProps = {
    briefInfoTournament: {},
};
BriefInfoTournament.propTypes = {
    briefInfoTournament: PropTypes.object,
};
export default withStyles(styles)(BriefInfoTournament);
import React, {Component} from 'react';
import {
    withStyles, Avatar, Typography, Zoom, Tooltip
} from "@material-ui/core";
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {openDialogCreateTeam} from "app/containers/createTeam/actions";
import clsx from 'clsx';
import PropTypes from "prop-types";

const getHeightLineTwo = (participantsOfMatch = 2, participantHeight = 42, participantSpacing = 2, matchSpacing = 32) => {
    let heightLineTwo = 0;
    heightLineTwo = 0.5 * (participantsOfMatch * participantHeight + participantSpacing * (participantsOfMatch - 1) + matchSpacing);
    return heightLineTwo;
};

const buildNthChild = (round, classes) => {
    const firstNth = {
        [`&:first-child .${classes.lineAlt}`]: {
            display: 'none'
        }
    };

    const lastNth = {
        [`&:last-child .${classes.matchLines}`]: {
            display: 'none'
        },
        [`&:last-child .${classes.lineAlt}`]: {
            display: 'block'
        }
    };
    let ret = {...firstNth, ...lastNth};
    const baseHeightLine = getHeightLineTwo();
    for (let i = 1; i < round; i++) {
        ret = {
            ...ret,
            [`&:nth-child(${i + 1}) .${classes.lineTwo}`]: {
                height: baseHeightLine * Math.pow(2, i)
            }
        }
    }

    return ret;
};


const styles = theme => {
    const fontSize = 12;
    const participantHeight = 42;
    const participantWidth = 240;
    const participantSpacing = 2;
    const matchSpacing = 32;
    const lineSize = 1;
    return {
        bracket:{
            overflowX: 'scroll',
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                borderRadius: '10px',
                backgroundColor: '#5d6170'
            },
            '&::-webkit-scrollbar': {
                height: '10px',
                width: '0px',
                backgroundColor: '#5d6170',
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                backgroundColor: '#3b3d44'
            }
        },
        bracketContent: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
        },
        bracketTitle: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: theme.spacing(5)
        },
        roundMain: {
            width: participantWidth + 14.88,
            float: 'left',
            display: 'flex',
            flexDirection: 'column',
            '& p': {
                textAlign: 'center',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },
        roundRight: {
            width: matchSpacing * 2,
            height: '100%',
            float: 'left'
        },
        avatar:{
            width: 34,
            height: 34,
            marginLeft: '8px',
        },
        name: {
            marginLeft: '8px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: 156
        },
        score:{
            width: 42,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#707070',
            color: 'black'
        },
        winner:{
            backgroundColor: '#FF7F28'
        },
        match: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            marginBottom: matchSpacing,
            marginRight: matchSpacing * 2,
            '&:nth-child(even)': {
                '& $lineTwo': {
                    transform: 'translate(0,-100%)',
                },
            }
        },
        matchId: {
            fontSize: fontSize,
            fontFamily: 'Open Sans',
            color: 'white',
            fontWeight: 'bold',
            marginRight: '8px',
        },
        participant: {
            width: participantWidth,
            height: participantHeight,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#58595D',
            marginBottom: participantSpacing,
            '&:last-child': {
                marginBottom: 'unset'
            }
        },
        matchLines: {
            position: 'absolute',
            right: matchSpacing / 2 * -1        // -12px
        },
        line: {
            background: '#3B3D46',
            position: 'absolute'
        },
        lineOne: {
            height: lineSize,           // 1px
            width: matchSpacing / 2     // 12px
        },
        lineTwo: {
            width: lineSize,            // 1px
            left: matchSpacing / 2 - lineSize,      // 11px
            height: getHeightLineTwo()
        },
        lineAlt: {
            left: matchSpacing * -1
        },
    }
};

class Column extends React.Component {

    render = () => {
        let {matchesRound, classes, parentClasses} = this.props;
        classes = {...classes, ...parentClasses};
        return <div className={classes.column}>
            {
                matchesRound.map((match, key) => {
                    const winnerId = match.winner_id;
                    return (
                        <div className={clsx(classes.match)} key={key}>
                            <div className={classes.matchId}>
                                1
                            </div>
                            <div className={classes.participation}>
                                {
                                    match.participants.map((participant, key) => {
                                        return (
                                            <div className={classes.participant} key={key}>
                                                <Avatar className={classes.avatar}>T</Avatar>
                                                <Tooltip title={participant && participant.name} TransitionComponent={Zoom}
                                                         placement="top-start">
                                                    <Typography component="p" color='textSecondary' className={classes.name}
                                                                variant='body1'>{participant && participant.name}</Typography>
                                                </Tooltip>
                                                {
                                                    (participant && participant.scores != null) && <div className={classes.score}>
                                                        <Typography component="p"
                                                                    className={clsx(classes.score, participant && winnerId === participant.id && classes.winner)}
                                                                    variant='body2'>{participant && participant.scores}</Typography>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.matchLines}>
                                <div className={clsx(classes.line, classes.lineOne)}></div>
                                <div className={clsx(classes.line, classes.lineTwo)}></div>
                            </div>
                            <div className={clsx(classes.matchLines, classes.lineAlt)}>
                                <div className={clsx(classes.line, classes.lineOne)}></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    }
}

const StyledColumn = withStyles({
    column: (props) => {
        const nth = buildNthChild(props['roundCount'], props['parentClasses']);
        return {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            justifyContent: 'space-around',
            alignContent: 'center',
            ...nth
        };
    }
})(Column);

class BracketTournament extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes, tournamentData} = this.props;
        const matchesByRound = tournamentData.matches_by_round;
        const rounds = tournamentData.rounds;
        return (
            <div className={classes.bracket}>
                <div className={classes.bracketTitle}>
                    {
                        rounds.map((round, key) => {
                            return (
                                <div key={key} style={{display:'flex'}}>
                                    <div className={classes.roundMain}>
                                        <Tooltip title={round.title} TransitionComponent={Zoom}
                                                 placement="top">
                                            <Typography component="p" color='textSecondary'
                                                        variant='body1'>{round.title}</Typography>
                                        </Tooltip>
                                        <Tooltip title={round.title} TransitionComponent={Zoom}
                                                 placement="bottom">
                                            <Typography component="p" color='textPrimary'
                                                        variant='body2'>BO{round.best_of}</Typography>
                                        </Tooltip>
                                    </div>
                                    <div className={classes.roundRight}>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={classes.bracketContent}>
                    <div>
                    </div>
                    {
                        matchesByRound.map((matchesRound, key) => {
                            return (
                                <StyledColumn parentClasses={classes} matchesRound={matchesRound}
                                              roundCount={rounds.length}
                                              key={key}/>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

BracketTournament.propTypes = {
    round: PropTypes.number,
    tournamentData: PropTypes.object
};
const mapStateToProps = createStructuredSelector({
    // profile: state => state.auth.profile,
});
const mapDispatchToProps = dispatch => ({
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BracketTournament));
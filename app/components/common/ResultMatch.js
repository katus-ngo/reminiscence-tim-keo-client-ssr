import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    withStyles,
    Card, Typography
} from "@material-ui/core";
import Link from "../../utils/Link";
import lodash from 'lodash';
import AvatarT from "./avatar";
import {generateLetterAvatar} from "../../utils/generateLetterAvatar.helper";

const styles = theme => {
    return {
        container: props => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: props.result.tournamentInfo.banner ? 'url("' + props.result.tournamentInfo.banner + '")' : 'url("/static/images/background_add_summoner.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            position: 'relative',
            '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
            },
            '&:hover:before': {
                background: 'rgba(0, 0, 0, 0.6)'
            },
            '&:hover': {
                cursor: 'pointer'
            },
        }),
        result: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1
        },
        left: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row-reverse',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center'
            },
            '& div:last-child': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                marginRight: 8,
                [theme.breakpoints.down('md')]: {
                    alignItems: 'center',
                    marginRight: 'unset',
                    marginTop: 8
                }
            }

        },
        right: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center'
            },
            '& div:last-child': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: 8,
                [theme.breakpoints.down('md')]: {
                    alignItems: 'center',
                    marginLeft: 'unset',
                    marginTop: 8
                }
            }
        },
        mid: {
            width: '100%',
            textAlign: 'center',
            maxWidth: 126,
            '& p': {
                fontSize: 32
            },
            [theme.breakpoints.down('md')]: {
                '& p': {
                    fontSize: 14
                },
                maxWidth: 50,
            }
        },
        matchId: {
            fontSize: 20,
            marginBottom: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                fontSize: 16,
            },
            zIndex: 1
        },
        win: {
            fontSize: 16,
            color: '#19E627'
        },
        lose: {
            fontSize: 16,
            color: '#c43855'
        },
        avatar: {
            width: 54,
            height: 54,
            backgroundColor: '#e64a19',
            color: theme.palette.text.secondary
        }

    }
}

class ResultMatch extends Component {
    render() {
        const {
            classes,
            result,
            userId,
        } = this.props;
        const {tournamentInfo, matchInfo} = result;
        let participationLeft;
        let participationRight;
        if (userId) {
            participationLeft = lodash.find(matchInfo.participation, {'id': userId});
            participationRight = lodash.find(matchInfo.participation, (p) => (p.id !== userId));
        } else {
            participationLeft = matchInfo.participation[0]
            participationRight = matchInfo.participation[1]
        }
        return (
            <Link routeName={"tournament-detail"} query={{"id": tournamentInfo.id}}>
                <Card className={classes.container}>
                    <Typography color='textPrimary' className={classes.matchId}>
                        Trận {matchInfo.id}
                    </Typography>
                    <div className={classes.result}>
                        <div className={classes.left}>
                            <AvatarT alt={participationLeft.fullName}
                                     avatar={participationLeft.avatar}
                                     letterAvatar={generateLetterAvatar(participationLeft.fullName)}
                                     className={classes.avatar}
                            />
                            <div>
                                {
                                    participationLeft.winner && <Typography className={classes.win}>
                                        Thắng
                                    </Typography>
                                }
                                {
                                    !participationLeft.winner && <Typography className={classes.lose}>
                                        Thua
                                    </Typography>
                                }
                                <Typography variant='body1' color='textSecondary' style={{fontWeight: 900}}>
                                    {participationLeft.fullName}
                                </Typography>
                            </div>

                        </div>
                        <div className={classes.mid}>
                            <Typography color='textSecondary'>
                                {participationLeft.score} : {participationRight.score}
                            </Typography>
                        </div>
                        <div className={classes.right}>
                            <AvatarT alt={participationRight.fullName}
                                     avatar={participationRight.avatar}
                                     letterAvatar={generateLetterAvatar(participationRight.fullName)}
                                     className={classes.avatar}
                            />
                            <div>
                                {
                                    participationRight.winner && <Typography className={classes.win}>
                                        Thắng
                                    </Typography>
                                }
                                {
                                    !participationRight.winner && <Typography className={classes.lose}>
                                        Thua
                                    </Typography>
                                }
                                <Typography variant='body1' color='textSecondary' style={{fontWeight: 900}}>
                                    {participationRight.fullName}
                                </Typography>
                            </div>

                        </div>
                    </div>
                </Card>
            </Link>
        );
    }

}

ResultMatch.defaultProps = {}
ResultMatch.propTypes = {
    result: PropTypes.object,
    userId: PropTypes.number
}
export default withStyles(styles)(ResultMatch);
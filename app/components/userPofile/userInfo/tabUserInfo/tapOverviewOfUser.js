import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    Card,
    Typography,
    withStyles
} from "@material-ui/core";
import ResultMatch from "../../../common/ResultMatch";
import {resultMatchs} from 'app/fakeData/fakeResultMatch'
import {briefInfoTournaments} from 'app/fakeData/briefInfoTournament'
import moment from "moment";
import Link from "../../../../utils/Link";
import {
    IconMedal
} from 'app/components/icon'
import ListAvatarUser from "app/components/common/ListAvatarUser"
import AvatarT from "app/components/common/avatar";
import {generateLetterAvatar} from "app/utils/generateLetterAvatar.helper";
import {
    convertTournamentDaysAround
} from 'app/utils/convertInfoTournament.helper'
import {
    IconTrophy
} from 'app/components/icon'
import CicularRate from "../../../common/CicularRate";

const styles = theme => {
    return {
        achievements: {
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingBottom: theme.spacing(3),
            borderBottom: '1px solid #21232B',
            '&>div p': {
                [theme.breakpoints.down('xs')]: {
                    fontSize: '12px',
                }
            },
            '&>div': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            '&>div:nth-child(Odd) $trophy': {
                fontSize: '80px',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '40px',
                }
            },
            '&>div:nth-child(Even)': {
                marginRight: 60,
                marginLeft: 60,
                [theme.breakpoints.down('xs')]: {
                    marginRight: 'unset',
                    marginLeft: 'unset',
                }
            },
            '&>div:nth-child(Even) $trophy': {
                fontSize: '110px',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '55px',
                }
            },
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                justifyContent: 'space-around',
            },
        },
        trophy: {
            display: 'block'
        },
        rate: {
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: theme.spacing(10),
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            }
        },
        rateXs: {
            '&>div>div': {
                width: 100,
                height: 100,
            },
            '&>div:last-child':{
                display:'flex',
                justifyContent:'space-around'
            },
            '&>div:first-child':{
                display:'flex',
                justifyContent:'center'
            },
            marginBottom: theme.spacing(6),
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            }
        },
        cicularProgress: {
            width: 100,
            height: 100,
        },
        activities: {
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column'
            }
        },
        activitiesLeft: {
            flex: '0 0 auto',
            width: 245,
            marginRight: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                flex: 'unset',
                marginRight: 'unset',
                width: 'auto'
            }
        },
        matchHistory: {
            flex: '1 1 auto',
            [theme.breakpoints.down('xs')]: {
                flex: 'unset'
            }

        },
        activitiLeft: {
            marginBottom: theme.spacing(4),
            '&:last-child': {
                marginBottom: 'unset'
            },
            borderBottom: '1px solid #21232B',
            paddingBottom: theme.spacing(2)
        },
        content: {
            marginTop: theme.spacing(2)
        },
        tournament: {
            marginBottom: theme.spacing(1),
            '&:last-child': {
                marginBottom: 'unset'
            }
        },
        tournamentCard: {
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            position: 'relative',
            height: 68,
            '&:before': {
                content: '""',
                background: 'rgba(0,0,0,0.4)',
                height: '100%',
                width: '100%',
                position: 'absolute'
            },
            '&:hover:before': {
                background: 'rgba(0,0,0,0.6)'
            },
            '&:hover': {
                cursor: 'pointer'
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing(1),
            '&:last-child': {
                marginBottom: 'unset'
            }
        },
        text: {
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            '& p': {
                width: '90%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textAlign: 'center'
            }
        },
        medal: {
            position: 'absolute',
            right: 0,
            top: '-6px',
            zIndex: 1
        },
        title: {
            '& p:hover': {
                cursor: 'pointer',
                color: theme.palette.text.primary
            }
        },
        match: {
            backgroundColor: '#21232B',
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2),
            '&:last-child': {
                marginBottom: 'unset'
            }
        },
        matchHeader: {
            marginBottom: theme.spacing(2),
            display: 'flex',
            alignItems: 'flex-start'
        },
        avatar: {
            width: 42,
            height: 42,
            backgroundColor: '#e64a19',
            color: theme.palette.text.secondary
        },
        matchHeaderTitle: {
            marginLeft: theme.spacing(1)
        },
        name: {
            '&:hover': {
                color: theme.palette.text.primary,
                cursor: 'pointer'
            },
            fontWeight: 900
        }
    }
};

class TapOverviewOfUser extends Component {
    render() {
        const {
            classes,
            userProfile
        } = this.props;

        const {fullName, avatar, id: userId} = userProfile || {};

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 32}}>
                    <div className={classes.achievements}>
                        <div>
                            <IconTrophy fill='#acacac' className={classes.trophy}/>
                            <Typography variant='body1' color='textSecondary'>
                                Á QUÂN&nbsp;
                                <Typography component='span' style={{color: '#00af00'}} variant='body1'
                                            color='textSecondary'>
                                    10&nbsp;
                                </Typography>
                                LẦN
                            </Typography>
                        </div>
                        <div>
                            <IconTrophy fill='#bc952c' className={classes.trophy}/>
                            <Typography variant='body1' color='textSecondary'>
                                VÔ ĐỊCH&nbsp;
                                <Typography component='span' style={{color: '#00af00'}} variant='body1'
                                            color='textSecondary'>
                                    10&nbsp;
                                </Typography>
                                LẦN
                            </Typography>
                        </div>
                        <div>
                            <IconTrophy fill='#8c612d' className={classes.trophy}/>
                            <Typography variant='body1' color='textSecondary'>
                                HẠNG BA&nbsp;
                                <Typography component='span' style={{color: '#00af00'}} variant='body1'
                                            color='textSecondary'>
                                    10&nbsp;
                                </Typography>
                                LẦN
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.rate}>
                    <div className={classes.cicularProgress}>
                        <CicularRate label='Uy tín'
                                     percentage={75} pathColor='#e64a19'
                                     trailColor='#111217'
                        />
                    </div>
                    <div className={classes.cicularProgress}>
                        <CicularRate label='Tỉ lệ chơi'
                                     percentage={75} pathColor='#19e627'
                                     trailColor='#111217'
                        />
                    </div>
                    <div className={classes.cicularProgress}>
                        <CicularRate label='Tỉ lệ thắng'
                                     percentage={75} pathColor='#10baa8'
                                     trailColor='#111217'
                        />
                    </div>
                </div>

                <div className={classes.rateXs}>
                    <div>
                        <div>
                            <CicularRate label='Uy tín'
                                         percentage={75} pathColor='#e64a19'
                                         trailColor='#111217'
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <CicularRate label='Tỉ lệ chơi'
                                         percentage={75} pathColor='#19e627'
                                         trailColor='#111217'
                            />
                        </div>
                        <div>
                            <CicularRate label='Tỉ lệ thắng'
                                         percentage={75} pathColor='#10baa8'
                                         trailColor='#111217'
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.activities}>
                    <div className={classes.activitiesLeft}>
                        <div className={classes.activitiLeft}>
                            <div className={classes.title}>
                                <Link routeName={"user-profile"} query={{"id": userId, tab: 'tournaments'}}>
                                    <Typography color={"textSecondary"} variant='body1'>
                                        GIẢI ĐẤU
                                    </Typography>
                                </Link>
                            </div>
                            <div className={classes.content}>
                                {
                                    briefInfoTournaments.slice(0, 3).map((t, key) => {
                                        let medalColor = null;
                                        t.winnerID && t.winnerID.forEach((id, index) => {
                                            if (id === parseInt(userId)) {
                                                medalColor = ['#bc952c', '#acacac', '#8c612d'][index]
                                            }
                                        });
                                        return (
                                            <div style={{position: 'relative'}} key={key}
                                                 className={classes.tournament}>
                                                {
                                                    medalColor &&
                                                    <IconMedal className={classes.medal} fill={medalColor}/>
                                                }
                                                <Link routeName={"tournament-detail"} query={{"id": t.id}}>
                                                    <Card className={classes.tournamentCard} style={{
                                                        backgroundImage: t.thumbnail ? 'url("' + t.thumbnail + '")' : 'url("/static/images/background_add_summoner.jpg")'
                                                    }}>
                                                        <div className={classes.text}>
                                                            <Typography variant='body1'
                                                                        color='textSecondary'>{t.name}</Typography>
                                                            <Typography variant='body2'
                                                                        color='textPrimary'>{moment(t.competitionDate.startAt).locale('vi').format("DD/MM/YYYY")}</Typography>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={classes.activitiLeft}>
                            <div className={classes.title}>
                                <Link routeName={"user-profile"} query={{"id": userId, tab: 'friends'}}>
                                    <Typography color={"textSecondary"} variant='body1'>
                                        BẠN BÈ
                                    </Typography>
                                </Link>
                            </div>
                            <div className={classes.content}>
                                <ListAvatarUser avatarSize={42}
                                                participationType='user'
                                                slotUser={10}
                                                userId={userId}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.matchHistory}>
                        <div className={classes.title}>
                            <Link routeName={"user-profile"} query={{"id": userId, tab: 'friends'}}>
                                <Typography color={"textSecondary"} variant='body1'>
                                    HOẠT ĐỘNG
                                </Typography>
                            </Link>
                        </div>
                        <div className={classes.content}>
                            {
                                resultMatchs.map((result, key) => {
                                    const {tournamentInfo, matchInfo} = result;
                                    return (
                                        <Card key={key} className={classes.match}>
                                            <div className={classes.matchHeader}>
                                                <AvatarT alt={fullName}
                                                         letterAvatar={generateLetterAvatar(fullName)}
                                                         avatar={avatar}
                                                         className={classes.avatar}
                                                />
                                                <div className={classes.matchHeaderTitle}>
                                                    <Typography variant='body1'>
                                                        <Typography component='span' variant='body1'
                                                                    color='textSecondary'
                                                                    className={classes.name}>
                                                            {fullName}&nbsp;
                                                        </Typography>
                                                        <Typography component='span' variant='body1'
                                                                    color='textPrimary'>
                                                            thi đấu trong giải&nbsp;
                                                        </Typography>
                                                        <Link routeName={"tournament-detail"}
                                                              query={{"id": tournamentInfo.id}}>
                                                            <Typography component='span' variant='body1'
                                                                        color='textSecondary'
                                                                        className={classes.name}>
                                                                {tournamentInfo.name}
                                                            </Typography>
                                                        </Link>
                                                    </Typography>
                                                    <Typography variant='body2' color='textPrimary'>
                                                        {convertTournamentDaysAround(matchInfo.startAt)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div>
                                                {/*<ResultMatch result={result} userId={userId}/>*/}
                                            </div>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

TapOverviewOfUser.defaultProps = {}
TapOverviewOfUser.propTypes = {
    userProfile: PropTypes.object,
}
export default withStyles(styles)(TapOverviewOfUser);
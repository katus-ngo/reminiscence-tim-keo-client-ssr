import React from 'react';
import {injectIntl} from 'react-intl';
import moment from 'moment';
import 'moment/locale/vi';
import ConvertRank from 'app/components/common/convertRank';
import RatingCustom from "/app/components/common/ratingCustom";
import {
    LocalOffer,
    DateRange,
    LocationOn,
} from '@material-ui/icons';
import {
    IconHandShake,
    IconVersusGame,
    IconRank,
} from 'app/components/icon'
import {
    withStyles,
    Container,
    Typography,
    Card,
    Grid,
    CardActionArea,
    CardContent,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
    Divider,
    Avatar
} from "@material-ui/core";
import dataGamesChallenge from './dataGamesChallenge';
import PropTypes from "prop-types";

const stylesChallengItem = theme => {
    return {
        challengeCard: {
            backgroundSize: 'cover',
            background: 'url(static/images/home/demacia-01.jpg) no-repeat',
            position: 'relative',
            '&:before': {
                content: '""',
                background: 'rgba(0, 0, 0, 0.7)',
                width: '100%',
                position: 'absolute',
                height: '100%',
            },
            '&:hover': {
                boxShadow: '0px 1px 16px #e4ff24'
            },
            transition: 'all 0.3s'
        },
        top: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        statusChallenge: {
            fontSize: '12px',
            color: '#a4a4a4',
            textAlign: 'center',
            padding: '1rem 0'
        },
        whiteColor: {
            color: 'white'
        },
        nameTeam: {
            color: '#e64a19',
            fontSize: '20px',
            marginLeft: '10px'
        },
    }
};

class ChallengItems extends React.Component {
    render() {
        const {
            classes,
            challenges,
            gameId,
            kind
        } = this.props;
        return (
            <Grid spacing={3} container>
                {
                    challenges.map((challenge, key) => {
                        const {rate,rank,team,avatar} = challenge;
                        const time = moment(challenge.time).locale('vi').format("HH:mm ddd DD-MM-YYYY");
                        const betting = this.props.intl.formatNumber(challenge.betting, {maximumFractionDigits: 0});
                        const mode = challenge.mode + 'v' + challenge.mode;
                        const comKind = kind === 1 ? 'Online' : 'Offline';
                        const address = challenge.address ? challenge.address : null;
                        const status = challenge.status ? ('Có ' + challenge.status + ' đối gửi yêu cầu') : 'Chưa có đối gửi yêu cầu';
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                                <Card className={classes.challengeCard} raised>
                                    <CardActionArea>
                                        <CardContent>
                                            <div className={classes.top}>
                                                <div style={{display: 'flex', alignItems:'center'}}>
                                                        <Avatar alt={team} src={avatar}/>
                                                        <Typography className={classes.nameTeam}>
                                                            {team}
                                                        </Typography>
                                                </div>
                                                <RatingCustom max={5} value={rate} color='#19e627'/>
                                            </div>
                                            <List className={classes.mid}>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <DateRange className={classes.whiteColor}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.whiteColor} primary={time}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <LocalOffer className={classes.whiteColor}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.whiteColor}
                                                                  primary={'Hình thức: ' + comKind}/>
                                                </ListItem>
                                                {
                                                    address && <ListItem>
                                                        <ListItemIcon>
                                                            < LocationOn className={classes.whiteColor}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.whiteColor} primary={address}/>
                                                    </ListItem>
                                                }
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <IconVersusGame className={classes.whiteColor}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.whiteColor}
                                                                  primary={'Thể thức: ' + mode}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <IconRank className={classes.whiteColor}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.whiteColor}
                                                                  primary={<ConvertRank gameId={gameId}
                                                                                        rankNumber={rank}
                                                                                        title='Rank'/>}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <IconHandShake className={classes.whiteColor} fontSize='large'
                                                                       translate='translate(-1089 -135)'/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.whiteColor}
                                                                  primary={'Kèo: ' + betting + ' vnđ'}/>
                                                </ListItem>
                                            </List>

                                        </CardContent>
                                        <Divider light style={{backgroundColor: '#5a5a5a'}}/>
                                        <Typography className={classes.statusChallenge}>
                                            {status}
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
}

ChallengItems.propTypes = {
    challenges: PropTypes.array,
    kind: PropTypes.number,
    gameId: PropTypes.number
};
ChallengItems = withStyles(stylesChallengItem)(injectIntl(ChallengItems));


const stylesGameChalleng = theme => {
    return {
        gameChangllenge: {
            marginTop: '70px',
        },
        gameTitle: {
            height: '60px',
            display: 'flex'
        },
        gameTitleRight: {
            width: '99%',
            backgroundColor: '#27282e',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        gameTitleLeft: {
            width: '1%',
            height: '100%',
            backgroundColor: '#e64a19'
        },
        gameName: {
            color: '#a4a4a4',
            fontSize: 24,
            textTransform: 'uppercase',
            left: '10px',
            marginLeft: '20px'
        },
        seeMore: {
            fontSize: '14px',
            color: '#5a5a5a',
            textTransform: 'lowercase',
            marginRight: '10px',
            '&:hover': {
                color: '#e64a19',
                cursor: 'pointer'
            }
        },
        challengItems: {},
        challengsOnline: {
            marginTop: '50px'
        },
        challengsOffline: {
            marginTop: '50px'
        }
    }
};

class GameChangllenge extends React.Component {
    render() {
        const {
            classes,
            gameId,
            count,
            challenges
        } = this.props;
        const gameName = (gameId === 1) ? 'liên minh huyền thoại'
            : ((gameId === 2) ? 'fifa online 4' : 'đế chế');

        return (
            <section className={classes.gameChangllenge}>
                <section className={classes.gameTitle}>
                    <section className={classes.gameTitleLeft}>
                    </section>
                    <section className={classes.gameTitleRight}>
                        <Typography noWrap className={classes.gameName}>{gameName}</Typography>
                        {/*// Comming soon*/}
                        {/*<Typography noWrap className={classes.seeMore}>{count} kèo đang chờ</Typography>*/}
                    </section>
                </section>
                <h1 style={{width: '100%', textAlign: 'left', color: "#ebeef2"}}>Sắp xuất hiện!</h1>
                {/*// Comming soon*/}
                {/*<section className={classes.challengItems}>*/}
                {/*    <section className={classes.challengsOnline}>*/}
                {/*        <ChallengItems challenges={challenges.online} kind={1} gameId={gameId}/>*/}
                {/*    </section>*/}
                {/*    <section className={classes.challengsOffline}>*/}
                {/*        <ChallengItems challenges={challenges.offline} kind={0} gameId={gameId}/>*/}
                {/*    </section>*/}
                {/*</section>*/}
            </section>
        )
    }
}


GameChangllenge.propTypes = {
    gameId: PropTypes.number,
    count: PropTypes.number,
    challenges: PropTypes.object
};
GameChangllenge = withStyles(stylesGameChalleng)(GameChangllenge);

const styles = theme => {
    return {}
};

class GamesChangllenge extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Container fixed>
                {
                    dataGamesChallenge.map((dataGameChalleng, key) => {
                        return (
                            <GameChangllenge gameId={dataGameChalleng.id}
                                             count={dataGameChalleng.count}
                                             challenges={dataGameChalleng.challenges}
                                             key={key}
                            />
                        )
                    })
                }

            </Container>
        )
    }
}

export default withStyles(styles)(GamesChangllenge)

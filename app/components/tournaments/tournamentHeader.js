import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Grid, Typography, Button, Fab,
    withStyles
} from "@material-ui/core";
import moment from "moment";
import 'moment/locale/vi';
import Countdown from 'react-countdown-now';


const styles = theme => {
    return {
        fullWidth: {
            width: '100%'
        },
        cover: {
            height: '315px',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative'
        },
        title: {
            marginTop: theme.spacing(2),
        },
        tournamentName: {
            fontSize: '2rem',
        },
        status: {
            fontSize: '12px',
            color: theme.palette.text.secondary,
            padding: '2px 4px',
            height: 'unset',
            backgroundColor: '#10baa8',
            borderRadius: '500px',
            marginLeft: theme.spacing(2)
        },
        countDown: {
            display: 'flex',
            justifyContent: 'flex-end',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                textAlign: 'center'
            }
        },
        btnCta: {
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        }
    }
};

class TournamentHeader extends Component {
    render() {
        const {
            classes,
            metaInfo,
            competitionDate
        } = this.props;
        const competitionStartAt = moment(competitionDate.startAt).locale('vi').format("HH:mm ddd DD-MM-YYYY");
        const cover = '/static/images/home/posterTLCS.png';
        return (
            <div>
                <div className={classes.cover} style={{backgroundImage: 'url(' + cover + ')'}}>
                </div>
                <div className={classes.title}>
                    <Grid spacing={3} container>
                        <Grid item xs={12} md={8} lg={8}>
                            <Typography component="h1" className={classes.tournamentName} color='textSecondary'>
                                {metaInfo.name.toLocaleUpperCase()}
                            </Typography>
                            <div>
                                <Typography component="p" color='textSecondary'>
                                    Thời gian thi đấu: <span
                                    style={{fontWeight: 900, color: '#e64a19'}}>{competitionStartAt}</span> - Được tài
                                    trợ bởi: <span style={{
                                    fontWeight: 900,
                                    color: '#e64a19'
                                }}>{metaInfo.host.toLocaleUpperCase()}</span>
                                    <span className={classes.status}>
                                        Sắp diễn ra
                                    </span>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className={classes.countDown}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Typography component="p" color='textSecondary' variant='h6'>
                                    <Countdown date={moment(competitionDate.startAt).valueOf()}/>
                                </Typography>
                                <Fab variant="extended" color='secondary' className={classes.btnCta}>
                                    <Typography component="p" color='textSecondary'>
                                        Đăng ký giải đấu
                                    </Typography>
                                </Fab>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }
}


TournamentHeader.propTypes = {
    registerDate: PropTypes.object,
    metaInfo: PropTypes.object,
    competitionDate: PropTypes.object,
    tournamentStatus: PropTypes.string,
};
export default withStyles(styles)(TournamentHeader);
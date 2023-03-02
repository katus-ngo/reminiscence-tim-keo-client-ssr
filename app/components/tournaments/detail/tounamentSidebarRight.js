import React, {Component} from 'react';
import {
    Chip,
    Fab,
    Card,
    withStyles, Typography, ListItem, List, Avatar
} from "@material-ui/core";
import {IconTrophy} from "app/components/icon";
import PropTypes from "prop-types";
import {injectIntl} from 'react-intl';
import {generateLetterAvatar} from "../../../utils/generateLetterAvatar.helper";
import {generateImageUrl} from "../../../utils/ImageHelper";
import Link from 'app/utils/Link'
import moment from 'moment'

const styles = theme => {
    return {
        fullWidth: {},
        countParticipationCard: {
            backgroundColor: theme.palette.surface.dark
        },
        countParticipationCardContent: {
            backgroundColor: theme.palette.surface.dark,
            display: 'flex',
            justifyContent: 'space-around',
            '&>div': {
                textAlign: 'center',
            },
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        firstChild: {
            marginBottom: theme.spacing(1)
        },
        prizeItem: {
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'space-around'
            }
        },
        iconTrophy: {
            marginRight: theme.spacing(1)
        },
        firstAchievements: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.achievements.first,
        },
        secondAchievements: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.achievements.second,
        },
        thridAchievements: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.achievements.third,
        },
        prize: {
            marginTop: theme.spacing(4)
        },
        participation: {
            marginTop: theme.spacing(4)
        },
        paper: {
            backgroundColor: 'unset',
            marginTop: theme.spacing(1),
        },
        chip: {
            margin: theme.spacing(1),
            backgroundColor: 'transparent',
            color: '#ebeef2',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#27282e',
            },
        },
        fab: {
            backgroundColor: theme.palette.background.dark,
            boxShadow: 'unset',
            '&:hover': {
                backgroundColor: 'unset',
                boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
            }
        },
        more: {},
        avatar: {
            backgroundColor: theme.palette.primary.main
        },
    }
};

class TounamentSidebarRight extends Component {
    render() {
        const {
            classes, prize,
            tournamentParticipations,
            tournamentParticipationType,
        } = this.props;
        const firstPlacePrize = prize.firstPlacePrize ? this.props.intl.formatNumber(prize.firstPlacePrize, {maximumFractionDigits: 0}) + ' VNĐ' : 'Đang cập nhật';
        const secondPlacePrize = prize.secondPlacePrize ? this.props.intl.formatNumber(prize.secondPlacePrize, {maximumFractionDigits: 0}) + ' VNĐ' : 'Đang cập nhật';
        const thridPlacePrize = prize.thridPlacePrize ? this.props.intl.formatNumber(prize.thridPlacePrize, {maximumFractionDigits: 0}) + ' VNĐ' : 'Đang cập nhật';
        const tournamentParticipationsConfirmed = tournamentParticipations.filter(tournamentParticipation => tournamentParticipation.confirmed === true);
        const tournamentParticipationsConfirmedShort = tournamentParticipationsConfirmed.slice(0, 5);
        const more = tournamentParticipationsConfirmed.length - tournamentParticipationsConfirmedShort.length;
        return (
            <div className={classes.fullWidth}>
                <Card raised className={classes.countParticipationCard}>
                    <div className={classes.countParticipationCardContent}>
                        <div>
                            <Typography className={classes.firstChild} component="p" color='textPrimary'
                                        variant='body2'>
                                Đăng ký
                            </Typography>
                            <Typography component="p" color='textSecondary'>
                                5
                            </Typography>
                        </div>
                        <div>
                            <Typography className={classes.firstChild} component="p" color='textPrimary'
                                        variant='body2'>
                                Xác nhận
                            </Typography>
                            <Typography component="p" color='textSecondary'>
                                0
                            </Typography>
                        </div>
                        <div>
                            <Typography className={classes.firstChild} component="p" color='textPrimary'
                                        variant='body2'>
                                Còn trống
                            </Typography>
                            <Typography component="p" color='textSecondary'>
                                64
                            </Typography>
                        </div>
                    </div>
                </Card>
                <div className={classes.prize}>
                    <Typography component="h6" color='textSecondary' variant='h6' className={classes.fontWeightBold}>
                        Giải thưởng
                    </Typography>
                    <List>
                        <ListItem className={classes.prizeItem}>
                            <Typography className={classes.firstAchievements} component="p">
                                <IconTrophy className={classes.iconTrophy}/> 1st
                            </Typography>
                            <Typography color='textPrimary' component="p">
                                {firstPlacePrize}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.prizeItem}>
                            <Typography className={classes.secondAchievements} component="p">
                                <IconTrophy className={classes.iconTrophy}/> 2rd
                            </Typography>
                            <Typography color='textPrimary' component="p">
                                {secondPlacePrize}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.prizeItem}>
                            <Typography className={classes.thridAchievements} component="p">
                                <IconTrophy className={classes.iconTrophy}/> 3rd
                            </Typography>
                            <Typography color='textPrimary' component="p">
                                {thridPlacePrize}
                            </Typography>
                        </ListItem>
                    </List>
                </div>
                <div className={classes.participation}>
                    <Typography component="h6" color='textSecondary' variant='h6' className={classes.fontWeightBold}>
                        Tham gia
                    </Typography>
                    <div>
                        {
                            tournamentParticipationsConfirmedShort.sort((a, b) => {
                                a = moment(a.confirmedAt).valueOf();
                                b = moment(b.confirmedAt).valueOf();
                                return (a - b)
                            }).map((tournamentParticipationConfirmed, key) => {
                                if (tournamentParticipationType === 'TEAM') {
                                    const teamConfirmed = tournamentParticipationConfirmed.team;
                                    const {slug, shortName, longName, avatar} = teamConfirmed;
                                    const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
                                    const avt = avatar ? (<Avatar alt={longName} src={generateImageUrl(avatar.original)}
                                                                  className={classes.avatar}/>) :
                                        <Avatar className={classes.avatar} alt={longName}>{letterAvatar} </Avatar>;
                                    return (
                                        <Link routeName={"team-profile"} query={{"slug": slug}} key={key}>
                                            <Chip label={shortName + ' | ' + longName}
                                                  className={classes.chip}
                                                  avatar={avt}
                                            />
                                        </Link>
                                    )
                                }
                            })
                        }
                        {
                            more > 5 && <Link>
                                <Fab aria-label="more" className={classes.fab}>
                                    <Typography color='textSecondary' component="p" variant='h6'>
                                        +{more}
                                    </Typography>
                                </Fab>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

TounamentSidebarRight.propTypes = {
    prize: PropTypes.object,
    tournamentParticipations: PropTypes.array,
    tournamentParticipationType: PropTypes.string,
};
export default withStyles(styles)(injectIntl(TounamentSidebarRight));
import React from "react";
import {
    Button,
    Typography,
    Grid,
    Avatar,
    Card,
    CardContent,
    withStyles,
    CardActionArea,
    CardActions
} from "@material-ui/core";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {generateLetterAvatar} from "../../utils/generateLetterAvatar.helper";
import {generateImageUrl} from "../../utils/ImageHelper";
import Link from "../../utils/Link";
import {notificationService} from "../../services";
import {connect} from "react-redux";
import {confirmTeamParticipation} from "../../containers/teamProfile/actions";

const styles = theme => ({
    card: {
        borderRadius: 0,
        boxShadow: theme.shadows[0],
    },
    cardActionArea: {
        backgroundColor: theme.palette.primary.backgroundCard,
        display: 'inline-flex',
        justifyContent: 'flex-start',
        paddingLeft: theme.spacing(2),
        minHeight: 100
    },
    unread: {
        borderLeft: '2px solid',
        borderColor: theme.palette.primary.activeDark
    },
    avatar: {
        width: 50,
        height: 50
    },
    a: {
        textDecoration: 'none'
    }
});

class NotificationItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: this.props.notification
        }
    }

    getTitleConfirmationResult = (confirmationResult) => {
        return confirmationResult === 'ACCEPTED' ? 'đồng ý' : 'từ chối';
    };

    confirmNotification = (e, confirmationResult = 'ACCEPTED') => {
        e.preventDefault();
        e.stopPropagation();
        const {notification} = this.state;

        const request = notification['teamParticipationRequest'];
        const team = request['team'];

        notificationService.read(this.props.notification.id).then(() => {
            this.props.confirmTeamParticipationRequest(request.id, confirmationResult, team.id, team.slug);
        });
        this.setState({
            notification: {...this.state.notification, confirmationResult: confirmationResult, confirmedAt: new Date()}
        })
    };

    renderNotificationContent(notification, classes) {
        let content = {
            link: {
                routeName: '',
                query: {}
            },
            avatar: '',
            message: '',
            confirmation: ''
        };

        const request = notification['teamParticipationRequest'] || {};
        const team = request['team'] || {};
        const teamName = team['longName'] || '';
        const receiver = request['receiver'] || {};

        switch (notification['notificationType']) {
            case "TEAM_PARTICIPATION_REQUEST":
                content.link['routeName'] = 'team-profile';
                content.link['query'] = {slug: team['slug']};
                content.avatar = team['avatar'] ?
                    <Avatar className={classes.avatar} src={generateImageUrl(team['avatar']['original'])}/> :
                    <Avatar className={classes.avatar}>{generateLetterAvatar(teamName)}</Avatar>;

                if ( request['participationRequestType'] === "MEMBER_INVITATION") {
                    if (!!notification['confirmedAt']) {
                        content.message = <Typography
                            color={"textPrimary"}
                            display='block'>Bạn đã {this.getTitleConfirmationResult(notification['confirmationResult'])} tham gia đội <strong>{teamName}</strong>
                        </Typography>;
                    } else {
                        content.message = <Typography
                            color={"textPrimary"}
                            display='block'>Bạn nhận được lời mời tham gia đội <strong>{teamName}</strong>
                        </Typography>;

                        content.confirmation = (
                            <CardActions color='textPrimary'>
                                <Button component="div" size="small" color='secondary' variant='contained' onClick={e => this.confirmNotification(e, 'ACCEPTED')}>Chấp nhận</Button>
                                <Button component="div" size="small" color='primary' variant='outlined' onClick={e => this.confirmNotification(e, 'DECLINED')}>Từ chối</Button>
                            </CardActions>
                        );
                    }
                }
                break;

            case 'TEAM_PARTICIPATION_REQUEST_RESULT':
                content.link['routeName'] = 'team-profile';
                content.link['query'] = {slug: team['slug']};

                content.avatar = team['avatar'] ?
                    <Avatar className={classes.avatar} src={generateImageUrl(team['avatar']['original'])}/> :
                    <Avatar className={classes.avatar}>{generateLetterAvatar(teamName)}</Avatar>;

                content.message = <Typography
                    color={"textPrimary"}
                    display='block'><strong>{receiver['fullName']}</strong> đã đồng ý tham gia đội <strong>{teamName}</strong>
                </Typography>;
                break;
            default:
                break;
        }

        return content;
    }

    handleItemClick = () => {
        notificationService.read(this.props.notification.id);
    };

    render() {
        const {classes} = this.props;
        const {notification} = this.state;
        const cardActionArea = classnames(classes.cardActionArea,
            {[classes.unread]: !notification['readAt']});

        const content = this.renderNotificationContent(notification, classes);
        return (
            <Grid xs={12} item>
                <Card raised className={classes.card}>
                    <Link routeName={content.link.routeName} query={content.link.query}>
                        <a className={classes.a}>
                            <CardActionArea className={cardActionArea} onClick={this.handleItemClick}>
                                {content.avatar}
                                <CardContent>
                                    {content.message}
                                    {content.confirmation}
                                </CardContent>
                            </CardActionArea>
                        </a>
                    </Link>
                </Card>
            </Grid>
        );
    }
}

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    confirmTeamParticipationRequest: (id, confirmationResult, teamId, slug) => dispatch(confirmTeamParticipation(id, confirmationResult, teamId, slug))
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(NotificationItem));
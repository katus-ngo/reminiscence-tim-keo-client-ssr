import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {connect} from "react-redux";
import {compose} from 'recompose'
import {
    Container,
    Typography,
    Toolbar,
    IconButton,
    Badge,
    AppBar,
    Avatar,
    Fab,
} from '@material-ui/core/index';
import {
    openDesktopMenu
} from 'app/containers/layout/actions'

import {withStyles} from '@material-ui/core/styles/index';
import DesktopMenu from "./desktopMenu";
import {openDialogSignIn} from "app/containers/sign-in-sign-up-dialog/actions";
import {createStructuredSelector} from "reselect";
import Link from 'app/utils/Link';
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import PagedNotification from "../../notification/PagedNotification";
import {notificationService} from "../../../services";
import {viewAllNotifications} from "../../../containers/notification/actions";
import {generateLetterAvatar} from "app/utils/generateLetterAvatar.helper";
import {generateImageUrl} from "../../../utils/ImageHelper";

const styles = theme => {
    return {
        appBar: {
            height: '60px',
            backgroundColor: '#0f131f',
            boxShadow: '0 3px 6px black',
        },
        logo: {
            fontFamily: [
                'Vehicle Breaks Down'
            ].join(','),
            color: '#e64a19',
            fontSize: 40
        },
        link: {
            textDecoration: 'none',
            color: '#a4a4a4',
            padding: '0 15px'
        },
        linkActive: {
            color: 'white',
            textDecoration: 'none',
            padding: '0 15px'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            height: '60px',
            padding: 'unset'
        },
        sectionDesktop: {
            display: 'flex',
            alignItems: 'center',
        },
        avatar: {
            margin: 10,
            width: 44,
            height: 44,
            color: '#fff',
            backgroundColor: '#e64a19',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#a13311'
            },
        },
        gameLogo: {
            position: 'absolute',

        },
        advantages: {
            position: 'absolute',

        },
        champion: {
            position: 'absolute',
            width: '70%',
            height: '557px',
            zIndex: '4'
        },
        // fab: {
        //     backgroundColor: '#e64a19',
        //     color: 'white',
        //     '&:hover': {
        //         backgroundColor: '#a13311'
        //     }
        // }
    }
};

class DesktopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickAvatar = this.handleClickAvatar.bind(this);
        this.openDialogSignIn = this.openDialogSignIn.bind(this);
        this.toggleNotificationPopper = this.toggleNotificationPopper.bind(this);
        this.state = {
            openNtfPopperElm: null,
            notifications: [],
            ntfLoading: false,
        };
    }

    handleClickAvatar(e) {
        this.props.openDesktopMenu(e.currentTarget);
    }

    openDialogSignIn() {
        this.props.openDialogSignIn(true)
    }

    toggleNotificationPopper(e) {
        let {openNtfPopperElm} = this.state;
        openNtfPopperElm = openNtfPopperElm ? null : e.currentTarget;
        this.setState({openNtfPopperElm});
        if (!!openNtfPopperElm) {
            this.props.viewAllNotifications();

            this.setState({
                ntfLoading: true
            });

            notificationService.fetch({}).then((page) => {
                this.setState({notifications: page.content, ntfLoading: false})
            }).catch(() => {
                this.setState({ntfLoading: false});
            })
        }

    }

    render() {
        const {classes, profile, currentRouteName, unviewedCount} = this.props;
        const {openNtfPopperElm, notifications, ntfLoading}  =  this.state;
        let {fullName, avatar} = profile || {};
        let letterAvatar = fullName ? generateLetterAvatar(fullName).toLocaleUpperCase() : '';

        return (
            <AppBar position="static" classes={{
                root: classes.appBar
            }}>
                <Container fixed>
                    <Toolbar className={classes.toolbar} variant='dense'>
                        <Link routeName={"home"}>
                            <a style={{height: '100%'}}><img alt='TimKeoVN' src='/static/images/logo.png' style={{height: "inherit"}} /></a>
                        </Link>
                        <div className={classes.sectionDesktop}>
                            <Link routeName={"home"}>
                                <a className={currentRouteName === 'home' ? classes.linkActive : classes.link}>
                                    <Typography>Trang chủ</Typography></a>
                            </Link>
                            {
                                profile &&
                                <Link routeName={"user-profile"} query={{"slug": profile.slug, tab: 'teams'}}>
                                    <a className={currentRouteName === 'user-profile' ? classes.linkActive : classes.link}>
                                        <Typography>Đội của tôi</Typography></a>
                                </Link>
                            }
                            <Link routeName={"tournament-detail"} query={{"id": 17}}>
                                <a className={currentRouteName === 'tournament' ? classes.linkActive : classes.link}>
                                    <Typography>Giải đấu</Typography></a>
                            </Link>
                            <Link routeName={"create-tournament"}>
                                <a className={currentRouteName === 'create-tournament' ? classes.linkActive : classes.link}>
                                    <Typography>Tạo giải đấu</Typography></a>
                            </Link>
                            {
                                !profile &&
                                <Fab variant="extended" className={classes.fab} color='primary'
                                     onClick={this.openDialogSignIn}>
                                    Đăng nhập
                                </Fab>
                            }
                            {
                                profile &&
                                <IconButton color="inherit" onClick={this.toggleNotificationPopper}>
                                    <Badge badgeContent={unviewedCount || null} color="secondary">
                                        <NotificationsIcon/>
                                    </Badge>
                                </IconButton>
                            }
                            {
                                profile && avatar && <Avatar alt={fullName} src={generateImageUrl(avatar.original)}
                                                             className={classes.avatar}
                                                             onClick={this.handleClickAvatar}/>
                            }
                            {
                                profile && !avatar && <Avatar className={classes.avatar}
                                                              onClick={this.handleClickAvatar}
                                >{letterAvatar}</Avatar>
                            }
                            <DesktopMenu/>
                        </div>
                    </Toolbar>
                    <Popper id={!!openNtfPopperElm ? 'notification-popper' : undefined} open={!!openNtfPopperElm} anchorEl={openNtfPopperElm} placement="bottom-end" transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <div style={{background: 'rgb(17, 18, 23)'}}>
                                    <PagedNotification loading={ntfLoading} notifications={notifications} />
                                </div>
                            </Fade>
                        )}
                    </Popper>
                </Container>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.auth.profile,
    currentRouteName: state.routerProvider.currentRouteName,
    unviewedCount: state.notification.unviewedCount
});
const mapDispatchToProps = dispatch => ({
    openDesktopMenu: (anchorEl) => dispatch(openDesktopMenu(anchorEl)),
    openDialogSignIn: (open) => dispatch(openDialogSignIn(open)),
    viewAllNotifications: () => dispatch(viewAllNotifications())
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(DesktopHeader);

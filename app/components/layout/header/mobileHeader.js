import React from 'react';
import {
    AppBar, Badge,
    IconButton,
    Toolbar,
    withStyles,
} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Search from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import MobileMenu from "./mobileMenu";
import {openMobileMenu} from "app/containers/layout/actions";
import {compose} from "recompose";
import {connect} from "react-redux";
import {
    IconLogout,
    IconHandShake,
    IconHandShakePlus,
    IconTrophy
} from 'app/components/icon';
import Link from "app/utils/Link";
import {createStructuredSelector} from "reselect";
import {viewAllNotifications} from "../../../containers/notification/actions";

const styles = theme => {
    return {
        appBar: {
            height: '60px',
            backgroundColor: '#212121'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            height: '60px',
            padding: 'unset'
        },
        iconButton: {
            color: '#a4a4a4'
        },
    }
};

class MobileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.openMobileMenu = this.openMobileMenu.bind(this);
    }

    openMobileMenu = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.props.openMobileMenu(true);
    };

    render() {
        const {classes, unviewedCount, viewAllNotifications} = this.props;
        return (<AppBar position="sticky" classes={{
                root: classes.appBar
            }}>
                <Toolbar className={classes.toolbar} variant='dense'>
                    <Link routeName={"home"}>
                        <IconButton className={classes.iconButton}>
                            <Home/>
                        </IconButton>
                    </Link>
                    <Link routeName={"notifications"}>
                        <IconButton color="inherit" className={classes.iconButton} onClick={viewAllNotifications}>
                            <Badge badgeContent={unviewedCount || null} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Link>
                    <Link routeName={"tournament-detail"} query={{"id": 1}}>
                        <IconButton className={classes.iconButton}>
                            <IconTrophy/>
                        </IconButton>
                    </Link>
                    <IconButton className={classes.iconButton}>
                        <Search/>
                    </IconButton>
                    <IconButton className={classes.iconButton} onClick={this.openMobileMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <MobileMenu/>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    unviewedCount: state => state.notification.unviewedCount
});

const mapDispatchToProps = dispatch => ({
    openMobileMenu: (open) => dispatch(openMobileMenu(open)),
    viewAllNotifications: () => dispatch(viewAllNotifications())
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps),
)(MobileHeader);


import React, {Component} from 'react';
import {
    withStyles
} from "@material-ui/core";
import SideBarUserInfo from './sidebarUserInfo';
import TabUserInfo from './tabUserInfo';
import PropTypes from "prop-types";

const styles = theme => {
    return {
        fullWidth: {
            width: '100%',
            display: 'flex',
            marginTop: theme.spacing(1),
            float:'left',
            [theme.breakpoints.down('sm')]: {
                display: 'block'
            },
        },
        intro: {
            width: '275px',
            flex: '0 0 auto',
            backgroundColor: theme.palette.surface.dark,
            marginRight: theme.spacing(1),
            padding: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                width: 'auto',
                marginRight: 'unset',
            }
        },
        tabInfo: {
            flex: '1 1 auto',
            backgroundColor: theme.palette.surface.dark,
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            position: 'relative',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                padding: 'unset',
                marginTop: theme.spacing(4)
            }
        },
    }
};

class DesktopUserInfo extends Component {
    render() {
        const {classes, userProfile, isOwner} = this.props;
        return (
            <div className={classes.fullWidth}>
                <div className={classes.intro}>
                    <SideBarUserInfo userProfile={userProfile} isOwner={isOwner}/>
                </div>
                <div className={classes.tabInfo}>
                    <TabUserInfo userProfile={userProfile} isOwner={isOwner}/>
                </div>
            </div>
        );
    }
}

DesktopUserInfo.propTypes = {
    userProfile: PropTypes.object,
    isOwner: PropTypes.bool,
};

export default withStyles(styles)(DesktopUserInfo);
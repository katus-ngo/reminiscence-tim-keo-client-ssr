import React, {Component} from 'react';
import {
    Tab,
    Tabs,
    withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import TapTeamOfUser from "./tabTeamsOfUser";
import TapTournamentOfUser from "app/components/userPofile/userInfo/tabUserInfo/tapTournamentOfUser";
import TapFriendsOfUser from "app/components/userPofile/userInfo/tabUserInfo/tapFriendsOfUser";
import TapOverviewOfUser from "app/components/userPofile/userInfo/tabUserInfo/tapOverviewOfUser";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {
    changeTab
} from 'app/containers/userProfile/actions'

const CssTabs = withStyles({
    root: {},
    indicator: {
        backgroundColor: '#a4a4a4',
    },
})(Tabs);

const CssTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        marginRight: theme.spacing(2),
        color: '#a4a4a4',
        '&:hover': {
            color: 'white',
            opacity: 1,
        },
        '&$selected': {
            color: 'white',
            fontWeight: 'bold',
        },
        '&:focus': {
            color: 'white',
        },
    },
    selected: {},
}))(props => <Tab {...props} />);

const styles = theme => {
    return {
        tabInfo: {
            flex: '1 1 auto',
            backgroundColor: '#1b1c23',
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            position: 'relative'
        },
        tabItem: {
            marginTop: theme.spacing(3)
        },
        more: {
            position: 'absolute',
            right: 0,
            color: '#a4a4a4',
            zIndex: 1
        }
    }
};

const tabs = [
    {
        name: 'overview',
        title: 'Tổng quan'
    },
    {
        name: 'teams',
        title: 'Đội'
    },
    {
        name: 'friends',
        title: 'Bạn bè'
    },
    {
        name: 'tournaments',
        title: 'Giải đấu'
    },
];


class TabUserInfo extends Component {
    constructor(props) {
        super(props);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    handleChangeTab(e, value) {
        this.props.changeTab(tabs[value].name);
    }

    getTabIndex = tabName => {
        let foundIndex = tabs.findIndex(tab => tab.name === tabName);

        return foundIndex >= 0 ? foundIndex : 0;
    };

    render() {
        const {classes, userProfile, tabName, isOwner} = this.props;

        let currentTab = tabs[this.getTabIndex(tabName)];

        return (
            <div className={classes.tabInfo}>
                <CssTabs value={this.getTabIndex(tabName)} onChange={this.handleChangeTab}>
                    {tabs.map((tab, index) => <CssTab key={index} label={tab.title} />)}
                </CssTabs>
                {currentTab.name === 'overview' && <div className={classes.tabItem}>
                    <TapOverviewOfUser userProfile={userProfile}/>
                </div>}
                {currentTab.name === 'teams' &&
                <div className={classes.tabItem}><TapTeamOfUser userProfile={userProfile} teams={userProfile['teams']} isOwner={isOwner}/></div>}
                {currentTab.name === 'friends' && <div className={classes.tabItem}>
                    <TapFriendsOfUser userProfile={userProfile} isOwner={isOwner}/>
                </div>}
                {currentTab.name === 'tournaments' &&
                <div className={classes.tabItem}><TapTournamentOfUser isOwner={isOwner}/></div>}
            </div>
        );
    }
}

TabUserInfo.propTypes = {
    userProfile: PropTypes.object,
    isOwner: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    tabName: state => state.userProfileData.tabName,
});
const mapDispatchToProps = dispatch => ({
    changeTab: (tabName) => dispatch(changeTab(tabName))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TabUserInfo));
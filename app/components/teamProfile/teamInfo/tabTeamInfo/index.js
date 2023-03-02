import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,
    Tab,
    Tabs,
    withStyles
} from "@material-ui/core";
import DesktopTapTeamMember from './tapTeamMember';
import {
    MoreVert,
} from "@material-ui/icons";
import PopupMenu from "app/components/common/popupMenu";
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {changeTab} from "app/containers/teamProfile/actions";

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
            color: theme.palette.text.secondary,
            opacity: 1,
        },
        '&$selected': {
            color: theme.palette.text.secondary,
            fontWeight: 'bold',
        },
        '&:focus': {
            color: theme.palette.text.secondary,
        },
    },
    selected: {},
}))(props => <Tab {...props} />);

const styles = theme => {
    return {
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

class TabInfoTeam extends Component {
    constructor(props) {
        super(props);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleClickMore = this.handleClickMore.bind(this);
        this.handleClosePopupMenu = this.handleClosePopupMenu.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.state = {
            anchorEl:null
        }
    }

    handleChangeTab(e, value) {
        this.props.changeTab(value);
    }

    handleClickMore(e) {
        this.setState({anchorEl: e.currentTarget})
    }
    handleClosePopupMenu(){
        this.setState({anchorEl:null})
    }
    handleClickItem(value){
        if (value === 'leave') {
            this.props.enqueueSnackbar({
                message: 'Chức năng tạm thời chưa hoạt động!',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'warning',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 2000
                },
            })
        }
    }
    render() {
        const options = [
            {
                value: 'leave',
                label: 'Rời đội'
            }
        ];
        const {classes, teamInfo, tabIndex} = this.props;
        const {anchorEl} = this.state;
        const {teamParticipations} = teamInfo;
        return (
            <div>
                <IconButton aria-label="More" className={classes.more} onClick={this.handleClickMore}>
                    <MoreVert/>
                </IconButton>
                <PopupMenu options={options} anchorEl={anchorEl}
                           handleClose={this.handleClosePopupMenu}
                           handleClickItem={this.handleClickItem}
                           backGroundColorMenu='#27282e'
                           minWidthMenu='100px'
                           fontSize='12px'
                           colorItem='#ebeef2'/>
                <CssTabs value={tabIndex} onChange={this.handleChangeTab}>
                    <CssTab label="Đánh giá"/>
                    <CssTab label="Thành viên"/>
                    <CssTab label="Kèo đấu"/>
                </CssTabs>
                {tabIndex === 0 && <div>
                    <p style={{fontSize: '24px', color:'#ebeef2', textAlign: 'center'}}>Coming soon!</p>
                </div>}
                {tabIndex === 1 && <div className={classes.tabItem}><DesktopTapTeamMember teamParticipations={teamParticipations}/></div>}
                {tabIndex === 2 && <div>
                    <p style={{fontSize: '24px', color:'#ebeef2', textAlign: 'center'}}>Coming soon!</p>
                </div>}
            </div>
        )
    }
}

TabInfoTeam.propTypes = {
    teamInfo: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    tabIndex: state => state.teamProfileData.tabIndex,
});
const mapDispatchToProps = dispatch => ({
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
    changeTab: (tabIndex) => dispatch(changeTab(tabIndex))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TabInfoTeam));


import React, {Component} from 'react';
import {
    Grid,
    withStyles,
    Typography,
    IconButton,
    Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import PopupMenu from 'app/components/common/popupMenu'
import {MoreVert, PersonAdd} from "@material-ui/icons";
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {openDialogCreateTeam} from "app/containers/createTeam/actions";
import BriefInfoParticipation from 'app/components/common/BriefInfoParticipation'
import clsx from "clsx";
import {getProfileMe} from "../../../../containers/AuthProvider/actions";
import {openDialogMemberInvitation} from "../../../../containers/userProfile/actions";

const styles = theme => {
    return {
        teamContainer: {
            [theme.breakpoints.up('lg')]: {
                paddingRight: theme.spacing(0),
                paddingLeft: theme.spacing(0),
            }
        },
        team: {
            position: 'relative'
        },
        more: {
            position: 'absolute',
            right: 0,
            top: 0,
            color: '#a4a4a4',
            paddingLeft: 'unset',
            paddingRight: 'unset',
            paddingTop: '2px',
            zIndex: 1,
            '&:hover': {
                opacity: 0.6,
                backgroundColor: 'unset'
            }
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
        button: {
            backgroundColor: '#00af00',
            color: 'white',
            fontSize: '0.9rem',
            '&:hover': {
                backgroundColor: '#007a00'
            }
        },
    }
};

class TabTeamsOfUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleClickMore = this.handleClickMore.bind(this);
        this.handleClosePopupMenu = this.handleClosePopupMenu.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    handleClickMore(e) {
        this.setState({anchorEl: e.currentTarget})
    }

    handleClosePopupMenu() {
        this.setState({anchorEl: null})
    }

    handleClickItem(value) {
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

    handleCreateTeam = () => {
        this.props.openDialogCreateTeam(true);
    };

    handleOpenDialogMemberInvitation=()=> {
        this.props.getProfileMe();
        this.props.openDialogMemberInvitation(true)
    };

    render() {
        const ownerOptions = [
            {
                value: 'leave',
                label: 'Rời đội'
            }
        ];
        const guestOptions = [
            {
                value: 'join',
                label: 'Tham gia đội'
            }
        ];
        const {classes, isOwner, teams,userProfile} = this.props;
        const {anchorEl} = this.state;

        if (!teams || teams.length === 0) {
            if (isOwner) {
                return (
                    <div style={{textAlign: 'center'}}>
                        <Typography color='textPrimary' variant='h6'>Bạn chưa có đội!</Typography>
                        <Button color="primary" className={classes.btnTextCreateTeam} onClick={this.handleCreateTeam}>
                            Tạo đội mới!
                        </Button>
                    </div>
                )
            }
            return(
                <div style={{textAlign: 'center'}}>
                    <Typography color='textPrimary' variant='h6'>{userProfile.fullName} chưa có đội!</Typography>
                    <Button color="primary" className={classes.btnTextCreateTeam} onClick={this.handleOpenDialogMemberInvitation}>
                        <PersonAdd className={clsx(classes.leftIcon, classes.iconSmall)}/>
                        Mời tham gia đội
                    </Button>
                </div>
            )
        }

        return (
            <div>
                <Grid spacing={1} container className={classes.teamContainer}>
                    {
                        teams.map((team, key) => {
                                return (
                                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={key}>
                                        <div className={classes.team}>
                                            <IconButton aria-label="More" className={classes.more}
                                                        onClick={this.handleClickMore}>
                                                <MoreVert/>
                                            </IconButton>
                                            <PopupMenu options={isOwner ? ownerOptions : guestOptions}
                                                       anchorEl={anchorEl}
                                                       handleClose={this.handleClosePopupMenu}
                                                       handleClickItem={this.handleClickItem}
                                                       backGroundColorMenu='#27282e'
                                                       minWidthMenu='100px'
                                                       fontSize='12px'
                                                       colorItem='#ebeef2'/>
                                            <BriefInfoParticipation isOwner={isOwner} participation={team}/>
                                        </div>
                                    </Grid>
                                )
                            }
                        )
                    }
                </Grid>
            </div>
        );
    }
}

TabTeamsOfUser.propTypes = {
    teams: PropTypes.array,
    userProfile: PropTypes.object,
    isOwner: PropTypes.bool
};
const mapStateToProps = createStructuredSelector({
    // profile: state => state.auth.profile,
});
const mapDispatchToProps = dispatch => ({
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
    getProfileMe: () => dispatch(getProfileMe()),
    openDialogMemberInvitation: (open) => dispatch(openDialogMemberInvitation(open)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TabTeamsOfUser));
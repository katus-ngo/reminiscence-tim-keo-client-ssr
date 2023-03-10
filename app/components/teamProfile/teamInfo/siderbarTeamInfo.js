import {Component} from "react";
import moment from "moment";
import {
    AddCircleOutline,
    BorderColor,
    BubbleChart,
    Cake,
    Group,
    Markunread,
    PermContactCalendar, PersonAdd,
    PhoneIphone,
    Public
} from "@material-ui/icons";
import {
    Box,
    Button,
    Divider, Fab,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    Tooltip,
    ListItemText,
    Typography, withStyles, Zoom
} from "@material-ui/core";
import {IconFacebook, IconRank} from "../../icon";
import clsx from "clsx";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {openDialogSignIn} from "../../../containers/sign-in-sign-up-dialog/actions";
import {
    closeDialogAddMember, confirmTeamParticipation,
    handleChooseUserAddToTeam, memberInvitation,
    openDialogAddMember, requestToJoinTeam,
    toggleDialogUpdateInfo
} from "app/containers/teamProfile/actions";
import {enqueueSnackbar} from "../../../containers/SnackBarNotification/actions";
import {compose} from "recompose";
import {connect} from "react-redux";
import React from "react";
import SplitButton from 'app/components/common/splitButton';
import DialogAddUser from 'app/components/common/proBirdDialog';
import ContentDialogAddMember from 'app/components/teamProfile/contentDialogAddMember';
import DialogUpdateInfo from 'app/components/teamProfile/dialogUpdateInfo';

const styles = theme => {
    return {
        introTitle: {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            '& svg': {
                marginRight: theme.spacing(1),
            },
            justifyContent: 'space-between'
        },
        contactTitle: {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            '& svg': {
                marginRight: theme.spacing(1),
            },
            marginTop: theme.spacing(2)
        },
        introDescription: {
            color: '#a4a4a4',
            fontSize: '12px',
            marginTop: theme.spacing(3),
        },
        colorIcon: {
            color: '#a4a4a4'
        },
        link: {
            textDecoration: 'none'
        },
        list: {
            paddingTop: 'unset'
        },
        listItemIcon: {
            minWidth: '30px'
        },
        button: {
            backgroundColor: '#00af00',
            color: 'white',
            fontSize: '0.9rem',
            '&:hover': {
                backgroundColor: '#007a00'
            }
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
        fab: {
            maxWidth: '48%',
            width: '100%'
        },
        fabAccept: {
            backgroundColor: '#e64a19',
            color: '#ebeef2',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: '#a13311'
            }
        },
        fabDecline: {
            fontWeight: 'bold',
        }

    }
};

class SideBarInfoTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            options: ['???? g???i y??u c???u tham gia', 'Hu??? y??u c???u tham gia'],
        }
    }

    handleJoin = (isLogged) => {
        if (!isLogged) {
            const slug = this.props.teamInfo.slug;
            this.props.openDialogSignIn(true, {name: 'team-profile', pathParam: 'slug', pathVariable: slug})
        } else {
            const teamId = this.props.teamInfo.id;
            this.props.requestToJoinTeam(teamId);
        }
    };

    handleOpenDialogAddMember = () => {
        this.props.openDialogAddMember(true);
    };

    handleCloseDialogAddMember = () => {
        this.props.closeDialogAddMember(false);
        this.props.handleChooseUserAddToTeam([]);
    };

    handleAddMember = (resultChooseUser) => {
        const teamId = this.props.teamInfo.id;
        if (resultChooseUser.length > 0) {
            const receiverId = resultChooseUser[0].id;
            this.props.memberInvitation(teamId, receiverId);
        } else {
            this.props.enqueueSnackbar({
                message: 'H??y ch???n m???t ai ????!',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'warning',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 2000
                },
            });
        }
    };

    confirmTeamParticipation = (confirmationResult) => {
        const id = this.props.teamParticipationState.teamParticipationRequest.id;
        const teamId = this.props.teamInfo.id;
        const slug = this.props.teamInfo.slug;
        this.props.confirmTeamParticipation(id, confirmationResult, teamId, slug);
    };

    handleClickCancelJoinRequest = () => {
        const {selectedIndex} = this.state;
        if (selectedIndex === 0) {
            this.props.enqueueSnackbar({
                message: 'B???n ???? g???i y??u c???u tham gia!',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'info',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 2000
                },
            });
            return
        }
        this.props.enqueueSnackbar({
            message: 'Ch???c n??ng t???m th???i ch??a ho???t ?????ng',
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
    };

    onChangeSelectedIndex = (i) => {
        this.setState({i})
    };

    openDialogUpdateInfo = () => {
        this.props.toggleDialogUpdateInfo(true)
    };
    render() {
        const {teamInfo, classes, open, resultChooseUser, profile, teamParticipationState,isCaptain} = this.props;
        const {options, selectedIndex} = this.state;
        const {teamMetaInfo, createdAt} = teamInfo;
        const isLogged = !!profile;
        let {description, contactInfo, gameLevel} = teamMetaInfo;
        const facebook = contactInfo.facebook ? contactInfo.facebook : 'Ch??a c???p nh???t';
        const phoneNumber = contactInfo.phoneNumber ? contactInfo.phoneNumber : 'Ch??a c???p nh???t';
        const email = contactInfo.email ? contactInfo.email : 'Ch??a c???p nh???t';
        const fullName = contactInfo.fullName ? contactInfo.fullName : 'Ch??a c???p nh???t';
        gameLevel = gameLevel ? gameLevel : '??ang c???p nh???t';
        const createDate = moment(createdAt).locale('vi').format("DD-MM-YYYY");
        return (
            <div>
                <div className={classes.introTitle}>
                    <div className={classes.introTitle}>
                        <Public/>
                        <Typography component="p">
                            Gi???i thi???u:
                        </Typography>
                    </div>
                    {
                        isCaptain && <Tooltip title={'Ch???nh s???a th??ng tin'} TransitionComponent={Zoom}
                                              placement="top">
                            <IconButton style={{padding: 'unset'}} aria-label="edit" onClick={this.openDialogUpdateInfo}>
                                <BorderColor fontSize='small' className={classes.colorIcon}/>
                            </IconButton>
                        </Tooltip>
                    }
                </div>
                <Typography component="div" className={classes.introDescription}>
                    <Box textAlign="justify">
                        {description}
                    </Box>
                </Typography>
                <List className={classes.list}>
                    <ListItem>
                        <Tooltip title={'Ng??y th??nh l???p ?????i'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <Cake className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={createDate}/>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'T???ng th??nh vi??n'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <Group className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={'??ang c???p nh???t'}/>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'Rank trung b??nh'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <IconRank className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={gameLevel}/>
                    </ListItem>
                </List>
                <Divider style={{backgroundColor: '#707070'}}/>
                <div className={classes.contactTitle}>
                    <PermContactCalendar/>
                    <Typography component="p">
                        Li??n h???:
                    </Typography>
                </div>
                <List className={classes.list}>
                    <ListItem>
                        <Tooltip title={'Ng?????i ?????i di???n'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <BubbleChart className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={fullName}/>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'S??? ??i???n tho???i li??n h???'} TransitionComponent={Zoom}
                                 placement="top">
                            <ListItemIcon className={classes.listItemIcon}>
                                <PhoneIphone className={classes.colorIcon}/>
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={phoneNumber}/>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'Facebook'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <IconFacebook className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <a href={contactInfo.facebook} className={classes.link}>
                            <ListItemText className={classes.colorIcon} primary={facebook}/>
                        </a>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'Email li??n h???'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <Markunread className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={email}/>
                    </ListItem>
                </List>
                {(!isLogged || teamParticipationState.state === 'NONE') &&
                <Button variant="contained" size="small" className={classes.button} fullWidth
                        onClick={() => this.handleJoin(isLogged)}>
                    <AddCircleOutline className={clsx(classes.leftIcon, classes.iconSmall)}/>
                    Tham gia
                </Button>
                }
                {
                    (isLogged && teamParticipationState.state === 'ALREADY_MEMBER') &&
                    <Button variant="contained" size="small" className={classes.button} fullWidth
                            onClick={this.handleOpenDialogAddMember}
                    >
                        <PersonAdd className={clsx(classes.leftIcon, classes.iconSmall)}/>
                        Th??m th??nh vi??n
                    </Button>
                }
                {
                    (isLogged && teamParticipationState.state === 'MEMBER_INVITED') &&
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>

                        <Fab variant="extended" aria-label="Accepted" className={clsx(classes.fab, classes.fabAccept)}
                             onClick={() => this.confirmTeamParticipation('ACCEPTED')}>
                            Ch???p nh???n
                        </Fab>

                        <Fab variant="extended" aria-label="Declined" className={clsx(classes.fab, classes.fabDecline)}
                             onClick={() => this.confirmTeamParticipation('DECLINED')}>
                            T??? ch???i
                        </Fab>
                    </div>
                }
                {
                    (isLogged && teamParticipationState.state === 'MEMBER_REQUESTED') &&
                    <SplitButton options={options} handleClick={this.handleClickCancelJoinRequest}
                                 onChangeSelectedIndex={this.onChangeSelectedIndex}
                                 selectedIndex={selectedIndex} color='#ebeef2' backgroundColor='#00af00'
                                 backgroundColorHover='#007a00'/>
                }

                <DialogAddUser open={open} textBtnCancel='Hu???' textBtnOk={'Th??m'}
                               title={'Th??m th??nh vi??n'}
                               comment='Y??u c???u th??m th??nh vi??n c???n ???????c ?????i ph????ng x??c nh???n.'
                               onCancel={this.handleCloseDialogAddMember}
                               onSubmit={() => this.handleAddMember(resultChooseUser)}
                               content={<ContentDialogAddMember/>}
                               haveFooter={true}
                               haveProBird={true}
                />
                <DialogUpdateInfo teamInfo={teamInfo}/>
            </div>
        )
    }

}

SideBarInfoTeam.propTypes = {
    teamInfo: PropTypes.object,
    isCaptain: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    open: state => state.teamProfileData.openDialogAddMember,
    resultChooseUser: state => state.teamProfileData.resultChooseUser,
    teamParticipationState: state => state.teamProfileData.teamParticipationState,
    idMe: state => state.auth.idMe,
    profile: state => state.auth.profile,
});
const mapDispatchToProps = dispatch => ({
    openDialogSignIn: (open, routeName) => dispatch(openDialogSignIn(open, routeName)),
    openDialogAddMember: (open) => dispatch(openDialogAddMember(open)),
    toggleDialogUpdateInfo: (open) => dispatch(toggleDialogUpdateInfo(open)),
    closeDialogAddMember: (open) => dispatch(closeDialogAddMember(open)),
    handleChooseUserAddToTeam: (resultChoose) => dispatch(handleChooseUserAddToTeam(resultChoose)),
    requestToJoinTeam: (teamId) => dispatch(requestToJoinTeam(teamId)),
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
    memberInvitation: (teamId, receiverId) => dispatch(memberInvitation(teamId, receiverId)),
    confirmTeamParticipation: (id, confirmationResult, teamId, slug) => dispatch(confirmTeamParticipation(id, confirmationResult, teamId, slug)),
});
export default SideBarInfoTeam = compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(SideBarInfoTeam);
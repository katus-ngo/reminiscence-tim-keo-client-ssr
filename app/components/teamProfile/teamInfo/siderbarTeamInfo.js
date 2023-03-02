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
            options: ['Đã gửi yêu cầu tham gia', 'Huỷ yêu cầu tham gia'],
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
                message: 'Hãy chọn một ai đó!',
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
                message: 'Bạn đã gửi yêu cầu tham gia!',
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
            message: 'Chức năng tạm thời chưa hoạt động',
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
        const facebook = contactInfo.facebook ? contactInfo.facebook : 'Chưa cập nhật';
        const phoneNumber = contactInfo.phoneNumber ? contactInfo.phoneNumber : 'Chưa cập nhật';
        const email = contactInfo.email ? contactInfo.email : 'Chưa cập nhật';
        const fullName = contactInfo.fullName ? contactInfo.fullName : 'Chưa cập nhật';
        gameLevel = gameLevel ? gameLevel : 'Đang cập nhật';
        const createDate = moment(createdAt).locale('vi').format("DD-MM-YYYY");
        return (
            <div>
                <div className={classes.introTitle}>
                    <div className={classes.introTitle}>
                        <Public/>
                        <Typography component="p">
                            Giới thiệu:
                        </Typography>
                    </div>
                    {
                        isCaptain && <Tooltip title={'Chỉnh sửa thông tin'} TransitionComponent={Zoom}
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
                        <Tooltip title={'Ngày thành lập đội'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <Cake className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={createDate}/>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'Tổng thành viên'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <Group className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={'Đang cập nhật'}/>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'Rank trung bình'} TransitionComponent={Zoom}
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
                        Liên hệ:
                    </Typography>
                </div>
                <List className={classes.list}>
                    <ListItem>
                        <Tooltip title={'Người đại diện'} TransitionComponent={Zoom}
                                 placement="top">
                        <ListItemIcon className={classes.listItemIcon}>
                            <BubbleChart className={classes.colorIcon}/>
                        </ListItemIcon>
                        </Tooltip>
                        <ListItemText className={classes.colorIcon} primary={fullName}/>
                    </ListItem>
                    <ListItem>
                        <Tooltip title={'Số điện thoại liên hệ'} TransitionComponent={Zoom}
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
                        <Tooltip title={'Email liên hệ'} TransitionComponent={Zoom}
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
                        Thêm thành viên
                    </Button>
                }
                {
                    (isLogged && teamParticipationState.state === 'MEMBER_INVITED') &&
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>

                        <Fab variant="extended" aria-label="Accepted" className={clsx(classes.fab, classes.fabAccept)}
                             onClick={() => this.confirmTeamParticipation('ACCEPTED')}>
                            Chấp nhận
                        </Fab>

                        <Fab variant="extended" aria-label="Declined" className={clsx(classes.fab, classes.fabDecline)}
                             onClick={() => this.confirmTeamParticipation('DECLINED')}>
                            Từ chối
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

                <DialogAddUser open={open} textBtnCancel='Huỷ' textBtnOk={'Thêm'}
                               title={'Thêm thành viên'}
                               comment='Yêu cầu thêm thành viên cần được đối phương xác nhận.'
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
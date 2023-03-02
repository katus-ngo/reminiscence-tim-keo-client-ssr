import React, {Component} from 'react';
import {team} from 'app/fakeData/fakeParticipationFace'
import {
    Box,
    Button, CircularProgress,
    Dialog,
    Divider,
    IconButton,
    Tooltip,
    Typography,
    withStyles,
    Zoom
} from "@material-ui/core";
import PropTypes from "prop-types";
import {AddCircleOutline, BorderColor, GamesOutlined, Group, PersonAdd, Public, Refresh} from "@material-ui/icons";
import {IconClose, IconColorfulFacebook, IconColorfulPlayerduo, IconColorfulYoutube} from "app/components/icon";
import {createStructuredSelector} from "reselect";
import {connect} from 'react-redux'
import clsx from "clsx";
import DialogMemberInvitation from "app/components/common/proBirdDialog";
import DialogConfirmRemoveSummoner from "app/components/common/DialogConfirm";
import ContentDialogConfirmRemoveSummoner from './contentDialogConfirmRemoveSummoner'
import {
    closeDialogMemberInvitation,
    openDialogMemberInvitation,
} from 'app/containers/userProfile/actions'
import ContentDialogMemberInvitation from 'app/components/userPofile/userInfo/contentDialogMemberInvitation'
import {getProfileMe} from 'app/containers/AuthProvider/actions'
import Link from "app/utils/Link";
import LOLEmblem from 'app/components/common/lolEmblem';
import StepperSummoner from './stepSummoner'
import {invalidateLOLSummoner} from "app/containers/lol-summoner/actions";
import {
    closeDialogAddSummoner,
    openDialogAddSummoner,
    openDialogConfirmRemoveSummoner,
    closeDialogConfirmRemoveSummoner
} from 'app/containers/lol-summoner/actions';
import {
    removeLOLSummoner
} from 'app/containers/lol-summoner/actions'
import Slide from "@material-ui/core/Slide";
import LineRate from "../../common/LineRate";
import ParticipationFace from "../../common/ParticipationFace";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const CustomDialog = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        overflow: 'hidden scroll'
    },
    container: {
        display: 'flex',
    },
    paper: {
        backgroundColor: '#1b1c23',
        margin: '24px'
    }
})(Dialog);

const styles = theme => {
    return {
        boxInfoWrapper: {
            '& >*': {
                marginTop: theme.spacing(2)
            },
            '& >*:first-child': {
                marginTop: theme.spacing(1)
            },
        },
        boxInfo: {
            color: 'white',

        },
        socials: {
            display: 'flex',
            justifyContent: 'center',
            '& > a': {
                marginLeft: theme.spacing(1)
            },
            marginTop: theme.spacing(2)
        },
        boxInfoHeader: {
            display: 'flex',
            '& svg': {
                marginRight: theme.spacing(1),
            },
            '& >*:last-child': {
                marginLeft: 'auto'
            },
            marginBottom: theme.spacing(2)
        },
        boxInfoContent: {},
        boxEmblem: {
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
        },
        commonLink: {
            color: theme.palette.links.common
        },
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
            marginTop: theme.spacing(2),
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
        buttonRefreshSummoner: {
            marginTop: theme.spacing(1)
        },
        buttonRemoveSummoner: {
            marginTop: theme.spacing(1)
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
        },
        divider: {
            backgroundColor: '#707070',
            marginTop: theme.spacing(1)
        },
        containerDialog: {
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            }
        },
        paperDialog: {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                margin: '16px auto'
            },
            [theme.breakpoints.down('xs')]: {
                margin: '0 auto'
            }
        },
        dialogTitle: {
            padding: theme.spacing(2),
            height: 100,
            backgroundImage: 'url("/static/images/background_add_summoner.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            position: 'relative',
            '&:before': {
                content: '""',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(17,18,23,0.4)',
                zIndex: 1
            },
            textAlign: 'center',
            '& *': {
                position: 'relative',
                zIndex: 2,
                fontWeight: 900,
            }
        },
        btnClose: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
        title: {
            fontSize: 16,
            fontWeight: 900
        },
        logo: {
            width: 72,
            height: 72,
        },
        submitting: {
            color: theme.palette.text.secondary
        },
        teamRates: {
            marginTop: theme.spacing(2),
            paddingLeft: theme.spacing(1),
        },
        teamRate: {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    }
};

class SidebarUserInfo extends Component {
    constructor(props) {
        super(props);
        this.handleCloseDialogMemberInvitation = this.handleCloseDialogMemberInvitation.bind(this);
        this.handleOpenDialogMemberInvitation = this.handleOpenDialogMemberInvitation.bind(this);
    }

    handleCloseDialogMemberInvitation() {
        this.props.closeDialogMemberInvitation(false)
    }

    handleOpenDialogMemberInvitation() {
        this.props.getProfileMe();
        this.props.openDialogMemberInvitation(true)
    }

    closeDialogAddSummoner = () => {
        this.props.closeDialogAddSummoner();
    };
    openDialogAddSummoner = () => {
        this.props.openDialogAddSummoner()
    };
    openDialogConfirmRemoveSummoner = () => {
        this.props.openDialogConfirmRemoveSummoner()
    };
    handleConfirmRemoveSummoner = (lolSummonerId) => {
        this.props.removeLOLSummoner(lolSummonerId);
    };

    render() {
        const {
            classes, userProfile, profile,
            profileMe, statusDialogMemberInvitation,
            isOwner, statusDialogAddSummoner,
            invalidatingSummoner,
            invalidateLOLSummoner,
            statusDialogConfirmRemoveSummoner
        } = this.props;
        const isLogged = !!profile;
        const {lolSummoner} = userProfile;
        const description = 'Chưa cập nhật';

        return (
            <div className={classes.boxInfoWrapper}>
                <div className={classes.boxInfo}>
                    <div className={classes.boxInfoHeader}>
                        <Public/>
                        <Typography component="p">
                            Giới thiệu
                        </Typography>
                        {
                            isOwner && <Tooltip title={'Chỉnh sửa thông tin'} TransitionComponent={Zoom}
                                                placement="top">
                                <IconButton style={{padding: 'unset'}} aria-label="edit">
                                    <BorderColor fontSize='small' className={classes.colorIcon}/>
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                    <div className={classes.boxInfoContent}>
                        <Typography component="div" className={classes.introDescription}>
                            <Box textAlign="center">
                                {description}
                            </Box>
                        </Typography>
                        <div className={classes.socials}>
                            <a href="#" target='_blank'>
                                <IconColorfulFacebook/>
                            </a>
                            <a href="#" target='_blank'>
                                <IconColorfulYoutube/>
                            </a>
                            <a href="#" target='_blank'>
                                <IconColorfulPlayerduo/>
                            </a>
                        </div>
                    </div>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.boxInfo}>
                    <div className={classes.boxInfoHeader}>
                        <GamesOutlined/>
                        <Typography>
                            Game
                        </Typography>
                        <Link routeName="user-profile" query={{tab: '', slug: userProfile.slug}}>
                            <a>
                                <Typography className={classes.commonLink}>Xem thêm</Typography>
                            </a>
                        </Link>
                    </div>
                    <div className={clsx([classes.boxInfoContent, classes.boxEmblem])}>
                        <React.Fragment>
                            {
                                !lolSummoner && isOwner && <div>
                                    <Button color='secondary' fullWidth variant="contained"
                                            className={classes.buttonRefreshSummoner}
                                            onClick={this.openDialogAddSummoner}
                                    >
                                        <AddCircleOutline/>
                                        Thêm anh hùng
                                    </Button>
                                    <CustomDialog open={statusDialogAddSummoner}
                                                  TransitionComponent={Transition}
                                                  onClose={this.closeDialogAddSummoner}
                                                  maxWidth='sm'
                                                  fullWidth={true}
                                                  classes={{
                                                      container: classes.containerDialog,
                                                      paper: classes.paperDialog,
                                                  }}
                                    >
                                        <div className={classes.dialogTitle}>
                                            <img src="/static/images/home/lol-logo.svg" className={classes.logo}
                                                 alt="LMHT"/>
                                            <Typography variant='body1' className={classes.title} color='textSecondary'
                                                        align='center'>Thêm anh hùng</Typography>
                                            <IconButton className={classes.btnClose} aria-label="Close"
                                                        onClick={this.closeDialogAddSummoner}>
                                                <IconClose stroke='#ebeef2'/>
                                            </IconButton>
                                        </div>
                                        <StepperSummoner/>
                                    </CustomDialog>
                                </div>
                            }
                            {
                                !lolSummoner && !isOwner && <div>
                                    <Typography align={"center"} color={"textPrimary"}>Chưa có liên kết anh
                                        hùng.</Typography>
                                </div>
                            }
                        </React.Fragment>
                        {
                            lolSummoner &&
                            <LOLEmblem
                                queue={lolSummoner['highestRank']['queue']}
                                tier={lolSummoner['highestRank']['tier']}
                                division={lolSummoner['highestRank']['division']}
                                summonerName={lolSummoner.name}
                                verified={lolSummoner.verified}
                            />
                        }

                        {
                            lolSummoner && isOwner &&
                            <div>
                                <Button color='secondary' onClick={invalidateLOLSummoner}
                                        disabled={invalidatingSummoner} fullWidth variant="contained"
                                        className={classes.buttonRefreshSummoner}>
                                    {!invalidatingSummoner && <React.Fragment>
                                        <Refresh/>
                                        Làm mới thông tin
                                    </React.Fragment>}
                                    {invalidatingSummoner &&
                                    <CircularProgress size="1.5rem" className={classes.submitting}/>}
                                </Button>
                                <Button color='primary' fullWidth className={classes.buttonRemoveSummoner}
                                        onClick={this.openDialogConfirmRemoveSummoner}>
                                    Xoá
                                </Button>
                                <DialogConfirmRemoveSummoner
                                    open={statusDialogConfirmRemoveSummoner}
                                    content={<ContentDialogConfirmRemoveSummoner lolSummoner={lolSummoner}/>}
                                    handleCancel={
                                        () => {
                                            this.props.closeDialogConfirmRemoveSummoner()
                                        }
                                    }
                                    textBtnConfirm='Xoá'
                                    fullWidth={true}
                                    handleConfirm={
                                        () => this.handleConfirmRemoveSummoner(lolSummoner.id)
                                    }
                                />
                            </div>
                        }
                    </div>
                </div>
                <div className={classes.boxInfo}>
                    <div className={classes.boxInfoHeader}>
                        <Group/>
                        <Typography>
                            Đội
                        </Typography>
                        <Link routeName="user-profile" query={{tab: 'teams', slug: userProfile.slug}}>
                            <a>
                                <Typography className={classes.commonLink}>Xem thêm</Typography>
                            </a>
                        </Link>
                    </div>
                    <div className={classes.boxInfoContent}>
                        {/*<Typography align={"center"} color={"textPrimary"}>Chưa tham gia đội.</Typography>*/}
                        {/*<LineRate widthTotalNumber={150} widthRelityPercent='75%'/>*/}
                        <ParticipationFace isOwner={isOwner}
                                           participantType='team'
                                           participation={team}
                                           hideAchievement={true}
                                           showTooltip={true}
                                           handleActionTooltip={()=>{console.log('Todo')}}
                        />
                        <div className={classes.teamRates}>
                            <div className={classes.teamRate}>
                                <Typography variant={"body1"} color='textPrimary'>
                                    Uy Tín:
                                </Typography>
                                <LineRate widthTotalNumber={180} widthRelityPercent='75%'/>
                            </div>
                            <div className={classes.teamRate}>
                                <Typography variant={"body1"} color='textPrimary'>
                                    Tỉ lệ chơi:
                                </Typography>
                                <LineRate widthTotalNumber={180} widthRelityPercent='20%'
                                          backgroundColorRelity='#19e627'/>
                            </div>
                            <div className={classes.teamRate}>
                                <Typography variant={"body1"} color='textPrimary'>
                                    Tỉ lệ thắng:
                                </Typography>
                                <LineRate widthTotalNumber={180} widthRelityPercent='60%'
                                          backgroundColorRelity='#10baa8'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                    {
                        !isLogged &&
                        <Button variant="contained" size="small" className={classes.button} fullWidth
                                onClick={this.handleOpenDialogMemberInvitation}
                        >
                            <PersonAdd className={clsx(classes.leftIcon, classes.iconSmall)}/>
                            Mời tham gia đội
                        </Button>
                    }
                    {
                        (isLogged && !isOwner) &&
                        <Button variant="contained" size="small" className={classes.button} fullWidth
                                onClick={this.handleOpenDialogMemberInvitation}
                        >
                            <PersonAdd className={clsx(classes.leftIcon, classes.iconSmall)}/>
                            Mời tham gia đội
                        </Button>
                    }

                    <DialogMemberInvitation open={statusDialogMemberInvitation} textBtnCancel='Huỷ' textBtnOk={'Gửi'}
                                            title={'Mời thành viên'}
                                            comment='Yêu cầu mời thành viên cần được đối phương xác nhận.'
                                            onCancel={this.handleCloseDialogMemberInvitation}
                                            content={<ContentDialogMemberInvitation profileMe={profileMe}
                                                                                    receiverId={userProfile.id}/>}
                                            haveFooter={false}
                                            haveProBird={true}
                    />
                </div>
            </div>
        );
    }
}

SidebarUserInfo.propTypes = {
    userProfile: PropTypes.object,
    isOwner: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    profile: state => state.auth.profile,
    profileMe: state => state.auth.profileMe,
    statusDialogMemberInvitation: state => state.userProfileData.openDialogMemberInvitation,
    invalidatingSummoner: state => state.lolSummoner.invalidating,
    statusDialogAddSummoner: state => state.lolSummoner.openDialogAddSummoner,
    statusDialogConfirmRemoveSummoner: state => state.lolSummoner.openDialogConfirmRemoveSummoner,
});
const mapDispatchToProps = dispatch => ({
    openDialogMemberInvitation: (open) => dispatch(openDialogMemberInvitation(open)),
    closeDialogMemberInvitation: (open) => dispatch(closeDialogMemberInvitation(open)),
    openDialogAddSummoner: () => dispatch(openDialogAddSummoner()),
    closeDialogAddSummoner: () => dispatch(closeDialogAddSummoner()),
    openDialogConfirmRemoveSummoner: () => dispatch(openDialogConfirmRemoveSummoner()),
    closeDialogConfirmRemoveSummoner: () => dispatch(closeDialogConfirmRemoveSummoner()),
    getProfileMe: () => dispatch(getProfileMe()),
    invalidateLOLSummoner: () => dispatch(invalidateLOLSummoner()),
    removeLOLSummoner: (lolSummonerId) => dispatch(removeLOLSummoner(lolSummonerId))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarUserInfo));
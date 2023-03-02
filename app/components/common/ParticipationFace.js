import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
} from '@material-ui/core'
import Avatar from "./avatar";
import Link from "../../utils/Link";
import {generateLetterAvatar} from "../../utils/generateLetterAvatar.helper"
import OverviewAchievementsTournament from "./OverviewAchievementsTournament";
import {CheckCircleOutlined} from "@material-ui/icons";

import ContentTooltipParticipationFace from 'app/components/common/ContentTooltipParticipationFace'

const styles = theme => {
    return {
        participant: props => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            flexDirection: props.vertical ? 'column' : 'unset',
            position: 'relative'
        }),
        text: props => ({
            width: props.avatarSize ? 'calc(100% - 4px - ' + props.avatarSize + 'px)' : 'calc(100% - 4px - 42px)',
            display: 'block',
            marginLeft: 4,
        }),
        name: props => ({
            color: theme.palette.text.secondary,
            width: '100%',
            fontSize: props.nameSize ? props.nameSize : 14,
            display: 'flex',
            alignItems: 'center',
            '&>strong': {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                '&:hover': {
                    cursor: 'pointer',
                    color: theme.palette.text.primary,
                },
            },
            justifyContent: props.vertical ? 'center' : 'unset',
            position: 'relative',
        }),
        avatar: props => ({
            width: props.avatarSize ? props.avatarSize : 42,
            height: props.avatarSize ? props.avatarSize : 42,
            marginBottom: props.vertical ? (props.avatarMagrinBottom ? props.avatarMagrinBottom : 8) : 'unset',
            color: theme.palette.text.secondary,
            '&:hover': {
                cursor: 'pointer',
                opacity: '0.7',
            },
            backgroundColor: theme.palette.primary.main,
            position: 'relative'
        }),
        member: props => (
            {
                fontSize: props.memberSize ? props.memberSize : 12
            }
        ),
        verifyIcon: props => ({
            width: props.verifyIconSize ? props.verifyIconSize : 16,
            height: props.verifyIconSize ? props.verifyIconSize : 16,
            marginLeft: 2
        }),
        moreInfo: props => ({
            justifyContent: props.vertical ? 'center' : 'unset',
            display: props.vertical ? 'flex' : 'unset'
        }),
        tooltip: {
            position: 'absolute',
            top: -250,
            zIndex: 2,
        },
    }
};

class ParticipationFace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            close: true
        };
    }

    handleActionTooltip = () => {
        this.props.handleActionTooltip();
    };

    handleShowTooltip = () => {
        this.setState({open: true})
        this.setState({close: false})
    };
    handleCloseTooltip = () => {
        this.setState({close: true}, () => {
            setTimeout(() => {
                this.state.close && this.setState({open: false})
            }, 500)
        })
    };
    hoverTooltip = () => {
        this.setState({close: false})
        this.setState({open: true})
    }
    leaveTooltip = () => {
        this.setState({close: true})
        this.setState({open: false})
    }

    render() {
        const {
            classes,
            participantType,
            participation,
            hideAchievement,
            showVerify,
            isOwner,
            showTooltip,
        } = this.props;
        const {open} = this.state;
        if (participantType === 'team') {
            const {shortName, longName, avatar, slug, teamAchievementsTournament, member, verify} = participation;
            const {first, second, third} = teamAchievementsTournament ? teamAchievementsTournament : {};
            const showMember = hideAchievement || teamAchievementsTournament ? (first === 0 && second === 0 && third === 0) : true;
            const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
            return (
                <div className={classes.participant}>
                    {
                        open && showTooltip && <div className={classes.tooltip}
                                                    onMouseEnter={this.hoverTooltip}
                                                    onMouseLeave={this.leaveTooltip}
                        >
                            <ContentTooltipParticipationFace participantType={'team'}
                                                             participation={participation}
                                                             labelButton={isOwner ? 'Rời đội' : 'Tham gia'}
                                                             backgroundColorButton={isOwner ? '#c43855' : '#10baa8'}
                                                             backgroundColorButtonHover={isOwner ? '#7b2335' : '#0c7368'}
                                                             handleAction={this.handleActionTooltip}
                            />
                        </div>
                    }
                    <Link routeName={"team-profile"} query={{"slug": slug}}>
                        <div onMouseEnter={this.handleShowTooltip}
                             onMouseLeave={this.handleCloseTooltip}>
                            <Avatar alt={shortName} avatar={avatar} letterAvatar={letterAvatar}
                                    className={classes.avatar}/>
                        </div>
                    </Link>
                    <Link routeName={"team-profile"} query={{"slug": slug}}>
                        <div className={classes.text}>
                            <Typography component='p' className={classes.name}>
                                <strong onMouseEnter={this.handleShowTooltip}
                                        onMouseLeave={this.handleCloseTooltip}>
                                    {shortName}-{longName}
                                </strong>
                                {verify && showVerify &&
                                <CheckCircleOutlined className={classes.verifyIcon} htmlColor='#19E627'/>}
                                {!verify && showVerify &&
                                <CheckCircleOutlined className={classes.verifyIcon} color='disabled'/>}
                            </Typography>
                            <div className={classes.moreInfo}>
                                {
                                    !showMember &&
                                    <OverviewAchievementsTournament
                                        first={first}
                                        second={second}
                                        third={third}
                                    />
                                }
                                {
                                    showMember && <Typography component='span' className={classes.member}
                                                              color='textPrimary'>{member} thành
                                        viên</Typography>
                                }
                            </div>
                        </div>
                    </Link>
                </div>
            )
        } else if (participantType === 'user') {
            const {avatar, id, userAchievementsTournament, fullName, verify, friend} = participation;
            const {first, second, third} = userAchievementsTournament;
            const showFriend = first === 0 && second === 0 && third === 0;
            const letterAvatar = generateLetterAvatar(fullName).toLocaleUpperCase();
            return (
                <div className={classes.participant}>
                    {
                        open && showTooltip && <div className={classes.tooltip}
                                                    onMouseEnter={this.hoverTooltip}
                                                    onMouseLeave={this.leaveTooltip}
                        >
                            <ContentTooltipParticipationFace participantType={'user'}
                                                             participation={participation}
                                                             labelButton={isOwner ? 'Hủy kết bạn' : 'Kết bạn'}
                                                             backgroundColorButton={isOwner ? '#c43855' : '#10baa8'}
                                                             backgroundColorButtonHover={isOwner ? '#7b2335' : '#0c7368'}
                                                             handleAction={this.handleActionTooltip}
                            />
                        </div>
                    }
                    <Link routeName={"user-profile"} query={{"id": id}}>
                        <div onMouseEnter={this.handleShowTooltip}
                             onMouseLeave={this.handleCloseTooltip}>
                            <Avatar alt={fullName} avatar={avatar} letterAvatar={letterAvatar}
                                    className={classes.avatar}/>
                        </div>
                    </Link>
                    <Link routeName={"user-profile"} query={{"id": id}}>
                        <div className={classes.text}>
                            <Typography component='p' className={classes.name}>
                                <strong onMouseEnter={this.handleShowTooltip}
                                        onMouseLeave={this.handleCloseTooltip}
                                >{fullName}</strong>
                                {verify && showVerify &&
                                <CheckCircleOutlined className={classes.verifyIcon} htmlColor='#19E627'/>}
                                {!verify && showVerify &&
                                <CheckCircleOutlined className={classes.verifyIcon} color='disabled'/>}
                            </Typography>
                            <div className={classes.moreInfo}>
                                {
                                    !showFriend && <OverviewAchievementsTournament first={first}
                                                                                   second={second}
                                                                                   third={third}
                                    />
                                }
                                {
                                    showFriend && <Typography component='span' className={classes.member}
                                                              color='textPrimary'>{friend} bạn bè</Typography>
                                }
                            </div>
                        </div>
                    </Link>
                </div>
            )
        } else {
            return (<div>Empty</div>)
        }

    }
}

ParticipationFace.defaultProps = {
    participantType: 'team',
    avatarSize: 42,
    nameSize: 14,
    memberSize: 12,
    verifyIconSize: 14,
    hideAchievement: false,
    vertical: false,
    avatarMagrinBottom: 8,
    showVerify: false,
    isOwner: false,
    showTooltip: false,
};
ParticipationFace.propTypes = {
    participation: PropTypes.object,
    participantType: PropTypes.oneOf(['team', 'user']),
    avatarSize: PropTypes.number,
    avatarMagrinBottom: PropTypes.number,
    nameSize: PropTypes.number,
    memberSize: PropTypes.number,
    verifyIconSize: PropTypes.number,
    hideAchievement: PropTypes.bool,
    vertical: PropTypes.bool,
    showVerify: PropTypes.bool,
    isOwner: PropTypes.bool,
    showTooltip: PropTypes.bool,
    handleActionTooltip: PropTypes.func,
};
export default withStyles(styles)(ParticipationFace);
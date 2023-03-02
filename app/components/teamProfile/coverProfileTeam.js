import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Avatar, Typography,
    withStyles
} from "@material-ui/core";
import {compose} from 'recompose'
import {generateImageUrl} from "app/utils/ImageHelper";
import {generateLetterAvatar} from "app/utils/generateLetterAvatar.helper";
import clsx from 'clsx';
import {
    CameraAlt
} from '@material-ui/icons'

const styles = theme => {
        return {
            fullWidth: {
                width: '100%',
                [theme.breakpoints.down('xs')]: {
                    marginBottom: theme.spacing(20)
                },
                position: 'relative'
            },
            cover: {
                height: '315px',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                [theme.breakpoints.down('xs')]: {
                    height: '230px'
                },
                '&hover': {}
            },
            gradient: {
                width: '100%',
                height: '87px',
                position: 'absolute',
                left: 0,
                bottom: 0,
                zIndex: 1,
                background: 'linear-gradient(to top, rgba(51, 51, 51, 1) 0%, rgba(236, 236, 236, 0.09) 70%, rgba(249, 249, 249, 0.02) 85%, rgba(255, 255, 255, 0) 100%)'
            },
            avatarDiv: {
                position: 'absolute',
                left: 0,
                bottom: '-36px',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                maxWidth: '100%',
                paddingLeft: theme.spacing(1),
                [theme.breakpoints.down('xs')]: {
                    left: '50%',
                    transform: 'translateX(-50%)',
                    flexDirection: 'column',
                    width: '100%',
                    padding: 'unset',
                    bottom: '-50%'
                }
            },
            avatarContainer: {
                position: 'relative',
                marginRight: theme.spacing(2),
                overflow: 'hidden',
                borderRadius: '1000px',
                [theme.breakpoints.down('xs')]: {
                    marginRight: 'unset'
                }
            },
            avatar:
                {
                    backgroundColor: theme.palette.primary.main,
                    width:
                        '168px',
                    height:
                        '168px',
                    fontSize:
                        '80px',
                    '&:hover':
                        {
                            cursor: 'pointer',
                            backgroundColor:
                                '#a13311'
                        }
                    ,
                    [theme.breakpoints.down('xs')]:
                        {
                            width: '151px',
                            height:
                                '151px',
                            '&:hover':
                                {
                                    backgroundColor: theme.palette.primary.main
                                }
                        }
                    ,
                    color: theme.palette.text.secondary
                }
            ,
            avatarIfIsCaptain: {
                '&:hover':
                    {
                        cursor: 'unset',
                    }
                ,
            }
            ,
            nameSlogan: {
                display: 'flex',
                flexDirection:
                    'column',
                maxWidth:
                    '70%',
                [theme.breakpoints.down('xs')]:
                    {
                        maxWidth: '100%',
                        width:
                            '100%',
                        alignItems:
                            'center'
                    }
            }
            ,
            name: {
                fontSize: '24px',
                color:
                    'white',
                fontWeight:
                    'bold',
                textTransform:
                    'capitalize'
            }
            ,
            slogan: {
                fontSize: '20px',
                color:
                    'white',
                fontStyle:
                    'italic',
                whiteSpace:
                    'nowrap',
                overflow:
                    'hidden',
                textOverflow:
                    'ellipsis',
                maxWidth:
                    '100%'
            }
            ,
            logoLol: {
                position: 'absolute',
                bottom:
                    theme.spacing(1),
                zIndex:
                    '2',
                left:
                    '130px',
                width:
                    '65px',
                height:
                    '65px',
                [theme.breakpoints.down('xs')]:
                    {
                        top: '50%',
                        position: 'absolute',
                        left: 'calc(50% + 70px)',
                        transform: 'translate(-50%, -60%)',
                    }
            }
            ,
            logoAoe: {
                position: 'absolute',
                bottom:
                    '20px',
                zIndex:
                    '2',
                left:
                    '140px',
                [theme.breakpoints.down('xs')]:
                    {
                        top: '50%',
                        position: 'absolute',
                        left: 'calc(50% + 70px)',
                        transform: 'translate(-50%, -60%)',
                    }
            }
            ,
            updateCover: {
                display: 'none',
                [theme.breakpoints.down('sm')]:
                    {
                        position: 'absolute',
                        top:
                            '5px',
                        right:
                            '5px',
                        color:
                            '#a4a4a4',
                        display:
                            'flex',
                        alignItems:
                            'center',
                        borderRadius:
                            '2px',
                        boxSizing:
                            'border-box',
                        backgroundColor:
                            'rgba(0,0,0,0.6)',
                        padding:
                            '6px 12px',
                    }
            }
            ,
            updateCoverIsHovering: {
                position: 'absolute',
                top:
                    '16px',
                left:
                    '16px',
                color:
                    '#a4a4a4',
                display:
                    'flex',
                alignItems:
                    'center',
                border:
                    '1px solid #ebeef2',
                borderRadius:
                    '2px',
                boxSizing:
                    'border-box',
                backgroundColor:
                    'rgba(0,0,0,0.6)',
                padding:
                    '6px 12px',
                '&:hover':
                    {
                        cursor: 'pointer',
                        backgroundColor:
                            'rgba(0,0,0,1)',
                    }
                ,
                [theme.breakpoints.down('sm')]:
                    {
                        top: '5px',
                        right:
                            '5px',
                        border:'unset',
                        boxSizing:
                            'border-box',
                    }
            }
            ,

            updateCoverIcon: {
                fontSize: '20px'
            }
            ,
            updateCoverTitle: {
                marginLeft: theme.spacing(1),
                fontSize:
                    '14px',
                fontFamily: 'Open Sans'
            }
            ,
            cameraCover: {
                position: 'absolute',
                fontSize:
                    '26px',
                top:
                    '21px',
                left:
                    '26px',
                color:
                    'rgba(164,164,164,0.4)',
                [theme.breakpoints.down('sm')]:
                    {
                        display: 'none'
                    }
            }
            ,
            cameraCoverNotHover: {
                display: 'none'
            }
            ,
            updateAvatar: {
                display: 'none',
                [theme.breakpoints.down('sm')]:
                    {
                        position: 'absolute',
                        color:
                            '#a4a4a4',
                        display:
                            'flex',
                        flexDirection:
                            'column',
                        alignItems:
                            'center',
                        backgroundColor:
                            'rgba(0,0,0,0.6)',
                        width:
                            '100%',
                        '&:hover':
                            {
                                cursor: 'pointer',
                            }
                        ,
                        bottom: 0,
                        height:
                            '33%',
                        justifyContent:
                            'center'
                    }
            }
            ,
            updateAvatarIsHovering: {
                position: 'absolute',
                color:
                    '#a4a4a4',
                display:
                    'flex',
                flexDirection:
                    'column',
                alignItems:
                    'center',
                backgroundColor:
                    'rgba(0,0,0,0.6)',
                width:
                    '100%',
                '&:hover':
                    {
                        cursor: 'pointer',
                    }
                ,
                bottom: 0,
                height:
                    '50%',
                justifyContent:
                    'center',
                [theme.breakpoints.down('xs')]:
                    {
                        height: '33%',
                    }
            }
            ,
            updateAvatarIcon: {
                fontSize: '20px'
            }
            ,
            updateAvatarTitle: {
                fontSize: '14px',
                fontFamily: 'Open Sans'
            }
        }
    }
;

class CoverProfileTeam extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isHoveringCover: false,
            isHoveringAvatar: false
        }
    }

    handleClickUpdateAvatar = () => {
        this.props.isCaptain && this.props.handleClickUpdateAvatar && this.props.handleClickUpdateAvatar();
    };

    handleClickUpdateCover = () => {
        this.props.isCaptain && this.props.handleClickUpdateCover && this.props.handleClickUpdateCover();
    };

    coverHoverOn = () => {
        this.setState({isHoveringCover: true})
    };
    coverHoverOff = () => {
        this.setState({isHoveringCover: false})
    };

    avatarHoverOn = () => {
        this.setState({isHoveringAvatar: true})
    };
    avatarHoverOff = () => {
        this.setState({isHoveringAvatar: false})
    };

    render() {
        const {isHoveringCover, isHoveringAvatar} = this.state;
        let {shortName, longName, avatar, cover, slogan, game, classes, isCaptain} = this.props;
        slogan = slogan ? slogan : '...';
        shortName = shortName ? shortName.toLocaleUpperCase(): '';
        let gameLogo = game === 'LOL' ? '/static/images/home/lol-logo.svg' : '/static/images/home/aoe-logo.png';
        const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
        return (
            <div className={classes.fullWidth}>
                <div className={classes.cover} style={{backgroundImage: 'url(' + generateImageUrl(cover.original) + ')'}}
                     onMouseEnter={this.coverHoverOn}
                     onMouseLeave={this.coverHoverOff}
                >
                    {
                        isCaptain &&
                        <div className={isHoveringCover ? classes.updateCoverIsHovering : classes.updateCover}
                             onClick={this.handleClickUpdateCover}>
                            <CameraAlt className={classes.updateCoverIcon}/> <span className={classes.updateCoverTitle}>Cập nhật ảnh bìa</span>
                        </div>
                    }
                    {
                        isCaptain &&
                        < CameraAlt className={isHoveringCover ? classes.cameraCoverNotHover : classes.cameraCover}/>
                    }
                    <div className={classes.gradient}/>

                </div>
                <div className={classes.avatarDiv}>
                    {
                        game === 'LOL' && <Avatar className={classes.logoLol} src={gameLogo}/>
                    }
                    {
                        game === 'AOE' && <Avatar className={classes.logoAoe} src={gameLogo}/>
                    }
                    <div className={classes.avatarContainer}
                         onMouseEnter={this.avatarHoverOn}
                         onMouseLeave={this.avatarHoverOff}
                    >
                        {
                            avatar && <Avatar alt={shortName} src={generateImageUrl(avatar.original)}
                                              className={clsx(classes.avatar, !isCaptain && classes.avatarIfIsCaptain)}>
                            </Avatar>
                        }
                        {
                            !avatar && <Avatar alt={shortName}
                                               className={clsx(classes.avatar, !isCaptain && classes.avatarIfIsCaptain)}>{letterAvatar}
                            </Avatar>
                        }
                        {
                            isCaptain && <div
                                className={isHoveringAvatar ? classes.updateAvatarIsHovering : classes.updateAvatar}
                                onClick={this.handleClickUpdateAvatar}>
                                <CameraAlt className={classes.updateAvatarIcon}/> <span
                                className={classes.updateAvatarTitle}>Cập nhật</span>
                            </div>
                        }
                    </div>
                    <div className={classes.nameSlogan}>
                        <Typography component="p" className={classes.name}>
                            {shortName} - {longName}
                        </Typography>
                        <Typography component="p" className={classes.slogan}>
                            {slogan}
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}

CoverProfileTeam.propTypes = {
    shortName: PropTypes.string,
    longName: PropTypes.string,
    slogan: PropTypes.string,
    avatar: PropTypes.object,
    cover: PropTypes.string,
    game: PropTypes.string,
    handleClickUpdateAvatar: PropTypes.func,
    handleClickUpdateCover: PropTypes.func,
    isCaptain: PropTypes.bool,
};

export default compose(
    withStyles(styles),
)(CoverProfileTeam);
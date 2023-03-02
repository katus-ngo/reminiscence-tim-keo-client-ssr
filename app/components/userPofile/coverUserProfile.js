import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Avatar, Button, Typography, withStyles} from "@material-ui/core";
import {compose} from "recompose";
import {generateLetterAvatar} from 'app/utils/generateLetterAvatar.helper'
import {generateCoverUrl, generateImageUrl} from "../../utils/ImageHelper";
import clsx from 'clsx'
import {CameraAlt, PersonAdd} from "@material-ui/icons";

const styles = theme =>{
    return {
        fullWidth: {
            width: '100%',
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(12)
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
            }
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
                width:'100%',
                padding: 'unset',
                bottom:'-30%'
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
        avatar: {
            backgroundColor: '#e64a19',
            color: theme.palette.text.secondary,
            width: '168px',
            height: '168px',
            fontSize: '80px',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#a13311'
            },
            [theme.breakpoints.down('xs')]: {
                width: '151px',
                height: '151px',
            }
        },
        avatarIfIsOwner:{
            '&:hover': {
                cursor: 'unset',
            },
        },
        name: {
            fontSize: '24px',
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'capitalize'
        },
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
};
class CoverUserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            isHoveringCover: false,
            isHoveringAvatar: false
        }
    }

    handleClickAvatar = () => {
        this.props.isOwner && console.log('Is owner')
    };

    handleUpdateCover = () => {
        //Todo: update cover
        console.log(1)
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
        const {fullName, avatar, cover, classes,isOwner} = this.props;
        const letterAvatar = generateLetterAvatar(fullName).toLocaleUpperCase();
        return (
            <div className={classes.fullWidth}>
                <div id="cover" className={classes.cover} style={{backgroundImage: 'url(' + generateCoverUrl(cover) + ')'}}
                     onMouseEnter={this.coverHoverOn}
                     onMouseLeave={this.coverHoverOff}
                >
                    {
                       isOwner && <div className={isHoveringCover ? classes.updateCoverIsHovering : classes.updateCover}
                             onClick={this.handleUpdateCover}>
                            <CameraAlt className={classes.updateCoverIcon}/> <span className={classes.updateCoverTitle}>Cập nhật ảnh bìa</span>
                        </div>
                    }
                    {
                        isOwner && <CameraAlt className={isHoveringCover ? classes.cameraCoverNotHover : classes.cameraCover}/>
                    }
                    <div id="" className={classes.gradient}></div>
                </div>
                <div id="avatar" className={classes.avatarDiv}>
                    <div className={classes.avatarContainer}
                         onMouseEnter={this.avatarHoverOn}
                         onMouseLeave={this.avatarHoverOff}
                    >
                        {
                            avatar && <Avatar alt={fullName} src={generateImageUrl(avatar.original)} className={clsx(classes.avatar, !isOwner && classes.avatarIfIsOwner)}>
                            </Avatar>
                        }
                        {
                            !avatar && <Avatar alt={fullName} className={clsx(classes.avatar, !isOwner && classes.avatarIfIsOwner)}>{letterAvatar}
                            </Avatar>
                        }
                        {
                            isOwner && <div
                                className={isHoveringAvatar ? classes.updateAvatarIsHovering : classes.updateAvatar}
                                onClick={this.handleClickAvatar}>
                                <CameraAlt className={classes.updateAvatarIcon}/> <span
                                className={classes.updateAvatarTitle}>Cập nhật</span>
                            </div>
                        }
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', maxWidth: '70%'}}>
                        <Typography component="p" className={classes.name}>
                            {fullName}
                        </Typography>
                    </div>

                </div>
            </div>
        );
    }
}
CoverUserProfile.propTypes = {
    fullName: PropTypes.string,
    avatar: PropTypes.object,
    cover: PropTypes.string,
    isOwner: PropTypes.bool,
};
export default compose(
    withStyles(styles),
)(CoverUserProfile);
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Avatar,
    Card, CardContent,
    Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Tooltip, Zoom,
    withStyles
} from '@material-ui/core'
import Link from "app/utils/Link";
import {
    Stars,
    PersonAddDisabled,
    ArrowUpward,
    ArrowDownward,
    MyLocation
} from "@material-ui/icons";
import {
    IconRank
} from 'app/components/icon'
import {generateLetterAvatar} from "../../../../utils/generateLetterAvatar.helper";
import {generateImageUrl} from "../../../../utils/ImageHelper";

const CssList = withStyles({
    root: {
        backgroundColor: '#3b3d44',
        width: '100%',
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        height: 0,
        '&:hover': {
            height: '135px'
        },
        transition: 'all 0.3s ease-out',
        '& .MuiListItem-gutters': {
            '&:hover': {
                backgroundColor: '#27282e'
            },
            '&:active': {
                backgroundColor: '#16161c'
            }
        }
    },
    padding: {},
    dense: {},
    subheader: {}
})(List);
const styles = theme => {
    return {
        memberContainer: {
            [theme.breakpoints.up('lg')]: {
                paddingRight: theme.spacing(6),
                paddingLeft: theme.spacing(6),
            },
        },
        memberCard: {
            backgroundColor: '#21232b',
        },
        merberCardContent: {
            backgroundColor: '#21232b',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '&:hover': {
                backgroundColor: '#1f2128',
                cursor: 'unset'
            },
        },
        fullName: {
            color: 'white',
            paddingTop: theme.spacing(1),
            width: '100%',
            overflow: 'hidden',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.text.primary
            },
        },
        a4a4a4Color: {
            color: '#a4a4a4'
        },
        avatar: {
            maxWidth: '160px',
            width: '100%',
            position: 'relative',
                '&:hover': {
                cursor: 'pointer',
                opacity: '0.7'
            },
            '&:before': {
                content: '""',
                display: 'block',
                paddingTop: '100%'
            },
            '& > div': {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                fontSize: '60px',
                backgroundColor: '#3b3d44',
                color: theme.palette.text.secondary,
            },
            tooltip: {
                fontSize: '12px',
            },
            listActionImpactOnMember: {},
        }
    }
};


class TapTeamMember extends Component {
    render() {
        const {classes, teamParticipations = []} = this.props;
        return (
            <Grid spacing={3} container className={classes.memberContainer}>
                {
                    teamParticipations && teamParticipations.sort((a, b) => (a.id - b.id)).map((teamParticipation, key) => {
                        const {id, fullName, rank, inGame, avatar} = teamParticipation.member;
                        const {teamRole} = teamParticipation;
                        const position = (teamRole && teamRole === 'CAPTAIN') ? 'Đội trưởng' : 'Thành viên';
                        const letterAvatar = generateLetterAvatar(fullName).toLocaleUpperCase();
                        return (
                            <Grid item md={4} lg={4} xl={3} key={key}>
                                <Card className={classes.memberCard} raised>
                                        <CardContent className={classes.merberCardContent}>
                                            <Link routeName={"user-profile"} query={{"id": id}}>
                                                <div className={classes.avatar}>
                                                    {
                                                        avatar &&
                                                        <Avatar alt={fullName} src={generateImageUrl(avatar.original)}>
                                                        </Avatar>
                                                    }
                                                    {
                                                        !avatar &&
                                                        <Avatar alt={fullName}>{letterAvatar}
                                                        </Avatar>
                                                    }
                                                </div>
                                            </Link>
                                            <Link routeName={"user-profile"} query={{"id": id}}>
                                                <Tooltip title={fullName} TransitionComponent={Zoom}
                                                         placement="top">
                                                    <Typography component='p' className={classes.fullName}>
                                                        {fullName}
                                                    </Typography>
                                                </Tooltip>
                                            </Link>
                                            <List style={{maxWidth: '100%', overflow: 'hidden'}}>
                                                <ListItem>
                                                    <ListItemIcon style={{minWidth: '30px'}}>
                                                        <Stars className={classes.a4a4a4Color}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.a4a4a4Color}
                                                                  primary={position}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon style={{minWidth: '30px'}}>
                                                        <IconRank className={classes.a4a4a4Color}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.a4a4a4Color}
                                                                  primary={rank ? rank : '******'}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon style={{minWidth: '30px'}}>
                                                        <MyLocation className={classes.a4a4a4Color}/>
                                                    </ListItemIcon>
                                                    <Tooltip title={inGame ? inGame : '******'}
                                                             TransitionComponent={Zoom}
                                                             placement="top">
                                                        <ListItemText className={classes.a4a4a4Color}
                                                                      primary={inGame ? inGame : '******'}/>
                                                    </Tooltip>
                                                </ListItem>
                                            </List>
                                            <CssList>
                                                {
                                                    (teamRole !== 'CAPTAIN') && <ListItem onClick={() => {
                                                    }}>
                                                        <ListItemIcon style={{minWidth: '30px'}}>
                                                            <ArrowUpward className={classes.a4a4a4Color}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.a4a4a4Color}
                                                                      primary={'Đội trưởng'}/>
                                                    </ListItem>
                                                }
                                                {/* {
                                                    (position == 'captain') && <ListItem>
                                                        <ListItemIcon style={{minWidth: '30px'}}>
                                                            <ArrowDownward className={classes.a4a4a4Color}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.a4a4a4Color}
                                                                      primary={'Đội phó'}/>
                                                    </ListItem>
                                                }
                                                {
                                                    (position == 'member') && <ListItem>
                                                        <ListItemIcon style={{minWidth: '30px'}}>
                                                            <ArrowUpward className={classes.a4a4a4Color}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.a4a4a4Color}
                                                                      primary={'Đội phó'}/>
                                                    </ListItem>
                                                } */}
                                                {
                                                    (teamRole !== 'MEMBER') && <ListItem>
                                                        <ListItemIcon style={{minWidth: '30px'}}>
                                                            <ArrowDownward className={classes.a4a4a4Color}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.a4a4a4Color}
                                                                      primary={'Thành viên'}/>
                                                    </ListItem>
                                                }
                                                <ListItem>
                                                    <ListItemIcon style={{minWidth: '30px'}}>
                                                        <PersonAddDisabled className={classes.a4a4a4Color}/>
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.a4a4a4Color}
                                                                  primary={'Xoá khỏi đội'}/>
                                                </ListItem>

                                            </CssList>
                                        </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
            ;
    }
}

TapTeamMember.propTypes = {
    teamParticipations: PropTypes.array
};

export default withStyles(styles)(TapTeamMember);
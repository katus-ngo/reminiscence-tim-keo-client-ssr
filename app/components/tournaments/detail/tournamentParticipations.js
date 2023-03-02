import React, {Component} from 'react';
import {
    Grid,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    withStyles,
    Avatar,
    Chip,
    Card,
    CardActionArea,
    CardContent,
    Tooltip,
    Zoom,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import {
    ExpandMore, Stars
} from '@material-ui/icons'
import PropTypes from "prop-types";
import {generateLetterAvatar} from "../../../utils/generateLetterAvatar.helper";
import {generateImageUrl} from "../../../utils/ImageHelper";
import Link from "app/utils/Link";
import moment from "moment";
import {
    getTeamProfile
} from 'app/containers/teamProfile/actions'
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import clsx from 'clsx'

const styles = theme => {
    return {
        fullWidth: {
            width: '100%'
        },
        expansionPanel: {
            backgroundColor: 'transparent',
            paddingLeft: 'unset',
            paddingRight: 'unset',
        },
        avatar: {
            backgroundColor: theme.palette.primary.main
        },
        chip: {
            margin: theme.spacing(1),
            backgroundColor: 'transparent',
            color: '#ebeef2',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#27282e',
            },
        },
        memberContainer: {
            width: '100%',
        },
        memberCard: {
            backgroundColor: '#21232b'
        },
        merberCardContent: {
            backgroundColor: '#21232b',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        fullName: {
            color: 'white',
            paddingTop: theme.spacing(1),
            width: '100%',
            overflow: 'hidden',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        },
        a4a4a4Color: {
            color: '#a4a4a4'
        },
        avatarExpanded: {
            maxWidth: '160px',
            width: '100%',
            position: 'relative',
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
                backgroundColor: '#3b3d44'
            },
            tooltip: {
                fontSize: '12px',
            },
            listActionImpactOnMember: {},
        },
        position: {
            width: '100%',
            overflow: 'hidden',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        },
        letterAvatar: {
            color: theme.palette.text.secondary
        }
    }
};

class TournamentParticipations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: ''
        }
    }

    handleChange = (isExpanded, slug) => {
        if (this.props.tournamentParticipationType === 'TEAM') {
            const expanded = isExpanded ? slug : false;
            this.setState({expanded});
            isExpanded && this.props.getTeamProfile(slug);
        }
    };

    render() {
        const {expanded} = this.state;
        const {
            classes,
            tournamentParticipations,
            tournamentParticipationType,
            teamInfo,
        } = this.props;
        const tournamentParticipationsConfirmed = tournamentParticipations.filter(tournamentParticipation => tournamentParticipation.confirmed === true);
        const teamParticipations = (teamInfo && teamInfo.teamParticipations) ? teamInfo.teamParticipations : [];
        return (
            <div>
                {
                    tournamentParticipationsConfirmed.sort((a, b) => {
                        a = moment(a.confirmedAt).valueOf();
                        b = moment(b.confirmedAt).valueOf();
                        return (a - b)
                    }).map((tournamentParticipation, key) => {
                        if (tournamentParticipationType === 'TEAM') {
                            const {team} = tournamentParticipation;
                            const {slug, shortName, longName, avatar} = team;
                            const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
                            const avt = avatar ? (<Avatar alt={longName} src={generateImageUrl(avatar.original)}
                                                          className={classes.avatar}/>) :
                                <Avatar className={classes.avatar} alt={longName}>{letterAvatar} </Avatar>
                            return (
                                <ExpansionPanel key={key} className={classes.expansionPanel}
                                                expanded={expanded === slug}
                                                onChange={(e, isExpanded) => {
                                                    this.handleChange(isExpanded, slug)
                                                }}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMore/>}
                                    >
                                        <Link routeName={"team-profile"} query={{"slug": slug}}>
                                            <Chip label={shortName + ' | ' + longName}
                                                  className={classes.chip}
                                                  avatar={avt}
                                            />
                                        </Link>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {
                                            teamParticipations.length > 0 &&
                                            <Grid spacing={3} container
                                                  className={classes.memberContainer}>
                                                {
                                                    teamParticipations.sort((a, b) => (a.id - b.id)).map((teamParticipation, key) => {
                                                        const {id, fullName, avatar} = teamParticipation.member;
                                                        const {teamRole} = teamParticipation;
                                                        const position = (teamRole && teamRole === 'CAPTAIN') ? 'Đội trưởng' : 'Thành viên';
                                                        const letterAvatar = generateLetterAvatar(fullName);
                                                        return (
                                                                <Grid item xs={12} sm={6} md={3} key={key}>
                                                                    <Card className={classes.memberCard} raised>
                                                                        <CardActionArea>
                                                                            <CardContent
                                                                                className={classes.merberCardContent}>
                                                                                <Link routeName={"user-profile"}
                                                                                      query={{"id": id}}>
                                                                                    <div className={classes.avatarExpanded}>
                                                                                        {
                                                                                            avatar &&
                                                                                            <Avatar alt={fullName}
                                                                                                    src={generateImageUrl(avatar.original)}>
                                                                                            </Avatar>
                                                                                        }
                                                                                        {
                                                                                            !avatar &&
                                                                                            <Avatar className={classes.letterAvatar}
                                                                                                alt={fullName}>{letterAvatar}
                                                                                            </Avatar>
                                                                                        }
                                                                                    </div>
                                                                                </Link>
                                                                                <Link routeName={"user-profile"}
                                                                                      query={{"id": id}}>
                                                                                    <Tooltip title={fullName}
                                                                                             TransitionComponent={Zoom}
                                                                                             placement="top">
                                                                                        <Typography component='p'
                                                                                                    className={classes.fullName}>
                                                                                            {fullName}
                                                                                        </Typography>
                                                                                    </Tooltip>
                                                                                </Link>
                                                                                <List style={{
                                                                                    maxWidth: '100%',
                                                                                    overflow: 'hidden'
                                                                                }}>
                                                                                    <ListItem>
                                                                                        <ListItemIcon
                                                                                            style={{minWidth: '30px'}}>
                                                                                            <Stars
                                                                                                className={classes.a4a4a4Color}/>
                                                                                        </ListItemIcon>
                                                                                        <ListItemText
                                                                                            className={clsx(classes.a4a4a4Color, classes.position)}
                                                                                            primary={position}/>
                                                                                    </ListItem>
                                                                                </List>
                                                                            </CardContent>
                                                                        </CardActionArea>
                                                                    </Card>
                                                                </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        }
                    })
                }
            </div>
        );
    }
}

TournamentParticipations.propTypes = {
    tournamentParticipations: PropTypes.array,
    tournamentParticipationType: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
    teamInfo: state => state.teamProfileData.teamInfo,
});
const mapDispatchToProps = dispatch => ({
    getTeamProfile: (slug) => dispatch(getTeamProfile(slug))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TournamentParticipations));
import React, {Component} from 'react';
import {compose} from "recompose";
import {Avatar, Card, CardContent, Typography, withStyles, IconButton, Button} from "@material-ui/core";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {generateImageUrl} from "app/utils/ImageHelper";
import PropTypes from "prop-types";
import {generateLetterAvatar} from "app/utils/generateLetterAvatar.helper";
import {
    PersonAdd
} from "@material-ui/icons";
import {closeDialogMemberInvitation, memberInvitation} from "app/containers/userProfile/actions";
import {openDialogCreateTeam} from "app/containers/createTeam/actions";

const styles = theme => {
    return {
        divContainer: {
            marginTop: theme.spacing(1),
            maxHeight: '300px'
        },
        teamCard: {
            backgroundColor: '#27282e',
            '&:hover': {
                backgroundColor: '#21232b',
            },
            marginBottom: theme.spacing(2),
        },
        teamCardContent: {
            backgroundColor: '#27282e',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                backgroundColor: '#21232b',
                cursor: 'pointer'
            },
            justifyContent: 'space-between',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1) + 'px !important',
        },
        name: {
            color: '#ebeef2',
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        },
        avatar: {
            marginRight: theme.spacing(1),
            width: 42,
            height: 42
        },
        btnIcon: {
            margin: theme.spacing(1),
            color: '#ebeef2'
        },
        btnTextCreateTeam: {
            margin: theme.spacing(1),
            color: theme.palette.primary.main,
            fontSize: '1.5rem'
        },
    }
};

class ContentDialogMemberInvitation extends Component {
    constructor(props){
        super(props);
        this.inviteMemberToTeam =this.inviteMemberToTeam.bind(this);
    }
    inviteMemberToTeam(receiverId, teamId){
        this.props.inviteMemberToTeam(teamId,receiverId)
    }
    handleCreateTeam = () => {
        this.props.openDialogCreateTeam(true);
        this.props.closeDialogMemberInvitation(false);
    };
    render() {
        const {classes, profileMe, receiverId} = this.props;
        if (profileMe) {
            if (!profileMe.teams || profileMe.teams.length === 0) {
                return (
                    <div style={{textAlign: 'center'}}>
                        <Typography color='textSecondary' variant='h6'>Bạn chưa có đội!</Typography>
                        <Button color="primary" className={classes.btnTextCreateTeam} onClick={this.handleCreateTeam}>
                            Tạo đội ngay!
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div className={classes.divContainer}>
                        {
                            profileMe.teams.sort((a,b)=>(a.id-b.id)).map((team, key) => {
                                const {shortName, longName, avatar} = team;
                                const teamId = team.id;
                                const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
                                return (
                                    <Card raised className={classes.teamCard} key={key}>
                                        <CardContent className={classes.teamCardContent}>
                                            <div style={{display: 'flex'}}>
                                                {
                                                    avatar &&
                                                    <Avatar alt={shortName} src={generateImageUrl(avatar.original)}
                                                            className={classes.avatar} onClick={this.handleClickUpdateAvatar}>
                                                    </Avatar>
                                                }
                                                {
                                                    !avatar &&
                                                    <Avatar alt={shortName} className={classes.avatar}
                                                            onClick={this.handleClickUpdateAvatar}>{letterAvatar}
                                                    </Avatar>
                                                }

                                                <div>
                                                    <Typography component='p' className={classes.name}>
                                                        {shortName}
                                                    </Typography>
                                                    <Typography component='p' className={classes.name}>
                                                        {longName}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <IconButton className={classes.btnIcon} aria-label="Delete" onClick={()=>this.inviteMemberToTeam(teamId,receiverId)}>
                                                <PersonAdd/>
                                            </IconButton>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </div>
                );
            }
        } else {
            return <h1 style={{width: '100%', textAlign: 'center', color: "#ebeef2"}}>Vui lòng thử lại!</h1>
        }
    }
}

ContentDialogMemberInvitation.propTypes = {
    profileMe: PropTypes.object,
    receiverId: PropTypes.number
};
const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = dispatch => ({
    inviteMemberToTeam: (teamId,receiverId) => dispatch(memberInvitation(receiverId, teamId)),
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
    closeDialogMemberInvitation: (open) => dispatch(closeDialogMemberInvitation(open)),
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(ContentDialogMemberInvitation);
import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
} from '@material-ui/core'
import {generateLetterAvatar} from "../../utils/generateLetterAvatar.helper";
import AvatarT from "app/components/common/avatar";
import Link from "../../utils/Link";
import {teamService} from "../../services";

const styles = theme => {
    return {
        user: props => {
            return {
                position: 'relative',
                padding: props.paddingUser ? props.paddingUser : 2,
                '&:last-child $more': {
                    display: 'flex'
                },
                display: 'inline-block'
            }
        },
        avatar: props => ({
            width: props.avatarSize ? props.avatarSize : 42,
            height: props.avatarSize ? props.avatarSize : 42,
            color: theme.palette.text.secondary,
            '&:hover': {
                cursor: 'pointer',
                opacity: '0.7',
            },
            backgroundColor: theme.palette.primary.main,
            fontSize:14
        }),
        more: props => ({
            display: 'none',
            width: props.avatarSize ? props.avatarSize : 42,
            height: props.avatarSize ? props.avatarSize : 42,
            color: theme.palette.text.secondary,
            '&:hover': {
                cursor: 'pointer',
                opacity: '0.7',
            },
            backgroundColor: 'rgba(0,0,0,0.6)',
            fontSize: 14,
            position: 'absolute',
            top: props.paddingUser ? props.paddingUser : 2
        }),
    }
};

class ListAvatarUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        if (this.props.participationType === 'team') {
            teamService.getTeamProfile(this.props.slugTeam).then(teamProfile => {
                const users = [];
                teamProfile.teamParticipations.forEach((teamParticipation) => {
                    users.push(teamParticipation.member);
                });
                this.setState({users});
            });
        }
    }

    render() {
        const {
            classes,
            participationType,
            userId,
            slugTeam,
            slotUser
        } = this.props;
        const {users} = this.state;
        const more = users.length - slotUser;
        return (
            <div>
                {
                    users.slice(0, slotUser).map((user, key) => {
                        const {fullName, avatar, id} = user;
                        const letterAvatar = generateLetterAvatar(fullName).toLocaleUpperCase();
                        return (
                            <div key={key} className={classes.user}>
                                <Link routeName={"user-profile"} query={{"id": id}}>
                                    <a style={{textDecoration: 'none'}}>
                                        <AvatarT alt={fullName} avatar={avatar} letterAvatar={letterAvatar}
                                                 className={classes.avatar}/>
                                    </a>
                                </Link>
                                {more > 0 && participationType === 'user' &&
                                <Link routeName={"user-profile"} query={{"id": userId, tab: 'friend'}}>
                                    <a style={{textDecoration: 'none'}}>
                                        <AvatarT className={classes.more} letterAvatar={'+' + more}/>
                                    </a>
                                </Link>
                                }
                                {more > 0 && participationType === 'team' &&
                                <Link routeName={"team-profile"} query={{"slug": slugTeam}}>
                                    <a style={{textDecoration: 'none'}}>
                                        <AvatarT className={classes.more} letterAvatar={'+' + more}/>
                                    </a>
                                </Link>
                                }

                            </div>
                        )

                    })
                }
            </div>
        )
    }
}

ListAvatarUser.defaultProps = {
    paddingUser: 2,
    slotUser: 8,
    avatarSize: 42,
    participationType: 'user',
};
ListAvatarUser.propTypes = {
    paddingUser: PropTypes.number,
    slotUser: PropTypes.number,
    avatarSize: PropTypes.number,
    participationType: PropTypes.string,
    slugTeam: PropTypes.string,
    userId: PropTypes.number,
};
export default withStyles(styles)(ListAvatarUser);
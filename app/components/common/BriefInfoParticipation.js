import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    withStyles
} from '@material-ui/core'
import ParticipationFace from "./ParticipationFace";
import ListAvatarUser from "./ListAvatarUser"

const styles = theme => {
        return {
            container: {
                width: '100%',
                overflow: 'unset',
            },
            thumbnail: props => ({
                position: 'relative',
                backgroundImage: props.participation.cover ? 'url("' + props.participation.cover.original + '")' : 'url("/static/images/background_add_summoner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    top: 0,
                    left: 0,
                },
                paddingTop: '25%',
                paddingBottom: '25%',
                paddingLeft: '50%',
                paddingRight: '50%',
            }),
            listUser: {
                padding: theme.spacing(1),
                backgroundColor: 'rgba(0,0,0,0.9)'
            },
            participationFace: {
                position: 'absolute',
                left: 0,
                bottom: theme.spacing(1),
                paddingLeft: 8,
                paddingRight: 8,
                width: 'calc(100% - 16px)'
            }
        }
    }
;

class BriefInfoParticipation extends React.Component {
    render() {
        const {
            classes,
            participation,
            isOwner,
            participationType
        } = this.props;
        if (participationType === 'team') {
            const {slug} = participation;
            return (
                <Card className={classes.container}>
                    <div className={classes.thumbnail}>
                        <div className={classes.participationFace}>
                            <ParticipationFace showTooltip={true}
                                               handleActionTooltip={() => {
                                                   console.log('Todo')
                                               }}
                                               isOwner={isOwner} participantType='team' participation={participation}
                                               avatarSize={54}/>
                        </div>
                    </div>
                    <div className={classes.listUser}>
                        <ListAvatarUser slotUser={8} avatarSize={28} participationType='team' slugTeam={slug}/>
                    </div>
                </Card>
            )
        }

        if (participationType === 'user') {
            const {id} = participation;
            return (
                <Card className={classes.container}>
                    <div className={classes.thumbnail}>
                        <div className={classes.participationFace}>
                            <ParticipationFace showTooltip={true}
                                               handleActionTooltip={() => {
                                                   console.log('Todo')
                                               }}
                                               isOwner={isOwner} participantType='user' participation={participation}
                                               avatarSize={54}/>
                        </div>
                    </div>
                    <div className={classes.listUser}>
                        <ListAvatarUser slotUser={8} avatarSize={28} participationType='user' userId={id}/>
                    </div>
                </Card>
            )
        }

    }
}

BriefInfoParticipation.defaultProps = {
    participation: {},
    participationType: 'team',
    isOwner: false
};
BriefInfoParticipation.propTypes = {
    participation: PropTypes.object,
    participationType: PropTypes.string,
    isOwner: PropTypes.bool
};
export default withStyles(styles)(BriefInfoParticipation);
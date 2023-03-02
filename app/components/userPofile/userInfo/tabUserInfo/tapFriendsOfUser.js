import React, {Component} from 'react';
import {
    withStyles,
    Fab
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import ParticipationFace from 'app/components/common/ParticipationFace'
import {listFriend} from "../../../../fakeData/fakeParticipationFace";

const styles = theme => {
    return {
        btn: {
            fontSize: 12,
            height: 23,
            textTransform: 'unset',
            color: theme.palette.text.secondary,
            maxWidth: '100px',
            width: '100%',
            flex: '0 0 auto'
        },
        btnAddFriend: {
            backgroundColor: '#10baa8',
            '&:hover': {
                backgroundColor: '#0c7368'
            }
        },
        btnUnFriend: {
            backgroundColor: '#c43855',
            '&:hover': {
                backgroundColor: '#7b2335'
            }
        },
        friend: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(1),
            borderBottom: '1px solid ' + theme.palette.divider,
        },
        participationFace: {
            flex: '1 1 auto',
            width: 0,
        },
    }
};

class TapFriendsOfUser extends Component {
    constructor(props) {
        super(props);
    }
    handleAssociate=()=>{
        console.log('what action?');
    };
    render() {
        const {
            userProfile,
            isOwner,
            classes
        } = this.props;
        console.log(userProfile);
        return (
            listFriend.map((friend, key) => {
                return (
                    <div key={key} className={classes.friend}>
                        <div className={classes.participationFace}>
                            <ParticipationFace participantType='user'
                                               participation={friend}
                                               avatarSize={42}
                                               nameSize={14}
                                               memberSize={12}
                                               verifyIconSize={14}
                                               isOwner={isOwner}
                                               handleActionTooltip={this.handleAssociate}
                                               showTooltip={true}
                            />
                        </div>
                        {!isOwner && <Fab variant="extended" className={clsx(classes.btn, classes.btnAddFriend)}
                                          onClick={this.handleAssociate}>
                            Kết bạn
                        </Fab>}
                        {isOwner && <Fab variant="extended" className={clsx(classes.btn, classes.btnUnFriend)}
                                         onClick={this.handleAssociate}>
                            Huỷ kết bạn
                        </Fab>}
                    </div>
                )
            })
        )
    }
}

TapFriendsOfUser.propTypes = {
    teams: PropTypes.array,
    isOwner: PropTypes.bool,
    userProfile: PropTypes.object,
};
export default withStyles(styles)(TapFriendsOfUser);
import React, {Component} from 'react';
import {createStructuredSelector} from "reselect";
import {compose} from 'recompose';
import {connect} from "react-redux";
import CoverUserProfile from './coverUserProfile';
import UserInfo from './userInfo';
import {
    Button,
    Container,
    withStyles
} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import clsx from "clsx";
import {openDialogCreateTeam} from "../../containers/createTeam/actions";
import CreateTeamDialog from "app/components/createTeam/createTeamDialog";

const styles = theme => {
    return {
        userProfile: {
            marginTop: theme.spacing(1)
        },
        btnCreateTeam: {
            float: 'left',
            width: '100%',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                marginTop: 0
            }
        },
        button: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.secondary,
            float: 'right',
            width: 'auto',
            fontSize: '0.9rem',
            '&:hover': {
                backgroundColor: '#007a00'
            },
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            }
        },
    }
};

class UserProfileComponent extends Component {

    constructor(props) {
        super(props);
    }
    handleCreateTeam = () => {
        this.props.openDialogCreateTeam()
    };
    render() {
        const {userProfile, classes, profile} = this.props;
        // const userMetaInfo = userProfile.userMetaInfo ? userProfile.userMetaInfo : {};
        const contactInfo = userProfile.contactInfo ? userProfile.contactInfo : {};
        const fullName = contactInfo.fullName ? contactInfo.fullName : '';
        const {avatar, cover} = userProfile;
        const isOwner = profile ? (profile.id === userProfile.id) : false;
        return (
            <section className={classes.userProfile}>
                <Container maxWidth='lg'>
                    <CoverUserProfile fullName={fullName}
                                      avatar={avatar}
                                      cover={cover}
                                      isOwner={isOwner}
                    />
                    <div className={classes.btnCreateTeam}>
                    {
                        ( isOwner) &&
                        <Button variant="contained" size="small" className={classes.button} fullWidth
                                onClick={this.handleCreateTeam}
                        >
                            <AddCircleOutline className={clsx(classes.leftIcon, classes.iconSmall)}/>
                            Tạo đội
                        </Button>
                    }
                    </div>
                    <UserInfo userProfile={userProfile} isOwner={isOwner}/>
                </Container>
                <CreateTeamDialog/>
            </section>
        );
    }
}

UserProfileComponent.propTypes = {};

const mapStateToProps = createStructuredSelector({
    userProfile: state => state.userProfileData.userProfile,
    profile: state => state.auth.profile,
});
const mapDispatchToProps = dispatch => ({
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(UserProfileComponent);
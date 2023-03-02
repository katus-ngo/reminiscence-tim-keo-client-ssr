import React from 'react';
import Layout from 'app/components/layout';
import {withStyles} from '@material-ui/core/styles';
import defaultPage from "/hocs/defaultPage";
import UserProfileContainer from "../app/containers/userProfile";
import {
    getUserProfile
} from 'app/containers/userProfile/actions';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import HeadTitleNotificationCount from "../app/containers/notification/HeadTitleNotificationCount";
import Loading from 'app/components/common/loading';

const styles = theme => {
    return {}
};

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({store, params}) {
        store.dispatch(getUserProfile(params['slug'], params['tab']));
    }

    render() {
        const {loadingProfile, userProfile : {fullName}} = this.props;

        return (
            <Layout hide={true}>
                {this.props.userProfile && this.props.userProfile.id && <div>
                    <HeadTitleNotificationCount title={fullName} />
                    <UserProfileContainer/>
                </div>}

                {loadingProfile && <Loading />}

                {! loadingProfile && ! this.props.userProfile && <h3 style={{color: '#fff'}}>Người dùng không tồn tại</h3>}
            </Layout>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userProfile: state => state.userProfileData.userProfile || {},
    loadingProfile: state => state.userProfileData.loadingProfile
});

export default connect(mapStateToProps, null)(withStyles(styles)(defaultPage(UserProfile)))
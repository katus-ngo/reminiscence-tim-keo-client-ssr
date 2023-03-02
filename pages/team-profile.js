import React from 'react';
import Layout from 'app/components/layout';
import TeamProfileContainer from 'app/containers/teamProfile'
import defaultPage from "/hocs/defaultPage";
import {getTeamProfile} from "app/containers/teamProfile/actions";
import {connect} from 'react-redux';
import HeadTitleNotificationCount from "../app/containers/notification/HeadTitleNotificationCount";
import Loading from "app/components/common/loading";

class TeamProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({store, params, token}) {
        store.dispatch(getTeamProfile(params['slug'], token, params['tab']));
    }

    render() {
        const {loading, teamInfo} = this.props;

        return (
            <Layout hide={true}>
                {teamInfo && teamInfo.id &&
                <div>
                    <HeadTitleNotificationCount title={teamInfo['teamMetaInfo']['longName']}/>
                    <TeamProfileContainer/>
                </div>
                }

                {loading && <Loading/>}

                {! loading && ! teamInfo && <h3 style={{color: '#fff'}}>Đội tuyển không tồn tại</h3>}
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    teamInfo: state.teamProfileData.teamInfo,
    loading: state.teamProfileData.loadingTeamProfile
});

export default connect(mapStateToProps, null)(defaultPage(TeamProfile));
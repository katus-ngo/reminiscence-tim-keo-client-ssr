import React from 'react';
import Layout from 'app/components/layout';
import {withStyles} from '@material-ui/core/styles';
import HomeContainer from "/app/containers/home";
import {compose} from "recompose";
import {connect} from "react-redux";
import defaultPage from "hocs/defaultPage";
import HeadTitleNotificationCount from "../app/containers/notification/HeadTitleNotificationCount";

const styles = theme => {
    return {
        text: {
            color: 'red',
        },
    }
};

class Home extends React.Component {
    render() {

        return (
            <Layout>
                <HeadTitleNotificationCount title="Trang chủ" />
                <HomeContainer/>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => ({

});
export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps),
)(defaultPage(Home));
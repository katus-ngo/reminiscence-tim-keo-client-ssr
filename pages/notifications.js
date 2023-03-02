import React from 'react';
import defaultPage from "../hocs/defaultPage";
import {Button} from "@material-ui/core";
import Layout from "../app/components/layout";
import NotificationContainer from 'app/containers/notification'
import {connect} from "react-redux";
import {fetchNotifications} from "../app/containers/notification/actions";
import HeadTitleNotificationCount from 'app/containers/notification/HeadTitleNotificationCount';


class Notifications extends React.Component {

    static getInitialProps() {
        fetchNotifications();
    }

    render() {
        return (
            <Layout hide={true}>
                <HeadTitleNotificationCount title='Thông báo'/>
                <NotificationContainer />
            </Layout>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    fetchNotifications: () => dispatch(fetchNotifications())
});

export default defaultPage(connect(mapStateToProps, mapDispatchToProps)(Notifications));
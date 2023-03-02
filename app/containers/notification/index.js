import React from 'react';
import NotificationItem from 'app/components/notification/NotificationItem';
import {connect} from "react-redux";
import {notificationService} from "../../services";
import PagedNotification from "../../components/notification/PagedNotification";

class NotificationsContainer extends React.Component{
    state = {
        notifications: []
    };

    componentDidMount() {
        notificationService.fetch({}).then((page) => {
            this.setState({notifications: page.content})
        })
    }

    render() {
        return (
            <div>
                <PagedNotification notifications={this.state.notifications} />
            </div>
        );
    }
}

export default connect(state => ({
    notifications: state.notification.items
}), {})(NotificationsContainer);
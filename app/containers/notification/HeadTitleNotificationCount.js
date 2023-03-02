import React from 'react';
import {connect} from "react-redux";
import Head from 'next/head';
import PropTypes from 'prop-types';
import {countUnviewedNotifications} from "./actions";
import config from 'app/config';

class HeadTitleNotificationCount extends React.Component{

    componentDidMount() {
        if (this.props.profile) {
            this.props.countUnviewed();
        }
    }

    combineTitle = () => {
        let title = `${this.props.title} - ${config.app.HEAD_TITLE_POST_FIX}`;

        if (this.props.unviewedCount) {
            title = `(${this.props.unviewedCount}) ${title}`;
        }

        return title;
    };

    render() {
        const combinedTitle = this.combineTitle();

        return (
            <Head>
                <title>{combinedTitle}</title>
            </Head>
        );
    }
}
HeadTitleNotificationCount.defaultProps = {
    title: 'Trang chủ'
};

HeadTitleNotificationCount.propTypes = {
    title: PropTypes.string
};

export default connect(
    state => ({
        profile: state.auth.profile,
        unviewedCount: state.notification.unviewedCount
    }),
    dispatch => ({
        countUnviewed: () => dispatch(countUnviewedNotifications())
    })
)(HeadTitleNotificationCount);
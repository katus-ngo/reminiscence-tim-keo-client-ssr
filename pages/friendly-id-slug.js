import React from 'react';
import UserProfilePage from './user-profile';
import {axios} from 'app/services';
import config from "app/config";
import {GET_USER_PROFILE_SUCCESS} from "app/containers/userProfile/actions";
import defaultPage from "hocs/defaultPage";

class FriendlyIdSlug extends React.Component {
    static async getInitialProps({params, store}) {
        const resource = await axios
            .get(config.BACKEND_API + "/friendly-id-slugs/" + params['slug'])
            .then(response => response.data, error => {
                console.log(error.response.data);
                //todo show 404 page
            }) || {};

        store.dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            userProfile: resource,
            tabName: params['tab']
        });

        return {resource};
    }

    render() {
        const {resource} = this.props;

        switch (resource['slugableType']) {
            case "USER":
                return <UserProfilePage {...resource}/>;
            case "TEAM":
            case "TOURNAMENT":
        }

        return null;
    }
}

export default defaultPage(FriendlyIdSlug);
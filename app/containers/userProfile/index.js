import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserProfileComponent from 'app/components/userPofile'

class UserProfileContainer extends Component {
    render() {
        return (
            <UserProfileComponent/>
        );
    }
}

UserProfileContainer.propTypes = {
};
export default UserProfileContainer;
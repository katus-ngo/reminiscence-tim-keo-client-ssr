import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TeamProfileComponent from "app/components/teamProfile";

class TeamProfileContainer extends Component {
    render() {
        return (
                <TeamProfileComponent/>
        );
    }
}

TeamProfileContainer.propTypes = {
};

export default TeamProfileContainer;
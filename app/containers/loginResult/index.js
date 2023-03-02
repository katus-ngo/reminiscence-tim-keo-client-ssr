import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginFacebookComponent from 'app/components/loginResult'

function mapStateToProps(state) {
    return {};
}

class LoginFacebookContainer extends Component {
    render() {
        return (
            <div>
                <LoginFacebookComponent/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(LoginFacebookContainer);
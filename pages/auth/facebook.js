import React, {Component} from 'react';
import {connect} from 'react-redux';
import defaultPage from "hocs/defaultPage";
import {authService} from "app/services";
import {routerPush} from 'app/utils/Router';
import {
    loginSuccess,
} from 'app/containers/AuthProvider/actions'


class LoginFacebook extends Component {
    static getInitialProps({params}) {
        return {
            params
        }
    }

    componentDidMount() {
        const code = this.props.params.code || '';
        authService.loginByFacebook(code)
            .then(
                response => {
                    const token = response.token;
                    const profile = response.userProfile;
                    this.props.loginSuccess(token,profile);
                    routerPush('home');
                    return response
                },
                error => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: (token,fullName,avatar) => dispatch(loginSuccess(token,fullName,avatar)),
});
export default connect(
    null,mapDispatchToProps
)(defaultPage(LoginFacebook));
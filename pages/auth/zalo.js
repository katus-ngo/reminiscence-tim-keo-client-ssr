import defaultPage from "hocs/defaultPage";
import React from "react";
import {connect} from "react-redux";
import {loginByZalo} from "app/containers/AuthProvider/actions";


class Zalo extends React.Component {
    static getInitialProps({params}) {
        return {
            params
        }
    }

    componentDidMount() {
        const code = this.props.params.code || '';
        this.props.loginByZalo(code, {name: 'home'});
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect(
    null,
    dispatch => ({loginByZalo: (code, route) => dispatch(loginByZalo(code, route))})
)(defaultPage(Zalo));
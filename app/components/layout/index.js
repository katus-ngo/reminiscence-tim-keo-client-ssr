import React from 'react'
import Footer from './footer';
import Header from './header';
import PropTypes from "prop-types";
import SnackBarNotification from "app/containers/SnackBarNotification";

const style = theme => {
    return {
    }
};
class Layout extends React.Component {
    render() {
        const {hide} = this.props;
        return (
            <div>
                <Header hide={hide}/>
                {this.props.children}
                <Footer/>
                <SnackBarNotification/>
            </div>
        )
    }
}

Layout.propTypes = {
    hide: PropTypes.bool
};
export default Layout
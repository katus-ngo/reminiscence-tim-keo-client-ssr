import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {createStructuredSelector} from "reselect";
import { withSnackbar } from "notistack";
import { removeSnackbar } from "app/containers/SnackBarNotification/actions";
class SnackBarNotification extends React.Component {
  displayed = [];
  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  componentDidUpdate() {
    const { notifications = [] } = this.props;
    notifications.forEach(({ key, message, options = {} }) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, key) => {
            // if (options.onClose) {
            //     options.onClose(event, reason, key);
            // }
            // Dispatch action to remove snackbar from redux store
            this.props.removeSnackbar(key);
        }
      });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
    notifications: state => state.snackBarNotificationData.notifications,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SnackBarNotification)
);
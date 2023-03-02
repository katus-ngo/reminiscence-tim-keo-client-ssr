import React from 'react';
import {
    CircularProgress,
    Grid,
    Typography,
    withStyles
} from "@material-ui/core";
import classnames from "classnames";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";

const styles = theme => ({
    gridContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    gridTitle: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    loading: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class PagedNotification extends React.Component{

    render() {
        const {notifications, classes, loading} = this.props;

        return (
            <Grid className={classes.gridContainer}>
                <Grid xs={12} item className={classes.gridTitle}>
                    <Typography color={"textSecondary"} display='block' variant="h5">Thông báo</Typography>
                </Grid>

                <Grid xs={12} item className={classes.loading} >
                    {loading &&  <CircularProgress color={"secondary"}/>}
                </Grid>


                {! notifications.length && ! loading && <Typography color={"textSecondary"} display='block' variant="p">Bạn chưa có thông báo nào.</Typography>}
                {
                    notifications.map((item, key) => <NotificationItem key={key} notification={item} />)
                }
            </Grid>
        );
    }
}

PagedNotification.defaultProps = {
    notifications: [],
    loading: false
};

PagedNotification.propTypes = {
    notifications: PropTypes.array,
    loading: PropTypes.bool
};

export default withStyles(styles)(PagedNotification);
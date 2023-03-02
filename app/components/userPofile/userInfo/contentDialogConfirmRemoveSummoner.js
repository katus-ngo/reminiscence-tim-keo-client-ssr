import React, {Component} from 'react';
import {Avatar, Typography, withStyles} from "@material-ui/core";
import {connect,} from "react-redux";
import {createStructuredSelector} from "reselect";
import PropTypes from "prop-types";

const styles = theme => {
    return {
        boxContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        currentIcon: {
            width: 72,
            height: 72,
        }
    }
};

class ContentDialogConfirmRemoveSummoner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            lolSummoner,
        } = this.props;
        return (
            <div className={classes.boxContent}>
                <Avatar className={classes.currentIcon} alt={lolSummoner.name}
                        src={'https://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/' + lolSummoner.profileIconId + '.png'}/>
                <Typography variant='h6' color='textSecondary' align='center'>{lolSummoner.name}</Typography>
                <Typography variant='body1' color='textPrimary' align='center'>Bạn có chắc chắn xoá anh hùng <Typography
                    component='span' variant='body2' color='textSecondary'
                    align='center'>{lolSummoner.name}</Typography></Typography>
            </div>
        )
    }
}

ContentDialogConfirmRemoveSummoner.propTypes = {
    lolSummoner: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({});
export default withStyles(styles)(connect(mapStateToProps, null)(ContentDialogConfirmRemoveSummoner));
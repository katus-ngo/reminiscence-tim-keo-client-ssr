import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles
} from '@material-ui/core'

const styles = theme => {
    return {
        total: props => {
            return {
            width: props.widthTotalPercent ? props.widthTotalPercent : (props.widthTotalNumber ? props.widthTotalNumber : '100%'),
            height: props.heightTotal ? props.heightTotal : 8,
            borderRadius: props.borderRadius ? props.borderRadius : 5,
            backgroundColor: props.backgroundColorTotal ? props.backgroundColorTotal : 'white',
            position: 'relative',
            '&:before': {
                content: '""',
                position: 'absolute',
                width: props.widthRelityPercent ? props.widthRelityPercent : (props.widthRelityNumber ? props.widthRelityNumber : '100%'),
                height: '100%',
                backgroundColor: props.backgroundColorRelity ? props.backgroundColorRelity : '#e64a19',
                borderRadius: props.borderRadius ? props.borderRadius : 5,
            }
        }
        }
    }
};

class LineRate extends React.Component {
    render() {
        const {
            classes
        } = this.props;
        return (
            <div className={classes.total}>

            </div>
        )
    }
}

LineRate.propTypes = {
    borderRaidus: PropTypes.number,
    widthTotalNumber: PropTypes.number,
    widthTotalPercent: PropTypes.string,
    heightTotal: PropTypes.number,
    backgroundColorTotal: PropTypes.string,
    widthRelityNumber: PropTypes.number,
    widthRelityPercent: PropTypes.string,
    backgroundColorRelity: PropTypes.string,
};
export default withStyles(styles)(LineRate);
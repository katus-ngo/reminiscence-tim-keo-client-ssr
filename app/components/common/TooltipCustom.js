import React, {Component} from 'react';
import {
    withStyles,
    Tooltip
} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => {
    return {
        popper: props=>({
            backgroundColor: props.backgroundColor ? props.backgroundColor : '#21232B'
        }),
        tooltip: props=>({
            backgroundColor: props.backgroundColor ? props.backgroundColor : '#21232B'
        }),
    }
};

class TooltipCustom extends Component {
    render() {
        const {
            classes,
            title,
            open,
            placement
        } = this.props;
        return (
            <Tooltip title={title} placement={placement} open={open} classes={{
                 popper: classes.popper,
                tooltip: classes.tooltip,
            }}>
                {this.props.children}
            </Tooltip>
        );
    }
}

TooltipCustom.defaultProps = {
    backgroundColor: '#21232B',
    placement: 'top-start',
    open: false
};
TooltipCustom.propsTypes = {
    placement: PropTypes.oneOf([
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top'
    ]),
    title: PropTypes.node,
    backgroundColor: PropTypes.string,
    open: PropTypes.bool
};
export default withStyles(styles)(TooltipCustom);
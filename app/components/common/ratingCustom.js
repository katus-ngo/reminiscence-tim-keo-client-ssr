import React from 'react';
import {
    Star,
    StarBorder
} from "@material-ui/icons";
import PropTypes from "prop-types";
import {
    withStyles
} from "@material-ui/core";

const styles = {
    root:{
        color:'green'},
    outer: {
        display: 'inline-block',
        position: 'relative'
    },
    inner: {
        position: 'absolute',
        overflow: 'hidden',
        whiteSpace: 'noWrap',
        top: 0,
        left: 0,
        width: props => (Math.round(props.value / props.max * 10) * 10) + '%'
    },
    iconOuter: {
        color: props => props.color,
        fontSize: props => props.size,
    },
    iconInner: {
        color: props => props.color,
        fontSize: props => props.size,
    },

}

class RatingCustom extends React.Component {
    render() {
        const {max, value, icon, color, classes, size} = this.props;
        let iconOuter = [];
        let iconInner = [];
        for (let i = 0; i < max; i++) {
            iconOuter.push(<StarBorder key={i} className={classes.iconOuter}/>)
            iconInner.push(<Star key={i} className={classes.iconInner}/>)
        }
        return (
            <div className={classes.outer}>
                {iconOuter}
                <div className={classes.inner}>
                    {iconInner}
                </div>
            </div>
        )
    }
}

RatingCustom.propTypes = {
    max: PropTypes.number,
    value: PropTypes.number,
    icon: PropTypes.element,
    color: PropTypes.string,
    size: PropTypes.number
};
export default withStyles(styles)(RatingCustom);
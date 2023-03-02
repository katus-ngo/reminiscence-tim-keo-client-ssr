import React, {Component} from 'react';
import PropTypes from "prop-types";
import AnimatedProgressProvider from './AnimatedProgressProvider'
import {easeQuadInOut} from "d3-ease";

import {
    buildStyles,
    CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import {Typography, withStyles} from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";

const styles = theme => {
    return {
        label: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        percentage: props => ({
            color: props.color ? props.color : '#e64a19'
        })
    }
}

class CicularRate extends Component {
    render() {
        const {
            classes,
            label,
            pathColor,
            strokeWidth,
            trailColor,
            percentage
        } = this.props;
        return (
            <AnimatedProgressProvider
                valueStart={0}
                valueEnd={percentage}
                duration={1.4}
                easingFunction={easeQuadInOut}
            >
                {
                    value => {
                        const roundedValue = Math.round(value);
                        return (
                            <CircularProgressbarWithChildren
                                value={value}
                                strokeWidth={strokeWidth ? strokeWidth : 6}
                                styles={
                                    buildStyles({pathTransition: "none", pathColor: pathColor, trailColor: trailColor})
                                }

                            >
                                <div className={classes.label}>
                                    <Typography variant='body1' className={classes.percentage}>
                                        {roundedValue}%
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>
                                        {label}
                                    </Typography>
                                </div>
                            </CircularProgressbarWithChildren>
                        )
                    }
                }

            </AnimatedProgressProvider>
        );
    }
}

CicularRate.defaultProps = {}
CicularRate.propTypes = {
    percentage: PropTypes.number,
    strokeWidth: PropTypes.number,
    label: PropTypes.string,
    pathColor: PropTypes.string,
    trailColor: PropTypes.string,
}
export default withStyles(styles)(CicularRate);
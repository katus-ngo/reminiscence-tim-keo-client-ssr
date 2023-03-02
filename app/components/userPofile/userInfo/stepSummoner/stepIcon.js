import React from "react";
import {DoneRounded, LockRounded, SearchRounded} from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => {
    return {
        root: {
            backgroundColor: "#5d6170",
            zIndex: 1,
            color: theme.palette.text.secondary,
            width: 24,
            height: 24,
            display: "flex",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
        },
        active: {
            backgroundColor:'#0fbaa8',
            boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
        },
        completed: {
            backgroundColor:'#0fbaa8'
        }
    }
};

class StepIcons extends React.Component {
    render() {
        const {active, completed, icon, classes} = this.props;
        const icons = {
            1: <SearchRounded style={{fontSize:'12px'}}/>,
            2: <LockRounded style={{fontSize:'12px'}}/>,
            3: <DoneRounded style={{fontSize:'12px'}}/>
        };
        return (
            <div className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}>
                {icons[String(icon)]}
            </div>
        )
    }
}

StepIcons.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node
};
export default withStyles(styles)(StepIcons);
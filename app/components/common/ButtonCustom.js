import React, {Component} from 'react';
import {
    Button,
    Fab,
    withStyles
} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => {
    return {
        button: props => ({
            backgroundColor: props.backgroundColor ? props.backgroundColor : theme.palette.secondary.main,
            color: props.labelColor ? props.labelColor : theme.palette.text.secondary,
            textTransform: props.textTransform ? props.textTransform : 'unset',
            width: props.width,
            height: props.height,
            fontSize: props.labelSize ? props.labelSize : 14,
            '&:hover':{
                backgroundColor:props.backgroundColorHover,
            }
        })
    }
};

class ButtonCustom extends Component {
    onClick=()=>{
        this.props.onClick()
    }
    render() {
        const {
            icon,
            label,
            iconPlacement,
            type,
            classes,
            fullWidth,
            variant
        } = this.props;
        if (iconPlacement === 'left') {
            if (type === 'button') {
                return (
                    <Button className={classes.button}
                            variant={variant}
                            fullWidth={fullWidth}
                            onClick={this.onClick}
                    > {icon}{label}
                    </Button>
                );
            }
            if (type === 'fab') {
                return (
                    <Fab variant={variant} className={classes.button}
                         onClick={this.onClick}>
                        {label}{icon}
                    </Fab>
                )
            }

        } else {
            return (
                <Button className={classes.button}
                        variant={variant}
                        fullWidth={fullWidth}
                        onClick={this.onClick}
                > {label}{icon}
                </Button>
            );
        }
    }
}

ButtonCustom.defaultProps = {
    type: 'button',
    labelColor: '#ebeef2',
    iconPlacement: 'left',
    textTransform: 'unset',
    labelSize:14
};
ButtonCustom.propTypes = {
    type: PropTypes.oneOf(['button', 'fab']),
    label: PropTypes.string,
    icon: PropTypes.node,
    iconPlacement: PropTypes.oneOf(['left', 'right']),
    backgroundColor: PropTypes.string,
    labelColor: PropTypes.string,
    labelSize: PropTypes.number,
    variant: PropTypes.oneOf(['text','outlined','contained','extended','round']),
    fullWidth: PropTypes.bool,
    textTransform: PropTypes.oneOf(['uppercase', 'lowercase', 'capitalize', 'unset']),
    width:PropTypes.string,
    height:PropTypes.string,
    backgroundColorHover:PropTypes.string,
    onClick:PropTypes.func,
};
export default withStyles(styles)(ButtonCustom);
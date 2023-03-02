import React, {Component} from 'react';
import Menu from "@material-ui/core/Menu";
import {MenuItem, Typography, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = {
    menu: {
        backgroundColor: props=>props.backGroundColorMenu,
        minWidth: props=>props.minWidthMenu
    },
    textMenu: {
        fontSize: props=>props.fontSize,
        color: props=>props.colorItem
    }
}
class PopupMenu extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    handleClose() {
        this.props.handleClose();
    }
    handleClickItem(value) {
        this.props.handleClickItem(value);
        this.props.handleClose();
    }

    render() {
        const {classes, anchorEl, options} = this.props;
        const isOpen = Boolean(anchorEl);
        return (
            <Menu anchorEl={anchorEl}
                  classes={{paper: classes.menu, list: classes.menu}}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                  }}
                  transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                  }}
                  keepMounted
                  open={isOpen}
                  onClose={this.handleClose}>

                {
                    options.map(option => (
                        <MenuItem value={option.value}
                                  key={option.value}
                        onClick={()=>this.handleClickItem(option.value)}>
                            <Typography className={classes.textMenu}>{option.label}</Typography>
                        </MenuItem>
                    ))
                }
            </Menu>
        );
    }
}

PopupMenu.propTypes = {
    handleClose: PropTypes.func,
    handleClickItem:PropTypes.func,
    options:PropTypes.array,
    minWidthMenu:PropTypes.string,
    backGroundColorMenu: PropTypes.string,
    colorItem: PropTypes.string,
    fontSize: PropTypes.string,
}
export default withStyles(styles)(PopupMenu);
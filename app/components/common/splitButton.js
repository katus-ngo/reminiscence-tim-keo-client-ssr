import React from 'react';
import {
    Grid,
    Button,
    ButtonGroup,
    Popper,
    ClickAwayListener,
    Paper,
    MenuList,
    MenuItem,
    Grow,
    withStyles,
} from "@material-ui/core";
import {
    ArrowDropDown
} from "@material-ui/icons"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from 'recompose';

const styles = {
    btnGroup: {
        '& .MuiButton-contained': {
            backgroundColor: props => props.backgroundColor,
            color: props => props.color,
            '&:hover': {
                backgroundColor: props => props.backgroundColorHover
            }
        }
    },
};

class SplitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.anchorRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    }

    handleClick() {
        this.props.handleClick()
    }

    handleClose(e) {
        if (this.anchorRef.current && this.anchorRef.current.contains(e.target)) {
            return;
        }
        this.setState({open: false})
    }

    handleToggle() {
        const {open} = this.state;
        this.setState({open: !open})
    }

    handleMenuItemClick(e, index) {
        this.props.onChangeSelectedIndex(index);
        this.setState({open: false})

    }

    render() {
        const {open} = this.state;
        const {options, selectedIndex, classes} = this.props;
        return (
            <Grid container>
                <Grid item xs={12} align="center">
                    <ButtonGroup variant="contained" className={classes.btnGroup} ref={this.anchorRef}
                                 aria-label="Split button">
                        <Button onClick={this.handleClick}>{options[selectedIndex]}</Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            aria-owns={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                        >
                            <ArrowDropDown/>
                        </Button>
                    </ButtonGroup>
                    <Popper open={open} anchorEl={this.anchorRef.current} transition disablePortal>
                        {({TransitionProps, placement}) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper id="menu-list-grow">
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={event => this.handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
            </Grid>
        )
    }
}

SplitButton.propTypes = {
    options: PropTypes.array.isRequired,
    handleClick: PropTypes.func,
    selectedIndex: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundColorHover: PropTypes.string,
    onChangeSelectedIndex: PropTypes.func
};
export default compose(
    withStyles(styles),
    connect(null, null),
)(SplitButton);




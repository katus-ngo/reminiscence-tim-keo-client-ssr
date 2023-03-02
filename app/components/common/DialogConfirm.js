import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {CustomDialog} from './CustomDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const styles = theme => {
    return {
        dialogBtn: {
            '& span': {
                color: '#424242',
                textTransform: 'none'
            }
        },
        dialogBtnConfirm: {
            marginLeft: theme.spacing(2),
            backgroundColor: '#e64a19',
            '& span': {
                color: '#ebeef2'
            },
            '&:hover': {
                backgroundColor: '#a13311'
            }
        },
        dialogAction: {
            display: 'flex',
            justifyContent:'center',
            marginBottom: theme.spacing(1)
        }
    }
};

class DialogConfirm extends React.Component {
    handleConfirm = () => {
        this.props.handleConfirm();
    };
    handleCancel = () => {
        this.props.handleCancel();
    };

    render() {
        const {
            open,
            classes,
            textBtnCancel,
            textBtnConfirm,
            fullWidth,
            fullScreen,
            maxWidth,
            content,
        } = this.props;
        return (
            <div>
                <CustomDialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCancel}
                    fullWidth={fullWidth}
                    fullScreen={fullScreen}
                    maxWidth={maxWidth}
                >
                    <DialogContent>
                        {content}
                    </DialogContent>
                    <DialogActions classes={{
                        root:classes.dialogAction
                    }}>
                        <div className={classes.dialogBtn}>
                            <Button variant="contained" onClick={this.handleCancel}>
                                {textBtnCancel}
                            </Button>
                            <Button variant="contained" className={classes.dialogBtnConfirm}
                                    onClick={this.handleConfirm}>
                                {textBtnConfirm}
                            </Button>
                        </div>
                    </DialogActions>
                </CustomDialog>
            </div>
        )
    }
}

DialogConfirm.defaultProps = {
    textBtnConfirm: "Xác nhận",
    textBtnCancel: "Huỷ",
    fullWidth: false,
    fullScreen: false,
    maxWidth: 'sm'
};
DialogConfirm.propTypes = {
    open: PropTypes.bool,
    textBtnConfirm: PropTypes.string,
    textBtnCancel: PropTypes.string,
    handleConfirm: PropTypes.func,
    handleCancel: PropTypes.func,
    fullWidth: PropTypes.bool,
    fullScreen: PropTypes.bool,
    content: PropTypes.node,
};
export default withStyles(styles)(DialogConfirm);
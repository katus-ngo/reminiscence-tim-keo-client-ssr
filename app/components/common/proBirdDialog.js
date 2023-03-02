import React from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
    withStyles
} from "@material-ui/core";
import {IconClose} from 'app/components/icon'
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";
import {CustomDialog} from './CustomDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const styles = theme => {
    return {
        dialogTitle: {
            padding: theme.spacing(2),
        },
        textTitle: {
            fontSize: '1.2rem',
            color: '#ebeef2',
            fontWeight: 600
        },
        btnClose: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
        professorBird: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            backgroundColor: '#3b3d44',
            display: 'flex'
        },
        comment: {
            fontFamily: [
                'Open Sans'
            ].join(','),
            padding: theme.spacing(2),
            fontSize: '14px',
            color: '#ebeef2'
        },
        content: {
            padding: theme.spacing(2),
        },
        dialogAction: {
            padding: theme.spacing(2),
            justifyContent: ' space-between'
        },
        dialogBtn: {
            '& span': {
                color: '#424242',
                textTransform: 'none'
            }
        },
        dialogBtnOK: {
            marginLeft: theme.spacing(1),
            backgroundColor: '#e64a19',
            '& span': {
                color: '#ebeef2'
            },
            '&:hover': {
                backgroundColor: '#a13311'
            }
        },
        hr: {
            backgroundColor: '#111217'
        },
    }
};

class ProBirdDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onCancel() {
        this.props.onCancel && this.props.onCancel();
    }

    onSubmit() {
        this.props.onSubmit && this.props.onSubmit();
    }

    render() {
        const {open, classes, title, content, moreAction, textBtnCancel, haveProBird, textBtnOk, comment, haveFooter, fullWidth, fullScreen, maxWidth} = this.props;
        return (
            <CustomDialog open={open} onClose={this.onCancel} fullWidth={fullWidth} fullScreen={fullScreen}
                       maxWidth={maxWidth}
                       TransitionComponent={Transition}
                       classes={{
                           container: classes.container,
                           paper: classes.paper,
                       }}>
                <DialogTitle className={classes.dialogTitle}>
                    <Typography className={classes.textTitle}>{title}</Typography>
                    <IconButton className={classes.btnClose} aria-label="Close" onClick={this.onCancel}>
                        <IconClose stroke='#ebeef2'/>
                    </IconButton>
                </DialogTitle>
                {
                    haveProBird && <div className={classes.professorBird}>
                        <div>
                            <img src="/static/images/bird-fun.svg" alt='Pro Bird'/>
                        </div>
                        <div className={classes.comment}>
                            {comment}
                        </div>
                    </div>
                }

                <DialogContent>
                    {content}
                </DialogContent>
                <Divider className={classes.hr}/>
                {
                    haveFooter &&
                    <DialogActions className={classes.dialogAction}>
                        <div className={classes.moreAction}>{moreAction}</div>
                        <div className={classes.dialogBtn}>
                            <Button variant="contained" onClick={this.onCancel}>
                                {textBtnCancel}
                            </Button>
                            <Button variant="contained" className={classes.dialogBtnOK} onClick={this.onSubmit}>
                                {textBtnOk}
                            </Button>
                        </div>
                    </DialogActions>
                }
            </CustomDialog>
        )
    }
}

ProBirdDialog.defaultProps = {
    textBtnOk: "Lưu",
    textBtnCancel: "Huỷ",
    fullWidth: false,
    fullScreen: false,
    maxWidth: 'sm'
};

ProBirdDialog.propTypes = {
    open: PropTypes.bool,
    haveProBird: PropTypes.bool,
    haveFooter: PropTypes.bool,
    content: PropTypes.node,
    comment: PropTypes.node,
    moreAction: PropTypes.node,
    textBtnCancel: PropTypes.string,
    textBtnOk: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    fullWidth: PropTypes.bool,
    fullScreen: PropTypes.bool,
    maxWidth: PropTypes.string,
};
export default withStyles(styles)(ProBirdDialog);




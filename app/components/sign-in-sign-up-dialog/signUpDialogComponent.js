import React from 'react';
import PropTypes from 'prop-types';
import {
    validateSignUp as syncValidate
} from './validation'
import {
    withStyles,
    Dialog, Typography, IconButton, DialogTitle, DialogContent,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Link,
    Checkbox,
    Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {connect} from "react-redux";
import {compose} from 'recompose';
import {createStructuredSelector} from "reselect";
import {closeDialogSignUp, openDialogSignIn} from "app/containers/sign-in-sign-up-dialog/actions";

import CssBaseline from '@material-ui/core/CssBaseline';
import {IconClose} from "app/components/icon";
import {clearError, registerByEmail} from "app/containers/AuthProvider/actions";

const CssCheckbox = withStyles(theme => ({
    root: {
        color: '#a4a4a4',
    },
    checked: {
        color: '#e64a19 !important'
    },
}))(Checkbox);
const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#a4a4a4"
        },
        "& .MuiFormLabel-root": {
            color: "#a4a4a4"
        },
        "& .MuiInputBase-input": {
            color: "#a4a4a4",
            backgroundColor: '#16161c'
        },
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#a4a4a4"
            },
        }
    }
})(TextField);

const styles = theme => {
    return {
        dialog: {
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(1)
            },
            backgroundColor: '#1b1c23'
        },
        btnClose: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
        dialogTitle: {
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
        },
        textTitle: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '& p': {
                fontSize: '1.6rem',
                color: '#ebeef2',
                fontWeight: 700
            }
        },
        avatar: {
            backgroundColor: '#e64a19'
        },
        submit: {
            backgroundColor: '#e64a19',
            margin: theme.spacing(3, 0, 2),
            '&:hover': {
                backgroundColor: '#a13311'
            }
        },
        label: {
            color: '#a4a4a4'
        },
        btnDisabled: {
            color: '#a4a4a4 !important',
            backgroundColor: '#a13311 !important'
        },
        errorMessage: {
            fontSize: '0.7rem',
            color: '#c43855'
        }
    }
};

class SignUpDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.closeDialog = this.closeDialog.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.openDialogSignIn = this.openDialogSignIn.bind(this);
        this.clearError = this.clearError.bind(this);
        this.state = {
            username: '',
            fullName: '',
            password: '',
            passwordConfirm: '',
            errors: {},
            checked: false,
            loginValid: false
        }
    }

    clearError(){
        this.setState({errors:{}});
        this.props.clearError();
    }

    handleChecked(){
        const {checked} = this.state;
        this.setState({checked: !checked})
    }

    closeDialog() {
        this.props.closeDialog(false);
        this.clearError();
    }

    onChangeUsername(e) {
        const username = e.target.value;
        this.setState({username});
    }
    onChangeFullName(e) {
        const fullName = e.target.value;
        this.setState({fullName});
    }

    onChangePassword(e) {
        const password = e.target.value;
        this.setState({password});
    }

    onChangePasswordConfirm(e) {
        const passwordConfirm = e.target.value;
        this.setState({passwordConfirm});
    }

    handleSubmit(e, route){
        e.preventDefault();
        const {fullName, username, password, checked, passwordConfirm} = this.state;
        let errors = syncValidate({fullName, username,password,checked,passwordConfirm});

        if (password !== passwordConfirm && !errors.passwordConfirm){
            const error = {passwordConfirm:"Mật khẩu phải giống nhau"};
            errors={...errors,...error}
        }
        this.setState({errors: errors || {}});

        if (! errors) {
            this.props.registerByUsername(username, password, fullName, route);
        }
    }
    openDialogSignIn(){
        this.props.closeDialog(false);
        this.clearError();
        this.props.openDialogSignIn(true);
    }
    render() {
        const {classes, open, errorResponse, route} = this.props;
        const {
            username,
            fullName,
            password,
            passwordConfirm,
            checked,
            errors,
        } = this.state;
        return (
            <Dialog open={open} onClose={this.closeDialog} classes={{paper: classes.dialog}} maxWidth='xs'>
                <CssBaseline/>
                <DialogTitle className={classes.dialogTitle}>
                    <Typography className={classes.textTitle} component="div">
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="p">
                            Đăng ký
                        </Typography>
                        <IconButton className={classes.btnClose} aria-label="Close" onClick={this.closeDialog}>
                            <IconClose stroke='#ebeef2'/>
                        </IconButton>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <CssTextField
                            autoFocus
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Họ tên"
                            name="fullName"
                            value={fullName}
                            onChange={this.onChangeFullName}
                        />
                        {

                            errors.fullName &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.fullName}
                            </Typography>
                        }
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email hoặc số điện thoại"
                            name="username"
                            value={username}
                            onChange={this.onChangeUsername}
                        />
                        {
                            errors.username &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.username}
                            </Typography>
                        }
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={this.onChangePassword}
                        />
                        {
                            errors.password &&
                        <Typography component="p" className={classes.errorMessage}>
                        {errors.password}
                        </Typography>
                        }
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Nhập lại mật khẩu"
                            type="password"
                            id="passwordConfirm"
                            autoComplete="current-password"
                            value={passwordConfirm}
                            onChange={this.onChangePasswordConfirm}
                        />
                        {

                            errors.passwordConfirm &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.passwordConfirm}
                            </Typography>
                        }
                        <FormControlLabel
                            control={
                                <CssCheckbox checked={checked} onChange={this.handleChecked} />
                            }
                            label="Tôi đồng ý với các Quy định và Điều khoản"
                            classes={{label: classes.label}}
                        />
                        {
                            errors.checked &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.checked}
                            </Typography>
                        }
                        {
                            errorResponse &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errorResponse.message}
                            </Typography>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            classes={{
                                root: classes.submit,
                                disabled: classes.btnDisabled
                            }}
                            onClick={(e)=>{this.handleSubmit(e,route)}}
                        >
                            Đăng ký
                        </Button>
                        <Grid container justify='center'>
                            <Grid item>
                                <Link href="#" className={classes.label} style={{textDecoration:'underline'}} onClick={()=>{this.openDialogSignIn(route)}}>
                                    {"Đã có tài khoản"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }
}

SignUpDialogComponent.propTypes = {
    open: PropTypes.bool
};
const mapStateToProps = createStructuredSelector({
    open: state => state.signInSignUpData.openSignUp,
    route: state => state.signInSignUpData.route,
    errorResponse: state => state.auth.error
});
const mapDispatchToProps = dispatch => ({
    closeDialog: (open) => dispatch(closeDialogSignUp(open)),
    openDialogSignIn: (open,route) => dispatch(openDialogSignIn(open,route)),
    registerByUsername: (username, password, fullName,route) => dispatch(registerByEmail(username, password, fullName,route)),
    clearError: () => dispatch(clearError()),
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(SignUpDialogComponent);